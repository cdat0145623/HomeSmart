const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController.js");
const auth = require("../middlewares/auth.js");
const { ensureAuth, requireRole } = require("../middlewares/authorize.js");

router.get("/:productId", reviewController.getReviews);

router.use(auth, ensureAuth, requireRole("admin", "nhan_vien", "customer"));
router.post("/create", reviewController.addReview);

module.exports = router;
