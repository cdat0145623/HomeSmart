const path = require("path");
const fs = require("fs");
const multer = require("multer");
const pool = require("../config/db");

const API_BASE = process.env.API_BASE_URL || "http://localhost:5000";
const UPLOAD_ROOT = path.join(__dirname, "..", "uploads");
// const uploadDir = path.join(UPLOAD_ROOT, "posts");
const uploadDir = path.join(UPLOAD_ROOT, "news");

fs.mkdirSync(uploadDir, { recursive: true });

// GET /news/latest
// app.get("/news/latest", async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         tieu_de,
//         duong_dan_ten_seo,
//         anh_dai_dien,
//         ngay_tao
//       FROM bai_viet
//       ORDER BY ngay_tao DESC
//       LIMIT 5
//     `);

//     res.json({ ok: true, data: rows });
//   } catch (err) {
//     res.status(500).json({ ok: false, message: err.message });
//   }
// });
async function listNEW(req, res) {
    const slug = req?.params?.slug;
    console.log("slug he eh ehkhac slug heh ehheeh L:::", slug);
    try {
        const conn = await pool.getConnection();

        const [rows] = await conn.query(
            `
      SELECT 
        tieu_de,
        duong_dan_ten_seo,
        anh_dai_dien,
        ngay_tao
      FROM bai_viet
      WHERE slug <> ?
      ORDER BY ngay_tao DESC
      LIMIT 3
    `,
            [slug]
        );

        conn.release();

        res.json({
            ok: true,
            rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false });
    }
}

/* =========================
   UPLOAD ẢNH TIN TỨC
========================= */
const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadDir),
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname || "");
        const base = path
            .basename(file.originalname || "image", ext)
            .replace(/\s+/g, "-");
        cb(null, `${Date.now()}-${base}${ext}`);
    },
});

const uploadNewsImage = multer({ storage }).single("anh_dai_dien_file");

const toAbs = (p) => {
    if (!p) return null;
    if (/^https?:\/\//i.test(p)) return p;
    return `${API_BASE}${p.startsWith("/") ? p : `/${p}`}`;
};

async function listPosts(req, res) {
    try {
        const conn = await pool.getConnection();

        const [rows] = await conn.query(`
      SELECT 
        id,
        tieu_de,
        duong_dan_ten_seo,
        anh_dai_dien,
        tom_tat,
        DATE(ngay_tao) AS ngay_tao,
        nguoi_dung_id,
        danh_muc
      FROM bai_viet
      ORDER BY ngay_tao DESC
    `);

        conn.release();

        res.json({
            ok: true,
            rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false });
    }
}

// async function listPosts(req, res) {
//   try {
//     const conn = await pool.getConnection();

//     // Lấy query từ URL
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const search = (req.query.q || "").trim();

//     const offset = (page - 1) * limit;

//     // Điều kiện tìm kiếm
//     let whereSql = "";
//     let params = [];

//     if (search) {
//       whereSql = "WHERE tieu_de LIKE ? OR tom_tat LIKE ?";
//       params.push(`%${search}%`, `%${search}%`);
//     }

//     // Đếm tổng bài viết
//     const [[{ total }]] = await conn.query(`
//       SELECT COUNT(*) AS total
//       FROM bai_viet
//       ${whereSql}
//     `, params);

//     // Lấy danh sách bài viết
//     const [rows] = await conn.query(`
//       SELECT
//         id,
//         tieu_de,
//         duong_dan_ten_seo,
//         anh_dai_dien,
//         tom_tat,
//         DATE(ngay_tao) AS ngay_tao,
//         nguoi_dung_id,
//         danh_muc
//       FROM bai_viet
//       ${whereSql}
//       ORDER BY ngay_tao DESC
//       LIMIT ? OFFSET ?
//     `, [...params, limit, offset]);

//     conn.release();

//     return res.json({
//       ok: true,
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit),
//       data: rows
//     });

//   } catch (error) {
//     console.error("Error in listPosts:", error);

