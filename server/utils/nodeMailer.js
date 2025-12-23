const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter
    .verify()
    .then(() => console.log("SMTP ready"))
    .catch((err) => console.error("SMTP ERROR:", err.message));

module.exports = transporter;
