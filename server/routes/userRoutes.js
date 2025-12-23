const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userCtrl = require("../controllers/userController");

const { ensureAuth, requireRole } = require("../middlewares/authorize");

router.get("/me", auth, ensureAuth, userCtrl.me);
router.put(
    "/uploadAvatar/me",
    auth,
    ensureAuth,
    userCtrl.upload,
    userCtrl.updateMe,
    userCtrl.me
);
router.put("/me", auth, userCtrl.updateMe, userCtrl.me);
router.put("/me/password", auth, userCtrl.changePassword);

//Get all users
router.get(
    "/admin/users",
    auth,
    ensureAuth,
    requireRole("admin"),
    userCtrl.listUsersAdmin
);
// router.get("/admin/users", auth, ensureAuth, requireRole("admin"), userCtrl.adminListUsers);
router.post(
    "/admin/createNewUser",
    auth,
    ensureAuth,
    requireRole("admin"),
    userCtrl.createStaffUser
);

module.exports = router;
