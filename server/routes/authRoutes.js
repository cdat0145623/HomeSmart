const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const pool = require("../config/db");

router.post("/register", authController.register);

router.get("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

router.post("/google", authController.googleLogin);

router.get("/me", auth, authController.me);

module.exports = router;
