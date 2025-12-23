const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middlewares/auth.js");
const { ensureAuth, requireRole } = require("../middlewares/authorize.js");

router.use(auth, ensureAuth, requireRole("nhan_vien", "customer", "admin"));

// Tạo đơn
router.post("/create", orderController.createOrder);

// Lấy lịch sử của user
// router.get("/user/:userId", orderController.getOrdersByUser);

// Lấy chi tiết
router.get("/user/:order_code", orderController.getOrderById);

router.get("/user/order/history-order", orderController.getHistoryOrders);

router.use(auth, ensureAuth, requireRole("admin"));
// Cập nhật trạng thái (admin)
router.put("/status/:order_code", orderController.updateOrderStatus);

router.get("/admin", orderController.getAllOrders);
// Quan lý đơn hàng (admin)
router.get("/admin/orders/:order_code", orderController.getOrderById);

module.exports = router;
