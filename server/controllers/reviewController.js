const pool = require("../config/db");

// Thêm đánh giá
exports.addReview = async (req, res) => {
    const userId = req.user.id; // từ middleware auth

    const { productId, rating, comment } = req.body;
    console.log("backend product diid:", productId);

    try {
        // 1) Kiểm tra khách đã mua sản phẩm này thành công chưa
        const [orders] = await pool.query(
            `SELECT ctdh.don_hang_id
            FROM chi_tiet_don_hang ctdh
            JOIN don_hang dh ON ctdh.don_hang_id = dh.id
            WHERE ctdh.san_pham_id = ? AND dh.nguoi_dung_id = ? AND dh.trang_thai = 'hoan_thanh' LIMIT 1`,
            [productId, userId]
        );
        console.log("orders da mua:", orders);

        if (orders.length === 0) {
            return res.status(400).json({
                ok: false,
                message: "Bạn chỉ có thể đánh giá sản phẩm đã mua thành công.",
            });
        }

        const orderId = orders[0].don_hang_id;

        // 2) Kiểm tra user đã đánh giá sản phẩm này chưa
        const [exists] = await pool.query(
            `SELECT id FROM danh_gia WHERE nguoi_dung_id = ? AND san_pham_id = ? LIMIT 1`,
            [userId, productId]
        );

        if (exists.length > 0) {
            return res.status(400).json({
                ok: false,
                message: "Bạn đã đánh giá sản phẩm này rồi.",
            });
        }

        // 3) Lưu đánh giá
        await pool.query(
            `
        INSERT INTO danh_gia 
          (san_pham_id, nguoi_dung_id, don_hang_id, so_sao, noi_dung)
        VALUES (?, ?, ?, ?, ?)
        `,
            [productId, userId, orderId, rating, comment]
        );

        res.json({ ok: true, message: "Đánh giá thành công!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Lỗi server!" });
    }
};

// Lấy đánh giá
exports.getReviews = async (req, res) => {
    const { productId } = req.params;

    try {
        const [rows] = await pool.query(
            `
        SELECT 
          r.id,
          r.so_sao AS rating,
          r.noi_dung AS comment,
          r.ngay_tao AS created_at,
          u.ho_ten AS user_name
        FROM danh_gia r
        JOIN nguoi_dung u ON r.nguoi_dung_id = u.id
        WHERE r.san_pham_id = ?
        ORDER BY r.ngay_tao DESC
        `,
            [productId]
        );

        res.json({ ok: true, reviews: rows });
    } catch (err) {
        console.error("SQL ERROR:", err.sqlMessage);
        console.error("FULL ERROR:", err);
        res.status(500).json({ ok: false, message: "Lỗi server!" });
    }
};

exports.updateReview = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { noi_dung, so_sao } = req.body;

    if (!noi_dung && !so_sao) {
        return res.status(400).json({
            ok: false,
            message: "Không có dữ liệu cập nhật",
        });
    }

    try {
        // 1️⃣ Kiểm tra quyền
        const [rows] = await pool.query(
            `SELECT id FROM danh_gia WHERE id = ? AND nguoi_dung_id = ?`,
            [id, userId]
        );

        if (rows.length === 0) {
            return res.status(403).json({
                ok: false,
                message: "Bạn không có quyền sửa đánh giá này",
            });
        }

        // 2️⃣ Update
        await pool.query(
            `
      UPDATE danh_gia
      SET 
        noi_dung = COALESCE(?, noi_dung),
        so_sao = COALESCE(?, so_sao)
      WHERE id = ?
      `,
            [noi_dung || null, so_sao || null, id]
        );

        res.json({
            ok: true,
            message: "Cập nhật đánh giá thành công",
        });
    } catch (err) {
        console.error("UPDATE REVIEW ERROR:", err);
        res.status(500).json({
            ok: false,
            message: "Lỗi server",
        });
    }
};

exports.getMyReviews = async (req, res) => {
    const userId = req.user.id;
    console.log("USER ID:", req.user.id);
    try {
        const [rows] = await pool.query(
            `
      SELECT 
        dg.id,
        dg.so_sao,
        dg.noi_dung,
        dg.ngay_tao,
        sp.id AS san_pham_id,
        sp.ten_san_pham,
        sp.anh_dai_dien
      FROM danh_gia dg
      JOIN san_pham sp ON dg.san_pham_id = sp.id
      WHERE dg.nguoi_dung_id = ?
      ORDER BY dg.ngay_tao DESC
      `,
            [userId]
        );

        res.json({ ok: true, reviews: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Lỗi server" });
    }
};
