    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    const crypto = require("crypto");
    const pool = require("../config/db");
    const { sendVerifyEmail } = require("../utils/mailer");
    const { OAuth2Client } = require("google-auth-library");

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
    const JWT_EXPIRES = "7d";

    const API_BASE = process.env.API_BASE_URL || "http://localhost:5000";
    const WEB_BASE = process.env.WEB_BASE_URL || "http://localhost:5173";
    const REQUIRE_G_VERIFY = String(process.env.REQUIRE_EMAIL_VERIFY_FOR_GOOGLE || "false") === "true";
    function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    }
    // async function createUniqueEmailToken() {
    // for (let i = 0; i < 5; i++) {
    //     const t = crypto.randomBytes(32).toString("hex");
    //     const [r] = await pool.query("SELECT id FROM nguoi_dung WHERE email_token=? LIMIT 1", [t]);
    //     if (!r.length) return t;
    // }
    // throw new Error("Không thể tạo token email duy nhất");
    // }

    //  ĐĂNG KÝ
  async function createUniqueEmailToken() {
    for (let i = 0; i < 5; i++) {
        const t = crypto.randomBytes(32).toString("hex").toLowerCase().trim();

        // Kiểm tra database xem có trùng token hay không
        const [r] = await pool.query(
            "SELECT id FROM nguoi_dung WHERE email_token = ? LIMIT 1",
            [t]
        );

        if (!r.length) return t;
    }

    throw new Error("Không thể tạo token email duy nhất");
}
    // async function register(req, res) {
    // try {
    //     const { fullName, email, password } = req.body;
    //     if (!fullName || !email || !password)
    //     return res.status(400).json({ ok: false, message: "Thiếu dữ liệu" });
    //     if (password.length < 6)
    //     return res.status(400).json({ ok: false, message: "Mật khẩu tối thiểu 6 ký tự" });

    //     const [dup] = await pool.query("SELECT id FROM nguoi_dung WHERE email=? LIMIT 1", [email]);
    //     if (dup.length) return res.status(409).json({ ok: false, message: "Email đã tồn tại" });

    //     const hash = await bcrypt.hash(password, 10);
    //     const token = await createUniqueEmailToken();
    //     console.log("TOKEN TẠO:", token);
    //     const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    //     await pool.query(
    //     `INSERT INTO nguoi_dung
    //     (vai_tro, ho_ten, email, mat_khau_hash, trang_thai, email_da_xac_minh,
    //         email_token, email_token_het_han, email_xac_minh_luc)
    //     VALUES ('customer', ?, ?, ?, 'pending', 0, ?, ?, NULL)`,
    //     [fullName, email, hash, token, expires]
    //     );

    //        try {
    //         const [checkRows] = await pool.query(
    //             "SELECT email_token FROM nguoi_dung WHERE email = ? LIMIT 1",
    //             [email]
    //         );
    //         if (checkRows && checkRows.length) {
    //             console.log("TOKEN LƯU DB:", checkRows[0].email_token);
    //         } else {
    //             console.log("TOKEN LƯU DB: Không tìm thấy user sau khi INSERT");
    //         }
    //     } catch (e) {
    //         console.error("Lỗi khi kiểm tra token trong DB:", e);
    //     }

    //     const verifyUrl = `${API_BASE}/auth/verify-email?token=${token}`;
    //     await sendVerifyEmail(email, verifyUrl);
    //         const [check] = await pool.query(
    //         "SELECT email_token FROM nguoi_dung WHERE email=? LIMIT 1",
    //         [email]
    //     );
    //     console.log("TOKEN THẬT TRONG DB:", check[0].email_token);
    //     console.log("TOKEN GỬI EMAIL:", token);
    //     return res.status(201).json({
    //     ok: true,
    //     message: "Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.",
    //     });
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    // }
    // }

    //XÁC MINH EMAIL 
   async function register(req, res) {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password)
            return res.status(400).json({ ok: false, message: "Thiếu dữ liệu" });

        if (password.length < 6)
            return res.status(400).json({ ok: false, message: "Mật khẩu tối thiểu 6 ký tự" });

        const [dup] = await pool.query(
            "SELECT id FROM nguoi_dung WHERE email=? LIMIT 1",
            [email]
        );
        if (dup.length)
            return res.status(409).json({ ok: false, message: "Email đã tồn tại" });

        const hash = await bcrypt.hash(password, 10);
        const token = await createUniqueEmailToken();
        const expires = new Date(Date.now() + 86400000);

        // Lưu vào DB
        await pool.query(
            `INSERT INTO nguoi_dung
            (vai_tro, ho_ten, email, mat_khau_hash, trang_thai, email_da_xac_minh,
             email_token, email_token_het_han, email_xac_minh_luc)
            VALUES ('customer', ?, ?, ?, 'pending', 0, ?, ?, NULL)`,
            [fullName, email, hash, token, expires]
        );

        // LẤY TOKEN LƯU TRÊN DB – kiểm tra chính xác
        const [[dbUser]] = await pool.query(
            "SELECT email_token FROM nguoi_dung WHERE email=? LIMIT 1",
            [email]
        );

        console.log("––––––––––––––––––");
        console.log("TOKEN TẠO:", token);
        console.log("TOKEN TRONG DB:", dbUser.email_token);
        console.log("MATCH:", token === dbUser.email_token);
        console.log("––––––––––––––––––");

        // Link xác minh
        const verifyUrl = `${API_BASE}/auth/verify-email?token=${dbUser.email_token}`;
        console.log("VERIFY URL:", verifyUrl);

        // Gửi email
        await sendVerifyEmail(email, verifyUrl);

        return res.status(201).json({
            ok: true,
            message: "Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản."
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
}

   async function verifyEmail(req, res) {
    try {
        const { token } = req.query;
        if (!token) return res.status(400).json({ ok: false, message: "Thiếu token" });

        const [rows] = await pool.query(
            `SELECT id, email_token_het_han, email_xac_minh_luc, email_da_xac_minh
             FROM nguoi_dung
             WHERE email_token=? LIMIT 1`,
            [token]
        );

        if (!rows.length) {
            console.log("❌ TOKEN VERIFY KHÔNG TÌM THẤY:", token);
            return res.status(400).json({ ok: false, message: "Token không hợp lệ" });
        }

        const userRow = rows[0];

        // Kiểm tra hết hạn
        if (userRow.email_token_het_han && new Date(userRow.email_token_het_han).getTime() < Date.now()) {
            return res.status(400).json({ ok: false, message: "Token đã hết hạn" });
        }

        // Kiểm tra đã dùng chưa
        if (userRow.email_xac_minh_luc || userRow.email_da_xac_minh) {
            return res.status(400).json({ ok: false, message: "Token đã sử dụng" });
        }

        // Update
        await pool.query(
            `UPDATE nguoi_dung
             SET email_da_xac_minh=1,
                 trang_thai='active',
                 email_xac_minh_luc=NOW(),
                 email_token=NULL,
                 email_token_het_han=NULL
             WHERE id=?`,
            [userRow.id]
        );

        const redirectTo = `${WEB_BASE}/dang-nhap?verified=1`;
        return res.redirect(302, redirectTo);

    } catch (err) {
        console.error("Lỗi verify:", err);
        return res.status(500).json({ ok: false, message: "Lỗi máy chủ" });
    }
}

    //ĐĂNG NHẬP
    async function login(req, res) {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query("SELECT * FROM nguoi_dung WHERE email=? LIMIT 1", [email]);
        if (!rows.length)
        return res.status(400).json({ ok: false, message: "Sai email hoặc mật khẩu" });

        const user = rows[0];

        if (!user.email_da_xac_minh || user.trang_thai !== "active") {
        return res.status(403).json({ ok: false, message: "Tài khoản chưa xác minh email" });
        }
        if (!user.mat_khau_hash) {
        return res
            .status(400)
            .json({ ok: false, message: "Tài khoản này không có mật khẩu (Google-only)" });
        }

        const ok = await bcrypt.compare(password, user.mat_khau_hash);
        if (!ok) return res.status(400).json({ ok: false, message: "Sai email hoặc mật khẩu" });

        await pool.query("UPDATE nguoi_dung SET lan_dang_nhap_cuoi=NOW() WHERE id=?", [user.id]);

        const token = signToken({ id: user.id, email: user.email, vai_tro: user.vai_tro });
        res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            ok: true, message: "Đăng nhập thành công", data: { token, user: { id: user.id, email: user.email, ho_ten: user.ho_ten, vai_tro: user.vai_tro } }, 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: err.message });
    }
    }

    //  ME 
    async function me(req, res) {
    if (!req.user) return res.status(401).json({ ok: false, message: "Chưa đăng nhập" });
    const [rows] = await pool.query(
        `SELECT id, ho_ten, email, vai_tro, trang_thai, email_da_xac_minh, google_avatar_url
        FROM nguoi_dung WHERE id=? LIMIT 1`,
        [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ ok: false, message: "Không tìm thấy người dùng" });
    return res.json({ ok: true, data: { user: rows[0] } });
    }

    // LOGOUT
    async function logout(_req, res) {
    res.clearCookie("token");
    return res.json({ ok: true, message: "Đã đăng xuất" });
    }

    // GOOGLE LOGIN 
    async function googleLogin(req, res) {
        try {
            const { credential } = req.body;
            const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            const email = payload.email;
            const sub = payload.sub;
            const name = payload.name || "";
            const picture = payload.picture || "";

            let [rows] = await pool.query("SELECT * FROM nguoi_dung WHERE google_sub=? LIMIT 1", [sub]);
            let user = rows[0];

            if (!user) {
            [rows] = await pool.query("SELECT * FROM nguoi_dung WHERE email=? LIMIT 1", [email]);
            user = rows[0];
            if (user) {
                await pool.query(
                `UPDATE nguoi_dung
                SET google_sub=?, google_avatar_url=?
                WHERE id=?`,
                [sub, picture, user.id]
                );
            }
            }

            if (!user) {
            if (REQUIRE_G_VERIFY) {
                const token = await createUniqueEmailToken();
                const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                const [r] = await pool.query(
                `INSERT INTO nguoi_dung
                (vai_tro, ho_ten, email, mat_khau_hash, trang_thai, email_da_xac_minh,
                    google_sub, google_avatar_url, email_token, email_token_het_han, email_xac_minh_luc)
                VALUES ('customer', ?, ?, NULL, 'pending', 0, ?, ?, ?, ?, NULL)`,
                [name, email, sub, picture, token, expires]
                );
                const verifyUrl = `${API_BASE}/auth/verify-email?token=${token}`;
                await sendVerifyEmail(email, verifyUrl);
                return res.status(202).json({
                ok: true,
                message: "Đăng ký bằng Google thành công. Vui lòng kiểm tra email để xác minh trước khi đăng nhập.",
                });
            } else {
                const [r] = await pool.query(
                `INSERT INTO nguoi_dung
                (vai_tro, ho_ten, email, mat_khau_hash, trang_thai, email_da_xac_minh,
                    google_sub, google_avatar_url, email_xac_minh_luc)
                VALUES ('customer', ?, ?, NULL, 'active', 1, ?, ?, NOW())`,
                [name, email, sub, picture]
                );
                user = { id: r.insertId, email, ho_ten: name };
            }
            }

            if (REQUIRE_G_VERIFY) {
            if (!user.email_da_xac_minh || user.trang_thai !== "active") {
                const token = await createUniqueEmailToken();
                const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                await pool.query(
                `UPDATE nguoi_dung
                SET email_token=?, email_token_het_han=?, trang_thai='pending'
                WHERE id=?`,
                [token, expires, user.id]
                );
                const verifyUrl = `${API_BASE}/auth/verify-email?token=${token}`;
                await sendVerifyEmail(email, verifyUrl);
                return res.status(202).json({
                ok: true,
                message: "Tài khoản Google cần xác minh email. Vui lòng kiểm tra hộp thư để hoàn tất.",
                });
            }
            } else {
            if (!user.email_da_xac_minh || user.trang_thai !== "active") {
                await pool.query(
                `UPDATE nguoi_dung
                SET email_da_xac_minh=1, trang_thai='active',
                    email_token=NULL, email_token_het_han=NULL,
                    email_xac_minh_luc=COALESCE(email_xac_minh_luc, NOW())
                WHERE id=?`,
                [user.id]
                );
            }
            }

            const tokenJwt = signToken({ id: user.id, email: user.email, vai_tro: user.vai_tro });
            res.cookie("token", tokenJwt, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            if (!user.vai_tro) user.vai_tro = 'customer'; 
            return res.json({ 
            ok: true, 
            message: "Đăng nhập Google thành công", 
            data: { 
            token: tokenJwt, 
            user: { id: user.id, email: user.email, ho_ten: user.ho_ten, vai_tro: user.vai_tro } 
            } 
            });
        } catch (err) {
            console.error(err);
            return res.status(401).json({ ok: false, message: "Xác thực Google thất bại" });
        }
    }

    module.exports = {
    register,
    verifyEmail,
    login,
    googleLogin,
    me,
    logout,
    };
