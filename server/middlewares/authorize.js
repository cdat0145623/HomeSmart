exports.ensureAuth = (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ ok: false, message: "Chưa đăng nhập" });
    next();
};

exports.requireRole =
    (...roles) =>
    (req, res, next) => {
        if (!req.user)
            return res
                .status(401)
                .json({ ok: false, message: "Chưa đăng nhập" });
        if (!roles.includes(req.user.vai_tro)) {
            return res
                .status(403)
                .json({ ok: false, message: "Không đủ quyền" });
        }
        next();
    };
