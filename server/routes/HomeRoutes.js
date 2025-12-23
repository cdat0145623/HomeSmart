const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products/:categoryName", productController.getAllProducts);
router.post("/upload", productController.upload, productController.uploadImage);

module.exports = router;
