require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { request } = require("http");
const route = require("./routes/index");

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Địa chỉ client của bạn
//     res.setHeader("Access-Control-Allow-Credentials", "true"); // Cho phép thông tin xác thực
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS"
//     ); // Các phương thức HTTP được phép
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Content-Type, Authorization"
//     ); // Bao gồm Content-Type
//     next();
// });
const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => {
    res.json({ message: "NexaHome backend API đang hoạt động!" });
});

route(app);
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productUserRoutes"));
app.use("/stats", require("./routes/productUserRoutes"));
app.use("/users/news", require("./routes/newsUserRoutes"));
app.use("/admin/news", require("./routes/newsRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/admin/products", require("./routes/productRoutes"));
app.use("/admin/brands", require("./routes/brandRoutes"));
app.use("/admin/categories", require("./routes/categoryRoutes"));
app.use("/api/customers", require("./routes/customerRoutes")); // nếu có
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/checkout", require("./routes/checkoutRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));
app.get("/debug", (req, res) => {
    res.json({
        API_BASE: process.env.API_BASE_URL,
        WEB_BASE: process.env.WEB_BASE_URL,
        RUNNING_FROM: __dirname,
        NODE_ENV: process.env.NODE_ENV,
    });
});

app.use((req, res, _next) => {
    res.status(404).json({ ok: false, message: "Không tìm thấy endpoint" });
});
// app.use((err, _req, res, _next) => {
//     console.error(err);
//     const code = err.status || 500;
//     res.status(code).json({ ok: false, message: err.message || "Lỗi máy chủ" });
// });

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
