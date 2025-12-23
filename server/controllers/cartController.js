const pool = require("../config/db");

// ============================
// 1. Thêm vào giỏ hàng
// ============================
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        console.log("req.user:", req?.user);
        const { productId, quantity } = req.body;

        const [[existing]] = await pool.execute(
            `SELECT * FROM gio_hang WHERE nguoi_dung_id = ? AND san_pham_id = ?`,
            [userId, productId]
        );

        if (existing) {
            await pool.execute(
                `UPDATE gio_hang SET so_luong = so_luong + ? WHERE id = ?`,
                [quantity, existing.id]
            );
        } else {
            await pool.execute(
                `INSERT INTO gio_hang (nguoi_dung_id, san_pham_id, so_luong)
                 VALUES (?, ?, ?)`,
                [userId, productId, quantity]
            );
        }

        res.status(200).json({
            ok: true,
            message: "Đã thêm vào giỏ hàng",
        });
    } catch (error) {
        console.error("addToCart:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        console.log("req user:", req?.user);
        let total_quantity;
        const [rows] = await pool.execute(
            `SELECT
            CAST(SUM(gio_hang.so_luong) AS SIGNED) as total_quantity,
            gio_hang.id,
            san_pham.id AS product_id,
            san_pham.ten_san_pham,
            san_pham.gia_khuyen_mai,
            san_pham.anh_dai_dien
        FROM gio_hang
        JOIN san_pham ON gio_hang.san_pham_id = san_pham.id
        WHERE gio_hang.nguoi_dung_id = ?
        GROUP BY san_pham.id, san_pham.ten_san_pham, san_pham.gia_khuyen_mai, gio_hang.id`,
            [userId]
        );
        console.log("rows:", rows);
        if (rows.length > 1) {
            total_quantity = rows.reduce(
                (total, item) => total + item.total_quantity,
                0
            );
        } else {
            total_quantity = rows[0]?.total_quantity;
        }

        return res.json({
            total_quantity,
            data: rows,
        });
    } catch (error) {
        console.error("getCart:", error);
        res.status(500).json({ ok: false, message: "Lỗi server" });
    }
};

exports.updateCart = async (req, res) => {
    console.log("body updateCart:", req?.body);
    console.log("new cart from client:", req?.body?.updatedCart);

    const { userId } = req.body;
    console.log("userId tuwf clien sent", userId);
    if (req?.user?.id !== userId) {
        return res.status(403).json({
            ok: false,
            message: "Bạn chưa đăng nhập!!!",
        });
    }

    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT 
                    CAST(gio_hang.so_luong AS SIGNED) as total_quantity,
                    san_pham_id
            FROM gio_hang WHERE nguoi_dung_id = ?`,
            [userId]
        );

        const oldCart = rows;

        const productsToRemove = [];
        const productsToUpdate = [];

        const oldCartMap = oldCart.reduce((acc, item) => {
            acc[item.product_id] = item.total_quantity;
            return acc;
        }, {});

        oldCart.forEach((item) => {
            const updateItem = req?.body?.updatedCart.find(
                (upItem) => upItem.product_id === item.san_pham_id
            );

            if (updateItem) {
                if (updateItem.total_quantity !== item.san_pham_id) {
                    productsToUpdate.push({
                        product_id: updateItem.product_id,
                        newQuantity: updateItem.total_quantity,
                        oldQuantity: item.san_pham_id,
                    });
                }
            } else {
                console.log("item can xoa:");
                productsToRemove.push(item.san_pham_id);
            }
        });
        console.log("productsToUpdate::", productsToUpdate);
        console.log("productsToRemove::", productsToRemove);

        await conn.beginTransaction();

        for (let product of productsToUpdate) {
            await conn.execute(
                `UPDATE gio_hang SET so_luong = ?, ngay_cap_nhat = NOW() WHERE nguoi_dung_id = ? AND san_pham_id = ?`,
                [product.newQuantity, userId, product.product_id]
            );
        }

        for (let productId of productsToRemove) {
            await conn.execute(
                `DELETE FROM gio_hang WHERE nguoi_dung_id = ? AND san_pham_id = ?`,
                [userId, productId]
            );
        }

        await conn.commit();

        return res.status(200).json({
            updatedCart: req?.body?.updatedCart,
            productsToRemove,
            productsToUpdate,
        });
    } catch (error) {
        await conn.rollback();
        console.log("ERROR AT CART CONTROLLER:", error);
    } finally {
        conn.release();
    }
};

exports.removeItem = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id item be delete", id);
        await pool.execute(`DELETE FROM gio_hang WHERE id = ?`, [id]);
        res.json({ message: "Đã xóa sản phẩm" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

// ============================
// 4. Mua Ngay
// ============================
// exports.buyNow = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         const { productId, quantity } = req.body;

//         if (!userId) return res.status(401).json({ message: "Bạn cần đăng nhập" });

//         // Tạo đơn hàng trong bảng `don_hang`
//         await pool.execute(
//             `INSERT INTO don_hang (nguoi_dung_id, tong_tien, trang_thai)
//              VALUES (?, 0, 'pending')`,
//             [userId]
//         );

//         const [[order]] = await pool.execute("SELECT LAST_INSERT_ID() AS id");

//         await pool.execute(
//             `
//             INSERT INTO don_hang_chi_tiet (don_hang_id, san_pham_id, so_luong)
//             VALUES (?, ?, ?)
//             `,
//             [order.id, productId, quantity]
//         );

//         res.json({ message: "Đã tạo đơn hàng", orderId: order.id });
//     } catch (error) {
//         console.error("buyNow:", error);
//         res.status(500).json({ message: "Lỗi server" });
//     }
// };
exports.buyNow = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { productId, quantity } = req.body;

        console.log(">>> BuyNow FE gửi lên:", { userId, productId, quantity });

        if (!userId)
            return res.status(401).json({ message: "Bạn cần đăng nhập" });

        // Lấy giá biến thể
        const [[product]] = await pool.execute(
            `SELECT gia FROM bien_the WHERE id = ?`,
            [productId]
        );

        console.log(">>> Kết quả lấy giá biến thể:", product);

        if (!product) {
            return res.status(400).json({
                message: "Biến thể không tồn tại hoặc FE gửi sai productId",
            });
        }

        const total = Number(product.gia) * quantity;

        // tạo đơn hàng
        const [orderResult] = await pool.execute(
            `INSERT INTO don_hang (nguoi_dung_id, tong_tien, trang_thai)
       VALUES (?, ?, 'pending')`,
            [userId, total]
        );

        const orderId = orderResult.insertId;
        console.log(">>> Đơn hàng đã tạo:", orderId);

        // thêm chi tiết đơn hàng
        await pool.execute(
            `INSERT INTO don_hang_chi_tiet (don_hang_id, bien_the_id, so_luong, don_gia)
       VALUES (?, ?, ?, ?)`,
            [orderId, productId, quantity, product.gia]
        );

        console.log(">>> Thêm chi tiết đơn hàng OK");

        res.json({ ok: true, message: "Đặt hàng thành công", orderId });
    } catch (error) {
        console.error("buyNow ERROR:", error);
        res.status(500).json({ ok: false, message: "Lỗi server" });
    }
};
