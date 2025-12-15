const path = require("path");
const fs = require("fs");
const multer = require("multer");
const pool = require("../config/db");

const API_BASE = process.env.API_BASE_URL || "http://localhost:5000";
const UPLOAD_ROOT = path.join(__dirname, "..", "uploads");
const uploadDir = path.join(UPLOAD_ROOT, "posts");

fs.mkdirSync(uploadDir, { recursive: true });

async function listPosts(req, res) {
  try {
    const conn = await pool.getConnection();

    const query = `
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
    `;

    const [rows] = await conn.query(query);

    conn.release();

    return res.json({
      ok: true,
      data: rows
    });

  } catch (error) {
    console.error("Error in listPosts:", error);
    return res.status(500).json({
      ok: false,
      message: "Lỗi server! Không thể lấy danh sách bài viết."
    });
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
        DATE(ngay_tao),
        nguoi_dung_id,
        danh_muc
       FROM bai_viet
       WHERE duong_dan_ten_seo = ?
       LIMIT 1`,
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Không tìm thấy bài viết"
      });
    }

    return res.json({
      ok: true,
      data: rows[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Lỗi server"
    });
  } finally {
    conn.release();
  }
}


module.exports = {
  listPosts,
  getBySlug,
};