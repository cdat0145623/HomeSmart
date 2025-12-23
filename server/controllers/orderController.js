const pool = require("../config/db");
const crypto = require("crypto");

/**
 * Helper: tạo mã đơn hàng duy nhất
 * format: DH + YYMMDD + random 6
 */
function generateOrderCode() {
    const date = new Date();
    const y = String(date.getFullYear()).slice(-2);
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `DH${y}${m}${d}-${rand}`;
}

// POST /api/orders/create
exports.createOrder = async (req, res, next) => {
    console.log("req.body::::", req.body);
    const {
        grandTotal,
        items,
        shipping_fee = 0,
        discount = 0,
        payment_method = "COD",
        note = "",
        address,
    } = req.body;

    console.log("items::::", items);

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const userId = req?.user?.id;
        console.log("createOrder:", userId);
        console.log("address:", address);
        console.log("grandTotal", grandTotal);

        // Thêm địa chỉ giao hàng
        const add = address || {};
        const insertAddressSql = `
      INSERT INTO dia_chi (ho_ten, sdt, email, tinh_thanh, quan_huyen, phuong_xa, dia_chi, nguoi_dung_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const [shipping_address] = await conn.query(insertAddressSql, [
            add.fullname || "",
            add.phone || "",
            add.email || "",
            add.province || "",
            add.district || "",
            add.ward || "",
            add.address_line || "",
            userId,
        ]);
        const shippingAddressId = shipping_address?.insertId;
        console.log("shippingAddressId:", shippingAddressId);

        // Tạo order
        const order_code = generateOrderCode();
        const insertOrderSql = `
      INSERT INTO don_hang (ma_don, nguoi_dung_id, dia_chi_id, tong_tien, phi_ship, giam_gia, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        const [orderResult] = await conn.query(insertOrderSql, [
            order_code,
            userId,
            shippingAddressId,
            grandTotal,
            shipping_fee || 0,
            discount || 0,
            payment_method,
        ]);
        const orderId = orderResult.insertId;

        const newHistoryOrder = `INSERT INTO lich_su_don_hang (don_hang_id, nguoi_dung_id)
                VALUES (?, ?)`;

        await conn.execute(newHistoryOrder, [orderId, userId]);

        //Tao chi tiet don hang
        for (let item of items) {
            const total = Number(item.total_quantity * item.gia_khuyen_mai);
            const insertItemSql = `
      INSERT INTO chi_tiet_don_hang (don_hang_id, san_pham_id, so_luong, gia_tien_san_pham, tong_gia_tung_san_pham)
      VALUES (?, ?, ?, ?, ?)
    `;

            await conn.execute(insertItemSql, [
                orderId,
                item.product_id,
                item.total_quantity,
                item.gia_khuyen_mai,
                total,
            ]);

            const deleteItem = `DELETE FROM gio_hang WHERE nguoi_dung_id = ? AND san_pham_id = ?`;
            await conn.execute(deleteItem, [userId, item.product_id]);
        }

        await conn.commit();

        const order = {
            id: orderId,
            order_code,
            total: grandTotal,
            payment_method,
            status: "Chờ xử lý",
        };
        console.log("order", order);
        if (payment_method === "COD") {
            res.status(201).json({
                ok: true,
                message: `Tạo đơn hàng ${order.order_code} thành công`,
                order,
            });
        } else {
            res.locals.newOrder = order;
            next();
        }
    } catch (err) {
        await conn.rollback();
        console.error("createOrder error:", err);
        res.status(500).json({
            message: "Lỗi tạo đơn hàng",
            error: err.message,
        });
    } finally {
        conn.release();
    }
};

