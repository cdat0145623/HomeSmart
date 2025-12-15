
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const pool = require("../config/db");

const API_BASE = process.env.API_BASE_URL || "http://localhost:5000";
const UPLOAD_ROOT = path.join(__dirname, "..", "uploads"); 
const uploadDir = path.join(UPLOAD_ROOT, "brands");

// cấu hình multer
const storage = multer.diskStorage({
destination: (_, __, cb) => cb(null, uploadDir),
filename: (_, file, cb) => {
    const ext = path.extname(file?.originalname || "");
    const base = path
    .basename(file?.originalname || "logo", ext)
    .replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${base}${ext}`);
},
});
const uploadBrandLogo = multer({ storage }).single("logo_file");

// helper
function slugify(s = "") {
return String(s)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// GET /admin/brands?page&pageSize&q
async function listBrands(req, res) {
try {
    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize || 10)));
    const q = (req.query.q || "").trim();

    const where = [];
    const params = [];
    if (q) {
    where.push("(ten_thuong_hieu LIKE ? OR duong_dan_ten_seo LIKE ?)");
    params.push(`%${q}%`, `%${q}%`);
    }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM thuong_hieu ${whereSql}`,
    params
    );

    const offset = (page - 1) * pageSize;
    const [rows] = await pool.query(
    `SELECT id, ten_thuong_hieu, duong_dan_ten_seo, logo_thuong_hieu, ngay_tao, ngay_cap_nhat
    FROM thuong_hieu
    ${whereSql}
    ORDER BY id DESC
    LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
    );

    return res.json({ ok: true, items: rows, total });
} catch (err) {
    console.error("[brand.list] error:", err);
    return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
}
}

// GET /admin/brands/:id
async function getBrand(req, res) {
try {
    const id = Number(req.params.id);
    const [[row]] = await pool.query(
    "SELECT id, ten_thuong_hieu, duong_dan_ten_seo, logo_thuong_hieu FROM thuong_hieu WHERE id=? LIMIT 1",
    [id]
    );
    if (!row) return res.status(404).json({ ok: false, message: "Không tìm thấy thương hiệu" });
    return res.json({ ok: true, data: row });
} catch (err) {
    console.error("[brand.get] error:", err);
    return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
}
}

// POST /admin/brands (multipart/form-data)
async function createBrand(req, res) {
uploadBrandLogo(req, res, async (err) => {
    if (err) {
    console.error("[brand.create] upload err:", err);
    return res.status(400).json({ ok: false, message: "Upload logo thất bại" });
    }
    try {
    const ten = (req.body.ten_thuong_hieu || "").trim();
    let slug = (req.body.duong_dan_ten_seo || "").trim();
    const logoUrl = (req.body.logo_thuong_hieu || "").trim();

    if (!ten) return res.status(400).json({ ok: false, message: "Thiếu tên thương hiệu" });
    if (!slug) slug = slugify(ten);
    let logo = logoUrl;
    if (req.file) {
        const rel = path.posix.join("/uploads/brands", req.file.filename);
        logo = rel;
    }
    if (!logo) return res.status(400).json({ ok: false, message: "Thiếu logo_thuong_hieu" });

    try {
        const [r] = await pool.query(
        `INSERT INTO thuong_hieu(ten_thuong_hieu, duong_dan_ten_seo, logo_thuong_hieu, ngay_tao, ngay_cap_nhat)
        VALUES(?, ?, ?, NOW(), NOW())`,
        [ten, slug, logo]
        );
        return res.status(201).json({ ok: true, id: r.insertId });
    } catch (e) {
        if (String(e?.code).toLowerCase() === "er_dup_entry") {
        return res.status(409).json({ ok: false, message: "Slug thương hiệu đã tồn tại" });
        }
        throw e;
    }
    } catch (e) {
    console.error("[brand.create] error:", e);
    return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
});
}

// PUT /admin/brands/:id (multipart/form-data)
async function updateBrand(req, res) {
uploadBrandLogo(req, res, async (err) => {
    if (err) {
    console.error("[brand.update] upload err:", err);
    return res.status(400).json({ ok: false, message: "Upload logo thất bại" });
    }
    try {
    const id = Number(req.params.id);
    const [[old]] = await pool.query(
        "SELECT id, logo_thuong_hieu FROM thuong_hieu WHERE id=? LIMIT 1",
        [id]
    );
    if (!old) return res.status(404).json({ ok: false, message: "Không tìm thấy thương hiệu" });

    const ten = (req.body.ten_thuong_hieu || "").trim();
    let slug = (req.body.duong_dan_ten_seo || "").trim();
    const logoUrl = (req.body.logo_thuong_hieu || "").trim();

    if (!ten) return res.status(400).json({ ok: false, message: "Thiếu tên thương hiệu" });
    if (!slug) slug = slugify(ten);

    let logo = logoUrl || old.logo_thuong_hieu;
    if (req.file) {
        const rel = path.posix.join("/uploads/brands", req.file.filename);
        logo = rel;
    }

    try {
        await pool.query(
        `UPDATE thuong_hieu
        SET ten_thuong_hieu=?, duong_dan_ten_seo=?, logo_thuong_hieu=?, ngay_cap_nhat=NOW()
        WHERE id=?`,
        [ten, slug, logo, id]
        );
        return res.json({ ok: true, message: "Đã cập nhật" });
    } catch (e) {
        if (String(e?.code).toLowerCase() === "er_dup_entry") {
        return res.status(409).json({ ok: false, message: "Slug thương hiệu đã tồn tại" });
        }
        throw e;
    }
    } catch (e) {
    console.error("[brand.update] error:", e);
    return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
});
}

// DELETE /admin/brands/:id
async function deleteBrand(req, res) {
try {
    const id = Number(req.params.id);
    const [ref] = await pool.query("SELECT id FROM san_pham WHERE thuong_hieu_id=? LIMIT 1", [id]);
    if (ref.length) {
    return res.status(400).json({
        ok: false,
        message: "Không thể xóa: đang có sản phẩm tham chiếu thương hiệu này",
    });
    }
    const [r] = await pool.query("DELETE FROM thuong_hieu WHERE id=? LIMIT 1", [id]);
    if (!r.affectedRows) {
    return res.status(404).json({ ok: false, message: "Không tìm thấy thương hiệu" });
    }
    return res.json({ ok: true, message: "Đã xóa thương hiệu" });
} catch (e) {
    console.error("[brand.delete] error:", e);
    return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
}
}

module.exports = {
listBrands,
getBrand,
createBrand,
updateBrand,
deleteBrand,
};
