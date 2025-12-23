const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");

// PUBLIC ROUTES — không yêu cầu đăng nhập
router.get(
    "/category/:categoryName",
    productCtrl.getAllProducts,
    productCtrl.getProductsByCategories
);
router.get("/top-selling", productCtrl.getTopSellingProducts);
router.get("/:slug", productCtrl.getProductBySlug);
router.get("/:slug/related", productCtrl.getRelatedProducts);

module.exports = router;
