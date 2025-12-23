const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middlewares/auth.js");
const { ensureAuth, requireRole } = require("../middlewares/authorize.js");

router.use(auth, ensureAuth, requireRole("admin", "nhan_vien", "customer"));
router.get("/", cartController.getCart);
router.put("/updated", cartController.updateCart);
router.post("/add", cartController.addToCart);
router.delete("/:id", cartController.removeItem);
router.post("/buy-now", cartController.buyNow);

module.exports = router;