//     return res.status(500).json({
//       ok: false,
//       message: "Lỗi server! Không thể lấy danh sách bài viết."
//     });
//   }
// }

async function getBySlug(req, res) {
    const slug = req.params.slug;
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(
            `SELECT 
        id,
        tieu_de,
        duong_dan_ten_seo,
        anh_dai_dien,
        tom_tat,
        noi_dung,
        DATE(ngay_tao) AS ngay_tao,
        nguoi_dung_id,
        danh_muc
      FROM bai_viet
      WHERE duong_dan_ten_seo = ?
      LIMIT 1`,
            [slug]
        );

        if (!rows.length) {
            return res.status(404).json({
                ok: false,
                message: "Không tìm thấy bài viết",
            });
        }

        const post = rows[0];

        // ✅ FIX ẢNH
        if (post.anh_dai_dien) {
            post.anh_dai_dien = toAbs(post.anh_dai_dien);
        }

        res.json({ ok: true, data: post });
    } catch (err) {
        console.error("GET NEWS SLUG ERR:", err);
        res.status(500).json({ ok: false });
    } finally {
        conn.release();
    }
}

// CHECK SLUG TRÙNG
async function ensureUniqueSlug(slug, ignoreId, conn) {
    let sql = "SELECT id FROM bai_viet WHERE duong_dan_ten_seo=? LIMIT 1";
    const args = [slug];

    if (ignoreId) {
        sql =
            "SELECT id FROM bai_viet WHERE duong_dan_ten_seo=? AND id<>? LIMIT 1";
        args.push(ignoreId);
    }

    const [rows] = await conn.query(sql, args);
    if (rows.length) {
        throw new Error("Slug đã tồn tại, vui lòng chọn slug khác");
    }
}

async function getNewsById(req, res) {
    const idNews = req?.params.id;
    console.log("id bai viet she ehe :", idNews);
    const [[news]] = await pool.query(`SELECT * FROM bai_viet WHERE id = ?`, [
        idNews,
    ]);

    console.log("info news hehe ehe eh:", news);

    if (!news) {
        res.status(402).json({
            ok: false,
            message: "Không tìm thấy bài viết!!!",
        });
    }
    res.status(200).json({
        ok: true,
        news,
    });
}

//GET /admin/news

