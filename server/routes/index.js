const homeRoutes = require("./HomeRoutes");

function route(app) {
    app.use("/api", homeRoutes);
    app.use((err, req, res, next) => {
        console.error("Error handler:", err.message || "Backend do not know");

        if (err.name === "MulterError") {
            return res.status(400).json({
                ok: false,
                message: err.message,
            });
        }
        return res.status(500).json({
            ok: false,
            message: err.message || "Internal Server Error",
        });
    });
}

module.exports = route;
