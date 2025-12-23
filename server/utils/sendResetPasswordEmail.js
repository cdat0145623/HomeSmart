const transporter = require("../utils/nodeMailer");

async function sendResetPasswordEmail(toEmail, resetLink) {
    const mailOptions = {
        from: `"NexaHome" <${process.env.MAIL_USER}>`,
        to: toEmail,
        subject: "Đặt lại mật khẩu tài khoản NexaHome",
        html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>Yêu cầu đặt lại mật khẩu</h2>

        <p>
          Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản sử dụng email:
          <b>${toEmail}</b>
        </p>

        <p>
          Nhấn vào nút bên dưới để đặt lại mật khẩu.
          Link này có hiệu lực trong <b>30 phút</b>.
        </p>

        <p style="text-align:center;margin:30px 0">
          <a
            href="${resetLink}"
            style="
              background:#f59e0b;
              color:#000;
              padding:12px 20px;
              border-radius:6px;
              text-decoration:none;
              font-weight:bold;
            "
          >
            Đặt lại mật khẩu
          </a>
        </p>

        <p>
          Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
        </p>

        <hr />
        <p style="font-size:12px;color:#666">
          NexaHome – Hệ thống nhà thông minh
        </p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendResetPasswordEmail;
