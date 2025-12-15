const pool = require("../config/db");

// ============================
// 1. Thêm vào giỏ hàng
// ============================
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { productId, quantity } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Bạn cần đăng nhập" });
        }

        const [[existing]] = await pool.execute(
            `SELECT * FROM gio_hang WHERE nguoi_dung_id = ? AND bien_the_id = ?`,
            [userId, productId]
        );

        if (existing) {
            await pool.execute(
                `UPDATE gio_hang SET so_luong = so_luong + ? WHERE id = ?`,
                [quantity, existing.id]
            );
        } else {
            await pool.execute(
                `INSERT INTO gio_hang (nguoi_dung_id, bien_the_id, so_luong)
                 VALUES (?, ?, ?)`,
                [userId, productId, quantity]
            );
        }

        res.json({ message: "Đã thêm vào giỏ hàng" });
    } catch (error) {
        console.error("addToCart:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};


// ============================
// 2. Lấy giỏ hàng của user
// ============================
// exports.getCart = async (req, res) => {
//     try {
//         const userId = req.user?.id;

//         if (!userId) {
//             return res.status(401).json({ message: "Bạn cần đăng nhập" });
//         }

//         const [rows] = await pool.execute(
//             `
//             SELECT 
//                 gh.id AS cart_id,
//                 gh.so_luong,
//                 bt.id AS bien_the_id,
//                 bt.ten_bien_the,
//                 sp.id AS san_pham_id,
//                 sp.ten_san_pham,
//                 sp.anh_dai_dien,
//                 COALESCE(bt.gia, sp.gia_khuyen_mai, sp.gia_goc) AS gia
//             FROM gio_hang gh
//             JOIN bien_the bt ON gh.bien_the_id = bt.id
//             JOIN san_pham sp ON bt.san_pham_id = sp.id
//             WHERE gh.nguoi_dung_id = ?
//             `,
//             [userId]
//         );


//         res.json(rows);
//     } catch (error) {
//         console.error("getCart:", error);
//         res.status(500).json({ message: "Lỗi server" });
//     }
// };
exports.getCart = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ ok: false, message: "Bạn cần đăng nhập" });
        }

        const [rows] = await pool.execute(`
            SELECT 
                c.id AS cart_item_id,
                c.so_luong,
                bt.id AS bien_the_id,
                bt.ten_bien_the,
                sp.ten_san_pham,
                sp.anh_dai_dien,
                bt.gia
            FROM gio_hang c
            JOIN bien_the bt ON c.bien_the_id = bt.id
            JOIN san_pham sp ON bt.san_pham_id = sp.id
            WHERE c.nguoi_dung_id = ?;
        `, [userId]);

        return res.json({
            ok: true,
            data: rows
        });

    } catch (error) {
        console.error("getCart:", error);
        res.status(500).json({ ok: false, message: "Lỗi server" });
    }
};


// ============================
// 3. Xóa 1 sản phẩm khỏi giỏ
// ============================
exports.removeItem = async (req, res) => {
    try {
        const { id } = req.params;
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

    if (!userId) return res.status(401).json({ message: "Bạn cần đăng nhập" });

    // Lấy giá biến thể
    const [[product]] = await pool.execute(
      `SELECT gia FROM bien_the WHERE id = ?`,
      [productId]
    );

    console.log(">>> Kết quả lấy giá biến thể:", product);

    if (!product) {
      return res.status(400).json({ message: "Biến thể không tồn tại hoặc FE gửi sai productId" });
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
