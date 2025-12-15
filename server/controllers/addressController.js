const pool = require("../config/db");

// GET /users/addresses
exports.list = async (req, res) => {
if (!req.user) return res.status(401).json({ ok:false, message:"Chưa đăng nhập" });
const [rows] = await pool.query(
    "SELECT * FROM dia_chi WHERE user_id=? ORDER BY mac_dinh DESC, cap_nhat_luc DESC",
    [req.user.id]
);
res.json({ ok:true, data:{ addresses: rows } });
};

// POST /users/addresses
exports.create = async (req, res) => {
if (!req.user) return res.status(401).json({ ok:false, message:"Chưa đăng nhập" });
const { ho_ten, sdt, tinh_thanh, quan_huyen, phuong_xa, dia_chi, ghi_chu, mac_dinh } = req.body || {};
if (!ho_ten || !sdt || !tinh_thanh || !quan_huyen || !phuong_xa || !dia_chi)
    return res.status(400).json({ ok:false, message:"Thiếu thông tin bắt buộc" });

const conn = await pool.getConnection();
try {
    await conn.beginTransaction();
    if (mac_dinh) await conn.query("UPDATE dia_chi SET mac_dinh=0 WHERE user_id=?", [req.user.id]);

    const [r] = await conn.query(
    `INSERT INTO dia_chi
    (user_id, ho_ten, sdt, tinh_thanh, quan_huyen, phuong_xa, dia_chi, ghi_chu, mac_dinh)
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [req.user.id, ho_ten, sdt, tinh_thanh, quan_huyen, phuong_xa, dia_chi, ghi_chu || null, mac_dinh ? 1 : 0]
    );
    await conn.commit();
    res.status(201).json({ ok:true, message:"Đã thêm địa chỉ", data:{ id:r.insertId } });
} catch (e) {
    await conn.rollback();
    console.error(e);
    res.status(500).json({ ok:false, message:"Lỗi máy chủ" });
} finally { conn.release(); }
};

// PUT /users/addresses/:id
exports.update = async (req, res) => {
if (!req.user) return res.status(401).json({ ok:false, message:"Chưa đăng nhập" });
const id = Number(req.params.id);
const { ho_ten, sdt, tinh_thanh, quan_huyen, phuong_xa, dia_chi, ghi_chu, mac_dinh } = req.body || {};

const conn = await pool.getConnection();
try {
    await conn.beginTransaction();
    const [own] = await conn.query("SELECT id FROM dia_chi WHERE id=? AND user_id=? LIMIT 1", [id, req.user.id]);
    if (!own.length) { await conn.rollback(); return res.status(404).json({ ok:false, message:"Không tìm thấy địa chỉ" }); }

    if (mac_dinh) await conn.query("UPDATE dia_chi SET mac_dinh=0 WHERE user_id=?", [req.user.id]);

    await conn.query(
    `UPDATE dia_chi SET ho_ten=?, sdt=?, tinh_thanh=?, quan_huyen=?, phuong_xa=?, dia_chi=?, ghi_chu=?, mac_dinh=?
    WHERE id=? AND user_id=?`,
    [ho_ten, sdt, tinh_thanh, quan_huyen, phuong_xa, dia_chi, ghi_chu || null, mac_dinh ? 1 : 0, id, req.user.id]
    );

    await conn.commit();
    res.json({ ok:true, message:"Đã cập nhật địa chỉ" });
} catch (e) {
    await conn.rollback();
    console.error(e);
    res.status(500).json({ ok:false, message:"Lỗi máy chủ" });
} finally { conn.release(); }
};

// DELETE /users/addresses/:id
exports.remove = async (req, res) => {
if (!req.user) return res.status(401).json({ ok:false, message:"Chưa đăng nhập" });
const id = Number(req.params.id);
const [own] = await pool.query("SELECT id FROM dia_chi WHERE id=? AND user_id=? LIMIT 1", [id, req.user.id]);
if (!own.length) return res.status(404).json({ ok:false, message:"Không tìm thấy địa chỉ" });
await pool.query("DELETE FROM dia_chi WHERE id=? AND user_id=?", [id, req.user.id]);
res.json({ ok:true, message:"Đã xoá địa chỉ" });
};

// PATCH /users/addresses/:id/default
exports.setDefault = async (req, res) => {
if (!req.user) return res.status(401).json({ ok:false, message:"Chưa đăng nhập" });
const id = Number(req.params.id);

const conn = await pool.getConnection();
try {
    await conn.beginTransaction();
    const [own] = await conn.query("SELECT id FROM dia_chi WHERE id=? AND user_id=? LIMIT 1", [id, req.user.id]);
    if (!own.length) { await conn.rollback(); return res.status(404).json({ ok:false, message:"Không tìm thấy địa chỉ" }); }

    await conn.query("UPDATE dia_chi SET mac_dinh=0 WHERE user_id=?", [req.user.id]);
    await conn.query("UPDATE dia_chi SET mac_dinh=1 WHERE id=? AND user_id=?", [id, req.user.id]);

    await conn.commit();
    res.json({ ok:true, message:"Đã đặt làm địa chỉ mặc định" });
} catch (e) {
    await conn.rollback();
    console.error(e);
    res.status(500).json({ ok:false, message:"Lỗi máy chủ" });
} finally { conn.release(); }
};
