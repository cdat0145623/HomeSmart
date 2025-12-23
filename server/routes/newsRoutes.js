const express = require("express");
const router = express.Router();

const newsCtrl = require("../controllers/newsController.js");
const auth = require("../middlewares/auth");
const { ensureAuth, requireRole } = require("../middlewares/authorize");

// router.get("/", newsCtrl.listPosts);
// router.get("/:slug", newsCtrl.getBySlug);

router.use(auth, ensureAuth, requireRole("admin", "nhan_vien"));
router.get("/", newsCtrl.listNews);
router.get("/:id", newsCtrl.getNewsById);
router.post("/", newsCtrl.uploadNewsImage, newsCtrl.createNews);
router.put("/:id", newsCtrl.uploadNewsImage, newsCtrl.updateNews);
router.delete("/:id", newsCtrl.removeNews);

module.exports = router;
