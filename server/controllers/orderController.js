// server/controllers/orderController.js
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
exports.createOrder = async (req, res) => {
  /**
   * Expected body:
   * {
   *   user_id: optional,
   *   items: [{ product_id, product_name, product_image, unit_price, quantity }],
   *   shipping_fee,
   *   discount,
   *   payment_method,
   *   note,
   *   address: { fullname, phone, email, province, district, ward, address_line }
   * }
   */
  const {
    user_id = null,
    items = [],
    shipping_fee = 0,
    discount = 0,
    payment_method = "COD",
    note = "",
    address = {}
  } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Giỏ hàng rỗng" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Tính tổng tiền từ items
    let total = 0;
    for (const it of items) {
      const qty = parseInt(it.quantity) || 0;
      const price = parseFloat(it.unit_price) || 0;
      total += qty * price;
    }
    total = parseFloat(total.toFixed(2));
    const shipping = parseFloat(shipping_fee) || 0;
    const disc = parseFloat(discount) || 0;
    const grandTotal = parseFloat((total + shipping - disc).toFixed(2));

    // Tạo order
    const order_code = generateOrderCode();
    const insertOrderSql = `
      INSERT INTO orders (order_code, user_id, total, shipping_fee, discount, payment_method, status, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [orderResult] = await conn.query(insertOrderSql, [
      order_code,
      user_id,
      grandTotal,
      shipping,
      disc,
      payment_method,
      "Chờ xử lý",
      note
    ]);
    const orderId = orderResult.insertId;

    // Thêm order_items
    const insertItemSql = `
      INSERT INTO order_items (order_id, product_id, product_name, product_image, unit_price, quantity, total_price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    for (const it of items) {
      const qty = parseInt(it.quantity) || 0;
      const price = parseFloat(it.unit_price) || 0;
      const tprice = parseFloat((qty * price).toFixed(2));
      await conn.query(insertItemSql, [
        orderId,
        it.product_id || null,
        it.product_name || "",
        it.product_image || null,
        price,
        qty,
        tprice
      ]);
    }

    // Thêm địa chỉ giao hàng
    const add = address || {};
    const insertAddressSql = `
      INSERT INTO shipping_address (order_id, fullname, phone, email, province, district, ward, address_line)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await conn.query(insertAddressSql, [
      orderId,
      add.fullname || "",
      add.phone || "",
      add.email || "",
      add.province || "",
      add.district || "",
      add.ward || "",
      add.address_line || ""
    ]);

    await conn.commit();

    res.status(201).json({
      message: "Tạo đơn hàng thành công",
      order: {
        id: orderId,
        order_code,
        total: grandTotal,
        payment_method,
        status: "Chờ xử lý"
      }
    });
  } catch (err) {
    await conn.rollback();
    console.error("createOrder error:", err);
    res.status(500).json({ message: "Lỗi tạo đơn hàng", error: err.message });
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
  const orderId = req.params.id;

  try {
    const [[order]] = await pool.query(
      `SELECT * FROM orders WHERE id = ?`,
      [orderId]
    );

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    const [items] = await pool.query(
      `SELECT * FROM order_items WHERE order_id = ?`,
      [orderId]
    );

    const [[addr]] = await pool.query(
      `SELECT * FROM shipping_address WHERE order_id = ?`,
      [orderId]
    );

    // TÍNH SUBTOTAL (tổng tiền hàng, chưa gồm phí ship/giảm giá)
    let subtotal = 0;
    items.forEach((it) => {
      subtotal += Number(it.total_price || 0);
    });

    // TRẢ VỀ ĐÚNG ĐỊNH DẠNG FRONTEND CẦN
    res.json({
      order: {
        ...order,
        subtotal,          // ⭐ thêm subtotal
      },
      items,
      address: addr || null,
    });
  } catch (err) {
    console.error("getOrderById:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// PUT /api/orders/:id/status  (thay đổi trạng thái) - cho admin
exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  try {
    const [result] = await pool.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, orderId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Không tìm thấy đơn" });
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("updateOrderStatus:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// GET /api/admin/orders  (lấy tất cả đơn hàng) - cho admin
exports.getAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, order_code, user_id, total, payment_method, status, created_at
      FROM orders
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("getAllOrders:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};