async function listNews(req, res) {
    console.log("list News api admin::::", req?.query);
    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.min(
        50,
        Math.max(1, Number(req.query.pageSize || 10))
    );
    const q = (req.query.q || "").trim();

    const where = [];
    const args = [];

    if (q) {
        where.push("(tieu_de LIKE ? OR duong_dan_ten_seo LIKE ?)");
        args.push(`%${q}%`, `%${q}%`);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    try {
        const [[{ total }]] = await pool.query(
            `SELECT COUNT(*) total FROM bai_viet ${whereSql}`,
            args
        );

        const [rows] = await pool.query(
            `SELECT
        id,
        tieu_de,
        duong_dan_ten_seo,
        anh_dai_dien,
        tom_tat,
        trang_thai,
        ngay_tao
      FROM bai_viet
      ${whereSql}
      ORDER BY ngay_tao DESC
      LIMIT ? OFFSET ?`,
            [...args, pageSize, (page - 1) * pageSize]
        );
        rows.forEach((r) => {
            if (r.anh_dai_dien) {
                r.anh_dai_dien = toAbs(r.anh_dai_dien);
            }
        });

        res.json({ ok: true, items: rows, total });
    } catch (err) {
        console.error("LIST NEWS ERR:", err);
        res.status(500).json({ ok: false, message: "Lỗi server" });
    }
}

//GET /news/:slug
async function getNewsBySlug(req, res) {
    const slug = req.params.slug;
    console.log("slug heh eh eh e getnew slgu:", slug);

    const conn = await pool.getConnection();

    try {
        const [[rows]] = await conn.query(
            `SELECT * FROM bai_viet WHERE duong_dan_ten_seo=? AND trang_thai='hien' LIMIT 1`,
            [slug]
        );

        if (!rows) {
            return res
                .status(404)
                .json({ ok: false, message: "Không tìm thấy tin" });
        }

        const [related] = await conn.query(
            `SELECT * FROM bai_viet WHERE duong_dan_ten_seo <> ? ORDER BY ngay_tao DESC LIMIT 3`,
            [slug]
        );

        conn.release();

        res.json({ ok: true, news: rows, relatedNews: related });
    } catch (err) {
        console.error("GET NEWS ERR:", err);
        res.status(500).json({ ok: false, message: err });
    }
}

// POST /admin/news

async function createNews(req, res) {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);
    const b = req.body;

    if (!b.tieu_de || !b.duong_dan_ten_seo) {
        return res
            .status(400)
            .json({ ok: false, message: "Thiếu tiêu đề hoặc slug" });
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        await ensureUniqueSlug(b.duong_dan_ten_seo, null, conn);

        const imgPath = req.file
            ? `/uploads/news/${req.file.filename}`
            : b.anh_dai_dien || null;

        const [r] = await conn.query(
            `INSERT INTO bai_viet
      (tieu_de, duong_dan_ten_seo, anh_dai_dien, tom_tat, noi_dung, trang_thai, ngay_tao, ngay_cap_nhat)
      VALUES (?,?,?,?,?,?,NOW(),NOW())`,
            [
                b.tieu_de,
                b.duong_dan_ten_seo,
                imgPath,
                b.tom_tat || null,
                b.noi_dung || null,
                b.trang_thai || "hien",
            ]
        );

        await conn.commit();
        res.status(201).json({ ok: true, id: r.insertId });
    } catch (err) {
        await conn.rollback();
        res.status(400).json({
            ok: false,
            message: err.message || "Tạo tin thất bại",
        });
    } finally {
        conn.release();
    }
}

//PUT /admin/news/:id

async function updateNews(req, res) {
    const id = Number(req.params.id);
    const b = req.body;

    if (!b.tieu_de || !b.duong_dan_ten_seo) {
        return res
            .status(400)
            .json({ ok: false, message: "Thiếu tiêu đề hoặc slug" });
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        await ensureUniqueSlug(b.duong_dan_ten_seo, id, conn);

        const imgPath = req.file
            ? `/uploads/news/${req.file.filename}`
            : b.anh_dai_dien || null;
        const [r] = await conn.query(
            `UPDATE bai_viet SET
        tieu_de=?,
        duong_dan_ten_seo=?,
        anh_dai_dien=?,
        tom_tat=?,
        noi_dung=?,
        trang_thai=?,
        ngay_cap_nhat=NOW()
      WHERE id=?`,
            [
                b.tieu_de,
                b.duong_dan_ten_seo,
                imgPath,
                b.tom_tat || null,
                b.noi_dung || null,
                b.trang_thai || "hien",
                id,
            ]
        );
        if (!r.affectedRows) {
            await conn.rollback();
            return res
                .status(404)
                .json({ ok: false, message: "Không tìm thấy tin" });
        }

        await conn.commit();
        res.json({ ok: true });
    } catch (err) {
        await conn.rollback();
        res.status(400).json({
            ok: false,
            message: err.message || "Cập nhật thất bại",
        });
    } finally {
        conn.release();
    }
}

// DELETE /admin/news/:id

async function removeNews(req, res) {
    const id = Number(req.params.id);
    const [r] = await pool.query("DELETE FROM tin_tuc WHERE id=?", [id]);

    if (!r.affectedRows) {
        return res
            .status(404)
            .json({ ok: false, message: "Không tìm thấy tin" });
    }

    res.json({ ok: true });
}

module.exports = {
    listPosts,
    getBySlug,
    uploadNewsImage,
    listNews,
    listNEW,
    getNewsBySlug,
    createNews,
    updateNews,
    removeNews,
    getNewsById,
};
