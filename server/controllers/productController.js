const path = require("path");
const fs = require("fs");
const multer = require("multer");
const pool = require("../config/db");

const API_BASE = process.env.API_BASE_URL || "http://localhost:5000";
const UPLOAD_ROOT = path.join(__dirname, "..", "uploads"); 
const uploadDir = path.join(UPLOAD_ROOT, "products");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
destination: (_, __, cb) => cb(null, uploadDir),
filename: (_, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const base = path.basename(file.originalname || "image", ext).replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${base}${ext}`);
},
});

const uploadProductImage = multer({ storage }).single("anh_dai_dien_file");

const toAbs = (p) => {
if (!p) return null;
if (/^https?:\/\//i.test(p)) return p;
const pathStr = String(p).startsWith("/") ? p : `/${p}`;
return `${API_BASE}${pathStr}`;
};

const numOrNull = (v) => {
if (v === "" || v == null) return null;
const n = Number(v);
return Number.isFinite(n) ? n : null;
};

const idOrNull = (v) => {
const n = Number(v);
return Number.isFinite(n) && n > 0 ? n : null;
};

const isJsonString = (s) => {
if (!s) return true; 
try {
    JSON.parse(s);
    return true;
} catch {
    return false;
}
};

async function computeCompareGroup(danh_muc_id, conn) {
let cur = idOrNull(danh_muc_id);
let nhom = null;
while (cur) {
    const [rows] = await conn.query(
    "SELECT danh_muc_cha_id, cho_phep_so_sanh FROM danh_muc WHERE id=? LIMIT 1",
    [cur]
    );
    if (!rows.length) break;
    const { danh_muc_cha_id, cho_phep_so_sanh } = rows[0];
    if (cho_phep_so_sanh === 1) {
    nhom = cur;
    break;
    }
    cur = danh_muc_cha_id;
}
return nhom;
}

async function ensureUniqueSlug(slug, idToIgnore, conn) {
const args = [slug];
let sql = "SELECT id FROM san_pham WHERE duong_dan_ten_seo=? LIMIT 1";
if (idToIgnore) {
    sql =
    "SELECT id FROM san_pham WHERE duong_dan_ten_seo=? AND id<>? LIMIT 1";
    args.push(idToIgnore);
}
const [dup] = await conn.query(sql, args);
if (dup.length) throw new Error("Slug đã tồn tại, vui lòng chọn slug khác");
}

async function getRelatedProducts(req, res) {
  const slug = req.params.slug;

  try {
    // Lấy sản phẩm hiện tại
    const [prod] = await pool.query(
      `SELECT id, danh_muc_id FROM san_pham WHERE duong_dan_ten_seo = ? LIMIT 1`,
      [slug]
    );

    if (!prod.length) {
      return res.json({ ok: false, data: [] });
    }

    const productId = prod[0].id;
    const categoryId = prod[0].danh_muc_id;

    // Lấy 6 SP liên quan cùng danh mục
    const [related] = await pool.query(
      `SELECT id, ten_san_pham, duong_dan_ten_seo, anh_dai_dien, gia_goc, gia_khuyen_mai
       FROM san_pham
       WHERE danh_muc_id = ? AND id != ?
       ORDER BY id DESC
       LIMIT 6`,
      [categoryId, productId]
    );

    return res.json({ ok: true, data: related });

  } catch (err) {
    console.error("ERR related:", err);
    return res.status(500).json({ ok: false });
  }
}



async function getProductBySlug(req, res) {
  const param = req.params.slug;

  try {
    let query, values;

    // Nếu là số → tìm theo ID
    if (/^\d+$/.test(param)) {
      query = `SELECT * FROM san_pham WHERE id = ? LIMIT 1`;
      values = [param];
    } 
    // Nếu là slug → tìm theo duong_dan_ten_seo
    else {
      query = `SELECT * FROM san_pham WHERE duong_dan_ten_seo = ? LIMIT 1`;
      values = [param];
    }

    const [rows] = await pool.query(query, values);

    if (!rows.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    let product = rows[0];

    // Parse JSON thong_so
    if (product.thong_so && typeof product.thong_so === "string") {
      try {
        product.thong_so = JSON.parse(product.thong_so);
      } catch {}
    }

    return res.json({ product });

  } catch (err) {
    console.error("DB ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}



// GET /admin/products?page=&pageSize=&q=
async function listProducts(req, res) {
const page = Math.max(1, Number(req.query.page || 1));
const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize || 10)));
const q = (req.query.q || "").trim();

const where = [];
const args = [];
if (q) {
    where.push("(sp.ten_san_pham LIKE ? OR sp.duong_dan_ten_seo LIKE ?)");
    args.push(`%${q}%`, `%${q}%`);
}
const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

const conn = await pool.getConnection();
try {
    const [[{ total }]] = await conn.query(
    `SELECT COUNT(*) total
    FROM san_pham sp
    ${whereSql}`,
    args
    );

    const [rows] = await conn.query(
    `SELECT
        sp.id,
        sp.ten_san_pham,
        sp.duong_dan_ten_seo,
        sp.anh_dai_dien,
        sp.gia_goc,
        sp.gia_khuyen_mai,
        sp.trang_thai,
        th.ten_thuong_hieu  AS brand_name,
        th.logo_thuong_hieu AS brand_logo,
        dm.ten_danh_muc     AS category_name
    FROM san_pham sp
    LEFT JOIN thuong_hieu th ON sp.thuong_hieu_id = th.id
    LEFT JOIN danh_muc   dm ON sp.danh_muc_id   = dm.id
    ${whereSql}
    ORDER BY sp.id DESC
    LIMIT ? OFFSET ?`,
    [...args, pageSize, (page - 1) * pageSize]
    );

    rows.forEach((r) => {
    if (r.anh_dai_dien) r.anh_dai_dien_full = toAbs(r.anh_dai_dien);
    if (r.brand_logo) r.brand_logo_full = toAbs(r.brand_logo);
    });

    res.json({ ok: true, items: rows, total });
} finally {
    conn.release();
}
}

// GET /admin/products/:id
async function getProduct(req, res) {
const id = Number(req.params.id);
const [rows] = await pool.query(
    `SELECT
    sp.*,
    th.ten_thuong_hieu  AS brand_name,
    th.logo_thuong_hieu AS brand_logo,
    dm.ten_danh_muc     AS category_name
    FROM san_pham sp
    LEFT JOIN thuong_hieu th ON sp.thuong_hieu_id = th.id
    LEFT JOIN danh_muc   dm ON sp.danh_muc_id   = dm.id
    WHERE sp.id=? LIMIT 1`,
    [id]
);
if (!rows.length)
    return res
    .status(404)
    .json({ ok: false, message: "Không tìm thấy sản phẩm" });

const row = rows[0];

if (row.anh_dai_dien) row.anh_dai_dien_full = toAbs(row.anh_dai_dien);
if (row.brand_logo) row.brand_logo_full = toAbs(row.brand_logo);

try {
    if (typeof row.thong_so === "string" && row.thong_so) {
    row.thong_so = JSON.parse(row.thong_so);
    }
} catch {
}

res.json({ ok: true, data: row });
}

// POST /admin/products
async function createProduct(req, res) {
const b = req.body;
if (!b.ten_san_pham || !b.duong_dan_ten_seo) {
    return res.status(400).json({ ok: false, message: "Thiếu tên hoặc slug" });
}
if (!isJsonString(b.thong_so)) {
    return res
    .status(400)
    .json({ ok: false, message: "Trường 'thong_so' phải là JSON hợp lệ" });
}

const conn = await pool.getConnection();
try {
    await conn.beginTransaction();

    await ensureUniqueSlug(b.duong_dan_ten_seo, null, conn);

    const nhom = await computeCompareGroup(b.danh_muc_id, conn);
    const imgPath = req.file
    ? `/uploads/products/${req.file.filename}`
    : b.anh_dai_dien || null;

    const [r] = await conn.query(
    `INSERT INTO san_pham
    (ten_san_pham, duong_dan_ten_seo, anh_dai_dien, gia_goc, gia_khuyen_mai,
        thuong_hieu_id, danh_muc_id, nhom_so_sanh_id, mo_ta, thong_so,
        bao_hanh_thang, trang_thai, ngay_tao, ngay_cap_nhat)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?, NOW(), NOW())`,
    [
        b.ten_san_pham,
        b.duong_dan_ten_seo,
        imgPath,
        numOrNull(b.gia_goc),
        numOrNull(b.gia_khuyen_mai),
        idOrNull(b.thuong_hieu_id),
        idOrNull(b.danh_muc_id),
        nhom,
        b.mo_ta || null,
        b.thong_so || null,
        numOrNull(b.bao_hanh_thang) ?? 12,
        b.trang_thai || "hien",
    ]
    );

    await conn.commit();
    res.status(201).json({ ok: true, id: r.insertId });
} catch (err) {
    try {
    await conn.rollback();
    } catch {}
    res
    .status(400)
    .json({ ok: false, message: err.message || "Tạo sản phẩm thất bại" });
} finally {
    conn.release();
}
}

// PUT /admin/products/:id
async function updateProduct(req, res) {
const id = Number(req.params.id);
const b = req.body;

if (!b.ten_san_pham || !b.duong_dan_ten_seo) {
    return res.status(400).json({ ok: false, message: "Thiếu tên hoặc slug" });
}
if (!isJsonString(b.thong_so)) {
    return res
    .status(400)
    .json({ ok: false, message: "Trường 'thong_so' phải là JSON hợp lệ" });
}

const conn = await pool.getConnection();
try {
    await conn.beginTransaction();

    await ensureUniqueSlug(b.duong_dan_ten_seo, id, conn);

    const imgPath = req.file
    ? `/uploads/products/${req.file.filename}`
    : b.anh_dai_dien || null;

    const [r] = await conn.query(
    `UPDATE san_pham SET
        ten_san_pham=?, duong_dan_ten_seo=?, anh_dai_dien=?,
        gia_goc=?, gia_khuyen_mai=?, thuong_hieu_id=?, danh_muc_id=?,
        mo_ta=?, thong_so=?, bao_hanh_thang=?, trang_thai=?, ngay_cap_nhat=NOW()
    WHERE id=?`,
    [
        b.ten_san_pham,
        b.duong_dan_ten_seo,
        imgPath,
        numOrNull(b.gia_goc),
        numOrNull(b.gia_khuyen_mai),
        idOrNull(b.thuong_hieu_id),
        idOrNull(b.danh_muc_id),
        b.mo_ta || null,
        b.thong_so || null,
        numOrNull(b.bao_hanh_thang) ?? 12,
        b.trang_thai || "hien",
        id,
    ]
    );

    if (!r.affectedRows) {
    await conn.rollback();
    return res
        .status(404)
        .json({ ok: false, message: "Không tìm thấy sản phẩm" });
    }

    if (b.danh_muc_id !== undefined) {
    const nhom = await computeCompareGroup(b.danh_muc_id, conn);
    await conn.query(
        "UPDATE san_pham SET nhom_so_sanh_id=? WHERE id=?",
        [nhom, id]
    );
    }

    await conn.commit();
    res.json({ ok: true });
} catch (err) {
    try {
    await conn.rollback();
    } catch {}
    res
    .status(400)
    .json({ ok: false, message: err.message || "Cập nhật sản phẩm thất bại" });
} finally {
    conn.release();
}
}

// DELETE /admin/products/:id
async function removeProduct(req, res) {
const id = Number(req.params.id);
const [r] = await pool.query("DELETE FROM san_pham WHERE id=?", [id]);
if (!r.affectedRows)
    return res
    .status(404)
    .json({ ok: false, message: "Không tìm thấy sản phẩm" });
res.json({ ok: true });
}

async function getTopSellingProducts(req, res) {
  try {
    const conn = await pool.getConnection();

    const [rows] = await conn.query(`
      SELECT 
          sp.id AS product_id,
          sp.ten_san_pham,
          sp.duong_dan_ten_seo,
          sp.anh_dai_dien,
          bt.id AS variant_id,
          bt.gia,
          bt.gia_khuyen_mai,
          SUM(dhct.so_luong) AS total_sold
      FROM don_hang_chi_tiet dhct
      JOIN bien_the bt ON dhct.bien_the_id = bt.id
      JOIN san_pham sp ON bt.san_pham_id = sp.id
      GROUP BY sp.id
      ORDER BY total_sold DESC
      LIMIT 4
    `);

    conn.release();
    res.json({ ok: true, data: rows });

  } catch (error) {
    console.error("Lỗi API top-selling:", error);
    res.status(500).json({ ok: false, message: "Lỗi server" });
  }
}


module.exports = {
listProducts,
getProduct,
createProduct,
updateProduct,
removeProduct,
uploadProductImage,
getTopSellingProducts,
getProductBySlug,
getRelatedProducts
};
