require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || "websitenexahome",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true,
});

async function checkConnection() {
    try {
        // Thực hiện truy vấn kiểm tra kết nối đơn giản
        const [rows, fields] = await pool.query("SELECT 1");
        console.log("Kết nối cơ sở dữ liệu thành công!", rows);
    } catch (err) {
        // Nếu có lỗi, kết nối không thành công
        console.error("Lỗi kết nối cơ sở dữ liệu:", err);
    }
}

checkConnection();

module.exports = pool;
