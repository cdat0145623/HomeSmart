    const express = require("express");
    const router = express.Router();

    const pool = require("../config/db");
    const auth = require("../middlewares/auth");
    const { ensureAuth, requireRole } = require("../middlewares/authorize");
    const brandCtl = require("../controllers/brandController");

    router.use(auth, ensureAuth, requireRole("admin", "nhan_vien"));

    router.get("/", async (req, res, next) => {
    try {
        const hasPaging = !!(req.query.page || req.query.pageSize || req.query.q);
        if (!hasPaging) {
        const [rows] = await pool.query(
            "SELECT id, ten_thuong_hieu FROM thuong_hieu ORDER BY ten_thuong_hieu ASC"
        );
        return res.json({ items: rows });
        }
        return brandCtl.listBrands(req, res);
    } catch (e) {
        next(e);
    }
    });

    router.get("/:id", brandCtl.getBrand);

    router.post("/", brandCtl.createBrand);

    router.put("/:id", brandCtl.updateBrand);

    router.delete("/:id", brandCtl.deleteBrand);

    module.exports = router;
