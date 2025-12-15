require("dotenv").config(); 
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

(async () => {
try {
    const [name, email, rawPassword] = process.argv.slice(2);

    if (!email || !rawPassword) {
    console.log('Cách dùng: node scripts/create-admin.js "Tên" "email" "MậtKhẩu"');
    process.exit(1);
    }

    const [dup] = await pool.query(
    "SELECT id FROM nguoi_dung WHERE email=? LIMIT 1",
    [email]
    );
    if (dup.length) {
    console.log("❌ Email đã tồn tại, dừng lại.");
    process.exit(1);
    }

    const hash = await bcrypt.hash(String(rawPassword), ROUNDS);

    const [r] = await pool.query(
    `INSERT INTO nguoi_dung
    (vai_tro, ho_ten, email, email_da_xac_minh, mat_khau_hash, trang_thai, ngay_tao, ngay_cap_nhat)
    VALUES ('admin', ?, ?, 1, ?, 'active', NOW(), NOW())`,
    [name || null, email, hash]
    );

    console.log("✅ Tạo admin thành công. ID =", r.insertId);
    process.exit(0);
} catch (e) {
    console.error(e);
    process.exit(2);
} finally {
    try { await pool.end?.(); } catch {}
}
})();
