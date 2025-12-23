const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const checkoutController = require("../controllers/checkoutController.js");
const orderController = require("../controllers/orderController.js");
const { ensureAuth, requireRole } = require("../middlewares/authorize.js");

router.use(auth, ensureAuth, requireRole("admin", "nhan_vien", "customer"));

router.post(
    "/beginTransactionVnpay",
    orderController.createOrder,
    checkoutController.beginTransactionVnpay
);
router.get("/check-payment-vnpay", checkoutController.checkPaymentWithVNPay);
router.post(
    "/createQRMoMo",
    orderController.createOrder,
    checkoutController.createQrMoMo
);
router.get("/check-payment-momo", checkoutController.checkPaymentWithMoMo);

module.exports = router;
