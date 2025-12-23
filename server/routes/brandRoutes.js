const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const auth = require("../middlewares/auth");
const { ensureAuth, requireRole } = require("../middlewares/authorize");
const brandCtl = require("../controllers/brandController");

router.use(auth, ensureAuth, requireRole("admin", "nhan_vien"));

router.get("/", brandCtl.getAllBrands, brandCtl.listBrands);

router.get("/:id", brandCtl.getBrand);

router.post("/", brandCtl.createBrand);

router.put("/:id", brandCtl.updateBrand);

router.delete("/:id", brandCtl.deleteBrand);

module.exports = router;
