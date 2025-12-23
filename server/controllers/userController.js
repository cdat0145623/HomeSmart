const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

function isValidVNPhone(s) {
    return /^0\d{9,10}$/.test(String(s || "").trim());
}
function isValidGender(g) {
    if (g == null || g === "") return true;
    const v = String(g).toLowerCase();
    return ["nam", "nu", "khac"].includes(v);
}
function normalizeGender(g) {
    if (!g && g !== "") return null;
    const v = String(g).trim().toLowerCase();
    return v ? v : null;
}
function isValidDateYYYYMMDD(d) {
    if (!d) return true;
    const s = String(d).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const dt = new Date(s + "T00:00:00Z");
    if (Number.isNaN(dt.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dt.getTime() <= today.getTime();
}
function normalizeDate(d) {
    if (!d) return null;
    return String(d).trim() || null;
}

//ME
async function me(req, res) {
    try {
        if (!req.user)
            return res
                .status(401)
                .json({ ok: false, message: "Chưa đăng nhập" });

        const [[rows]] = await pool.query(
            `SELECT id, vai_tro, ho_ten, email, gioi_tinh, sdt, ngay_sinh, avatar_url, trang_thai FROM nguoi_dung WHERE id = ?`,
            [req.user.id]
        );
        console.log("user at api me:", rows);

        return res.json({ ok: true, user: rows });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/avatar"));
    },
    filename: function (req, file, cb) {
        console.log("filename:", file);
        const ext = path.extname(file.originalname);

        const name = path.basename(file.originalname, ext);

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
    ]);
    if (!allowed.has(file.mimetype)) {
        return cb(
            new Error("Only image files are allowed (jpeg/png/webp/gif).")
        );
    }
    cb(null, true);
};
const upload = multer({ storage, fileFilter }).single("avatar");

async function uploadImage(req, res, next) {
    console.log("file:", req.file?.filename);
    if (!req.file)
        return res.status(400).json({ ok: false, message: "No file" });
    next();
}
// UPDATE ME
async function updateMe(req, res, next) {
    const con = await pool.getConnection();
    try {
        const userId = req?.user?.id;
        console.log("body of updatedMe:::", req.body);
        let { ho_ten, sdt, gioi_tinh, ngay_sinh } = req.body || {};
        ho_ten = (ho_ten ?? "").toString().trim();
        sdt = (sdt ?? "").toString().trim();
        gioi_tinh = normalizeGender(gioi_tinh);
        ngay_sinh = normalizeDate(ngay_sinh);

        if (sdt && !isValidVNPhone(sdt)) {
            return res
                .status(400)
                .json({ ok: false, message: "Số điện thoại không hợp lệ" });
        }
        if (!isValidGender(gioi_tinh)) {
            return res.status(400).json({
                ok: false,
                message: "Giới tính không hợp lệ (nam|nu|khac)",
            });
        }
        if (!isValidDateYYYYMMDD(ngay_sinh)) {
            return res.status(400).json({
                ok: false,
                message:
                    "Ngày sinh không hợp lệ (YYYY-MM-DD, không vượt quá hôm nay)",
            });
        }

        const [[user]] = await con.query(
            `SELECT * FROM nguoi_dung WHERE id = ?`,
            [userId]
        );
        console.log("exist User:", user);
        if (!user)
            return res.status(401).json({
                ok: false,
                message: "Tài khoản không tồn tại!!!!",
            });

        await con.beginTransaction();
        console.log("filename at updateme exist he he he:");
        if (req?.file?.filename) {
            console.log("filename:::", req.file);
            const imgPath = req.file
                ? `/public/avatar/${req.file.filename}`
                : null;
            await con.query(
                `UPDATE nguoi_dung SET avatar_url = ? WHERE id = ?`,
                [imgPath, userId]
            );
        }
        await con.query(
            `UPDATE nguoi_dung SET ho_ten=?, sdt=?, gioi_tinh=?, ngay_sinh=? WHERE id=?`,
            [ho_ten || null, sdt || null, gioi_tinh, ngay_sinh, req.user.id]
        );
        await con.commit();
        next();
        // return res.json({ ok: true, message: "Đã cập nhật hồ sơ" });
    } catch (e) {
        console.error(e);
        try {
            await con.rollback();
        } catch {}
        return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    } finally {
        con.release();
    }
}

// CHANGE PASSWORD
async function changePassword(req, res) {
    try {
        if (!req.user)
            return res
                .status(401)
                .json({ ok: false, message: "Chưa đăng nhập" });

        const { currentPassword, newPassword } = req.body || {};
        if (!currentPassword || !newPassword)
            return res
                .status(400)
                .json({ ok: false, message: "Thiếu thông tin" });
        if (String(newPassword).length < 6)
            return res
                .status(400)
                .json({ ok: false, message: "Mật khẩu mới tối thiểu 6 ký tự" });

        const [rows] = await pool.query(
            "SELECT mat_khau_hash FROM nguoi_dung WHERE id=? LIMIT 1",
            [req.user.id]
        );
        if (!rows.length)
            return res
                .status(404)
                .json({ ok: false, message: "Không tìm thấy người dùng" });

        const existingHash = rows[0].mat_khau_hash || "";
        if (!existingHash) {
            return res.status(400).json({
                ok: false,
                message:
                    "Tài khoản Google-only chưa có mật khẩu. Vui lòng dùng chức năng 'Đặt mật khẩu lần đầu'.",
            });
        }

        const ok = await bcrypt.compare(currentPassword, existingHash);
        if (!ok)
            return res
                .status(400)
                .json({ ok: false, message: "Mật khẩu hiện tại không đúng" });

        const hash = await bcrypt.hash(String(newPassword), 10);
        await pool.query("UPDATE nguoi_dung SET mat_khau_hash=? WHERE id=?", [
            hash,
            req.user.id,
        ]);

        return res.json({ ok: true, message: "Đổi mật khẩu thành công" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
}
function genStrongPassword() {
    const U = "ABCDEFGHJKLMNPQRSTUVWXYZ",
        L = "abcdefghijkmnpqrstuvwxyz",
        D = "23456789",
        S = "@#$%&*+-_";
    const A = U + L + D + S;
    const pick = (s) => s[Math.floor(Math.random() * s.length)];
    let x = pick(U) + pick(L) + pick(D) + pick(S);
    for (let i = 4; i < 12; i++) x += pick(A);
    return x
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

// POST /admin/users
async function createStaffUser(req, res) {
    try {
        if (!req.user)
            return res
                .status(401)
                .json({ ok: false, message: "Chưa đăng nhập" });
        if (req.user.vai_tro !== "admin")
            return res
                .status(403)
                .json({ ok: false, message: "Không đủ quyền" });

        let {
            ho_ten,
            email,
            vai_tro,
            password,
            sdt = null,
            gioi_tinh = null,
            ngay_sinh = null,
        } = req.body || {};
        if (!email || !vai_tro)
            return res
                .status(400)
                .json({ ok: false, message: "Thiếu email hoặc vai_tro" });
        if (!["admin", "nhan_vien"].includes(String(vai_tro))) {
            return res.status(400).json({
                ok: false,
                message: "vai_tro chỉ nhận 'admin' hoặc 'nhan_vien'",
            });
        }

        const [dup] = await pool.query(
            "SELECT id FROM nguoi_dung WHERE email=? LIMIT 1",
            [email]
        );
        if (dup.length)
            return res
                .status(409)
                .json({ ok: false, message: "Email đã tồn tại" });

        const raw =
            password && String(password).trim().length >= 8
                ? String(password).trim()
                : genStrongPassword();
        const hash = await bcrypt.hash(raw, 10);

        const [r] = await pool.query(
            `INSERT INTO nguoi_dung
        (vai_tro, ho_ten, email, email_da_xac_minh, sdt, gioi_tinh, ngay_sinh,
            mat_khau_hash, trang_thai, ngay_tao, ngay_cap_nhat)
        VALUES (?, ?, ?, 1, ?, ?, ?, ?, 'active', NOW(), NOW())`,
            [
                vai_tro,
                ho_ten || null,
                email,
                sdt,
                normalizeGender(gioi_tinh),
                normalizeDate(ngay_sinh),
                hash,
            ]
        );

        return res.status(201).json({
            ok: true,
            message: "Tạo tài khoản thành công",
            data: {
                user: {
                    id: r.insertId,
                    ho_ten: ho_ten || null,
                    email,
                    vai_tro,
                    sdt,
                    gioi_tinh: normalizeGender(gioi_tinh),
                    ngay_sinh: normalizeDate(ngay_sinh),
                    trang_thai: "active",
                },
                tempPassword: password ? undefined : raw,
            },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
}

async function listUsersAdmin(req, res) {
    try {
        if (!req.user || req.user.vai_tro !== "admin") {
            return res
                .status(403)
                .json({ ok: false, message: "Không đủ quyền" });
        }

        const page = Math.max(1, parseInt(req.query.page || "1", 10));
        const pageSize = Math.min(
            50,
            Math.max(1, parseInt(req.query.pageSize || "10", 10))
        );
        const keyword = String(req.query.keyword || "")
            .trim()
            .toLowerCase();

        const params = [];
        let where = "1=1";
        if (keyword) {
            where += " AND (LOWER(email) LIKE ? OR LOWER(ho_ten) LIKE ?)";
            params.push(`%${keyword}%`, `%${keyword}%`);
        }

        const offset = (page - 1) * pageSize;
        const sqlData = `
    SELECT id, ho_ten, email, vai_tro, trang_thai
    FROM nguoi_dung
    WHERE ${where}
    ORDER BY id DESC
    LIMIT ? OFFSET ?`;
        const sqlCount = `SELECT COUNT(*) AS total FROM nguoi_dung WHERE ${where}`;

        const [rows] = await pool.query(sqlData, [...params, pageSize, offset]);
        const [c] = await pool.query(sqlCount, params);
        const total = c[0]?.total || 0;

        return res.json({
            ok: true,
            data: {
                items: rows,
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
}
// async function adminListUsers(req, res) {
//     try {
//         if (!req.user)
//             return res
//                 .status(401)
//                 .json({ ok: false, message: "Chưa đăng nhập" });
//         if (req.user.vai_tro !== "admin")
//             return res
//                 .status(403)
//                 .json({ ok: false, message: "Không đủ quyền" });

//         let { page = 1, pageSize = 10, keyword = "" } = req.query || {};
//         page = Math.max(1, parseInt(page));
//         pageSize = Math.min(50, Math.max(1, parseInt(pageSize)));
//         const offset = (page - 1) * pageSize;

//         const kw = String(keyword || "").trim();
//         const whereParts = [];
//         const params = [];
//         if (kw) {
//             whereParts.push("(email LIKE ? OR ho_ten LIKE ?)");
//             params.push(`%${kw}%`, `%${kw}%`);
//         }
//         const whereSql = whereParts.length
//             ? `WHERE ${whereParts.join(" AND ")}`
//             : "";

//         const [[{ total }]] = await pool.query(
//             `SELECT COUNT(*) AS total FROM nguoi_dung ${whereSql}`,
//             params
//         );

//         const [rows] = await pool.query(
//             `SELECT id, ho_ten, email, vai_tro, trang_thai
//         FROM nguoi_dung
//         ${whereSql}
//         ORDER BY id DESC
//         LIMIT ? OFFSET ?`,
//             [...params, pageSize, offset]
//         );

//         return res.json({
//             ok: true,
//             data: {
//                 items: rows,
//                 page,
//                 pageSize,
//                 total,
//                 totalPages: Math.max(1, Math.ceil(total / pageSize)),
//             },
//         });
//     } catch (e) {
//         console.error(e);
//         return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
//     }
// }
module.exports = {
    upload,
    uploadImage,
    me,
    updateMe,
    changePassword,
    createStaffUser,
    listUsersAdmin,
};