// GET /api/orders/user/:userId  (lấy lịch sử theo user)
exports.getOrdersByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const [rows] = await pool.query(
            `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );
        res.json(rows);
    } catch (err) {
        console.error("getOrdersByUser:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// GET /api/orders/:id (chi tiết 1 order)
exports.getOrderById = async (req, res) => {
    console.log("res.params", req.params);
    const orderCode = req.params.order_code;
    const userId = req?.user?.id;
    const isAdmin = req?.user?.vai_tro === "admin";
    console.log("userId from backend getOrderById:", userId);
    console.log("orderCode server:", orderCode);

    try {
        let sql = `SELECT * FROM don_hang WHERE ma_don = ?`;
        let params = [orderCode];

        if (!isAdmin) {
            sql += ` AND nguoi_dung_id = ?`;
            params.push(userId);
        }

        const [[order]] = await pool.query(sql, params);

        // const [[order]] = await pool.query(
        //     `SELECT * FROM don_hang WHERE ma_don = ? and nguoi_dung_id = ?`,
        //     [orderCode, userId]
        // );

        console.log("don hang from db bend:", order);

        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        const [items] = await pool.query(
            `SELECT ctdh.id, sp.ten_san_pham, sp.anh_dai_dien, ctdh.so_luong, ctdh.tong_gia_tung_san_pham, sp.gia_khuyen_mai
             FROM chi_tiet_don_hang ctdh 
             JOIN san_pham sp ON ctdh.san_pham_id = sp.id
             WHERE don_hang_id = ?`,
            [order?.id]
        );
        console.log("itemsssss", items);
        const subTotal = items.reduce(
            (acc, item) => {
                acc.totalAmount += Number(item.tong_gia_tung_san_pham);
                acc.totalQuantity += Number(item.so_luong);
                return acc;
            },
            { totalAmount: 0, totalQuantity: 0 }
        );

        const [[addr]] = await pool.query(
            `SELECT * FROM dia_chi WHERE nguoi_dung_id = ?`,
            [userId]
        );

        res.status(200).json({
            ok: true,
            orderInfo: {
                order,
                items,
                addr,
                totalSubShipFee: subTotal,
            },
        });
    } catch (err) {
        console.error("getOrderById:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// PUT /api/orders/:id/status  (thay đổi trạng thái) - cho admin
exports.updateOrderStatus = async (req, res) => {
    const orderCode = req?.params?.order_code;
    console.log("order_code from updateOrderStatus::", orderCode);
    const userId = req?.user?.id;
    const isAdmin = req?.user?.vai_tro === "admin";
    const newStatus = req?.body?.status;
    console.log("newStatus::", newStatus);
    // const order_code = req.body?.ma_don;

    const con = await pool.getConnection();
    try {
        let sql = `SELECT * FROM don_hang WHERE ma_don = ?`;
        let params = [orderCode];

        if (!isAdmin) {
            sql += ` AND nguoi_dung_id = ?`;
            params.push(userId);
        }

        const [[order]] = await con.query(sql, params);
        // console.log("thong tin don hang:", order);

        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn" });
        }

        await con.beginTransaction();

        await con.execute(`UPDATE don_hang SET trang_thai = ? WHERE id = ?`, [
            newStatus,
            order?.id,
        ]);
        // console.log("updateOrder:::", updateOrder?.changedRows);

        const [[existOrder]] = await con.query(
            `SELECT * FROM lich_su_don_hang WHERE don_hang_id = ?`,
            [order?.id]
        );
        // console.log("exist order ::::", existOrder);
        if (existOrder) {
            await con.execute(
                `UPDATE lich_su_don_hang SET hanh_dong = ? WHERE id = ?`,
                [newStatus, existOrder.id]
            );
        } else {
            const newHistoryOrder = `INSERT INTO lich_su_don_hang (don_hang_id, nguoi_dung_id)
                VALUES (?, ?)`;

            await con.execute(newHistoryOrder, [order.id, userId]);
        }

        if (newStatus === "hoan_thanh" || newStatus === "huy") {
            await con.execute(
                `UPDATE don_hang SET is_archived = ? WHERE id = ? AND nguoi_dung_id = ?`,
                [1, order?.id, userId]
            );
        }

        await con.commit();

        res.json({ ok: true, message: "Cập nhật trạng thái thành công" });
    } catch (err) {
        await con.rollback();
        console.error("updateOrderStatus:", err);
        res.status(500).json({ message: "Lỗi server" });
    } finally {
        con.release();
    }
};

// GET /api/admin/orders  (lấy tất cả đơn hàng) - cho admin
exports.getAllOrders = async (req, res) => {
    try {
        let { page = 1, pageSize = 10 } = req.query;

        page = parseInt(page);
        pageSize = parseInt(pageSize);

        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 10;

        const offset = (page - 1) * pageSize;

        const [data] = await pool.query(
            `SELECT * FROM don_hang ORDER BY is_archived ASC, ngay_tao DESC LIMIT ? OFFSET ?`,
            [pageSize, offset]
        );

        const [[{ total }]] = await pool.query(
            `SELECT COUNT(*) AS total FROM don_hang`
        );

        res.json({
            data,
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    } catch (err) {
        console.error("getAllOrders:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

exports.getHistoryOrders = async (req, res) => {
    const userId = req?.user?.id;
    console.log("userId::: history order", userId);
    const [oldOrder] = await pool.query(
        `SELECT dh.ma_don, lsdh.ngay_tao, lsdh.hanh_dong, dh.payment_method, dh.tong_tien
         FROM lich_su_don_hang lsdh
         JOIN don_hang dh ON lsdh.don_hang_id = dh.id
         WHERE lsdh.nguoi_dung_id = ? ORDER BY ngay_tao DESC`,
        [userId]
    );
    // console.log("old Order:::", oldOrder);
    res.status(201).json({
        ok: true,
        oldOrder,
    });
};
