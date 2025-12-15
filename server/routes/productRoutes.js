const express = require("express");
const router = express.Router();

const productCtrl = require("../controllers/productController");
const auth = require("../middlewares/auth");
const { ensureAuth, requireRole } = require("../middlewares/authorize");


// router.use(auth, ensureAuth, requireRole("admin", "nhan_vien"));

// router.get("/", productCtrl.listProducts);
// router.get("/:id", productCtrl.getProduct);

// router.post("/", productCtrl.uploadProductImage, productCtrl.createProduct);
// router.put("/:id", productCtrl.uploadProductImage, productCtrl.updateProduct);

/* ============================
    ADMIN ROUTES (CÓ AUTH)
=============================== */
router.use(auth, ensureAuth, requireRole("admin", "nhan_vien"));

router.get("/", productCtrl.listProducts);
// router.get("/:id", productCtrl.getProduct);
router.get("/id/:id", productCtrl.getProduct);


router.post("/", productCtrl.uploadProductImage, productCtrl.createProduct);
router.put("/:id", productCtrl.uploadProductImage, productCtrl.updateProduct);
router.delete("/:id", productCtrl.removeProduct);

module.exports = router;
