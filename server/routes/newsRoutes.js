const express = require("express");
const router = express.Router();

const newsCtrl = require("../controllers/newsController.js");
const auth = require("../middlewares/auth");
const { ensureAuth, requireRole } = require("../middlewares/authorize");


router.get("/", newsCtrl.listPosts);
router.get("/:slug", newsCtrl.getBySlug);

module.exports = router;
