const express = require("express");
const router = express.Router();

const newsCtrl = require("../controllers/newsController.js");

router.get("/", newsCtrl.listPosts);
router.get("/:slug", newsCtrl.getNewsBySlug);
// router.get("/latest/:slug", newsCtrl.listNEW);

module.exports = router;
