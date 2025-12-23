const transporter = require("../utils/nodeMailer");

async function sendVerifyEmail(to, verifyUrl) {
    console.log("to:", to);
    console.log("verify url:", verifyUrl);
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
    console.log("info smpt:", info.messageId);
    return info.messageId;
}

module.exports = { sendVerifyEmail };
