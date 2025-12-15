const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");
const auth = require("../middlewares/auth");
const { ensureAuth, requireRole } = require("../middlewares/authorize");

// PUBLIC ROUTES — không yêu cầu đăng nhập
router.get("/top-selling", productCtrl.getTopSellingProducts);
router.get("/slug/:slug", productCtrl.getProductBySlug);
router.get("/slug/:slug/related", productCtrl.getRelatedProducts);

module.exports = router;
