const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: Number(process.env.SMTP_PORT || 587),
secure: String(process.env.SMTP_SECURE || "false") === "true",
auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
},
});
transporter.verify()
  .then(() => console.log("SMTP ready"))
  .catch(e => console.error("SMTP ERROR:", e.message));

async function sendVerifyEmail(to, verifyUrl) {
const info = await transporter.sendMail({
    from: `"NexaHome" <${process.env.SMTP_USER}>`,
    to,
    subject: "Xác minh email NexaHome",
    html: `
    <div style="font-family:Segoe UI,Arial">
        <h2>Chào bạn,</h2>
        <p>Nhấn nút bên dưới để xác minh email và kích hoạt tài khoản NexaHome.</p>
        <p><a href="${verifyUrl}" style="background:#2563eb;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Xác minh tài khoản</a></p>
        <p>Nếu nút không bấm được, copy link sau vào trình duyệt:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <hr/>
        <small>Liên kết có hiệu lực 24 giờ.</small>
    </div>
    `,
});
return info.messageId;
}

module.exports = { sendVerifyEmail };
