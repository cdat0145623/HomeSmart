const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userCtrl = require("../controllers/userController");

const { ensureAuth, requireRole } = require("../middlewares/authorize");

router.get("/me", auth, userCtrl.me);
router.put("/me", auth, userCtrl.updateMe);
router.put("/me/password", auth, userCtrl.changePassword);

router.get("/admin/users", auth, ensureAuth, requireRole("admin"), userCtrl.listUsersAdmin);
router.get("/admin/users", auth, ensureAuth, requireRole("admin"), userCtrl.adminListUsers);
router.post("/admin/users", auth, ensureAuth, requireRole("admin"), userCtrl.createStaffUser);

module.exports = router;
