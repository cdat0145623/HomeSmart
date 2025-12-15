const express = require("express");
const router = express.Router();
const auth = require("./../middlewares/auth.js");
const cartController = require("../controllers/cartController");

router.post("/add", auth, cartController.addToCart);
router.get("/", auth, cartController.getCart);
router.delete("/:id", auth, cartController.removeItem);
router.post("/buy-now", auth, cartController.buyNow);

module.exports = router;
