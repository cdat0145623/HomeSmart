require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { request } = require("http");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true })); 

const WEB_BASE = process.env.WEB_BASE_URL || "http://localhost:5173";
const ORIGINS = (process.env.CORS_ORIGINS || WEB_BASE)
.split(",")
.map((s) => s.trim());

// app.use(
// cors({
//     origin: (origin, cb) => {
//     if (!origin) return cb(null, true);
//     return cb(null, ORIGINS.includes(origin));
//     },
//     credentials: true,
// })
// );
app.use(
    cors({
        origin: "http://localhost:5173",   // frontend
        credentials: true
    })
);


if (process.env.TRUST_PROXY === "1") {
app.set("trust proxy", 1);
}

app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => {
res.json({ message: "NexaHome backend API đang hoạt động!" });
});
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productUserRoutes"));
app.use("/stats", require("./routes/productUserRoutes"));
app.use("/news", require("./routes/newsRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/admin/products", require("./routes/productRoutes"));
app.use("/admin/brands", require("./routes/brandRoutes"));
app.use("/admin/categories", require("./routes/categoryRoutes"));
app.use("/api/customers", require("./routes/customerRoutes")); // nếu có
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
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
app.use((err, _req, res, _next) => {
console.error(err);
const code = err.status || 500;
res.status(code).json({ ok: false, message: err.message || "Lỗi máy chủ" });
});

app.listen(PORT, () => {
console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
