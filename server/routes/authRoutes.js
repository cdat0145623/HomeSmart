const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const pool = require("../config/db");


router.post("/register", authController.register);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
// router.get("/verify-email", async (req, res) => {
//     const token = req.query.token;

//     console.log("TOKEN USER GỬI LÊN:", token);

//     const [rows] = await pool.execute(
//         "SELECT * FROM nguoi_dung WHERE email_token=? LIMIT 1",
//         [token]
//     );

//     console.log("TOKEN TRONG DB:", rows[0]?.email_token);


// });


router.post("/google", authController.googleLogin);

router.get("/me", auth, authController.me);
router.post("/logout", auth, authController.logout);

module.exports = router;
