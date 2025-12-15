const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Tạo đơn
router.post("/create", orderController.createOrder);

// Lấy lịch sử của user
router.get("/user/:userId", orderController.getOrdersByUser);

// Lấy chi tiết
router.get("/:id", orderController.getOrderById);

// Cập nhật trạng thái (admin)
router.put("/:id/status", orderController.updateOrderStatus);

// Lấy chi tiết đơn hàng
router.get("/:id",orderController.getOrderById);

// Quan lý đơn hàng (admin)
router.get("/admin/orders", orderController.getAllOrders);
router.get("/admin/orders/:id", orderController.getOrderById);


module.exports = router;
