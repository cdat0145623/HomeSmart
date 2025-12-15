import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const navigate = useNavigate();


  // Thông tin giao hàng
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    address_line: "",
    note: "",
  });

  // Giỏ hàng
  const [items, setItems] = useState([]);

  // Lấy giỏ hàng từ localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);
  }, []);

  // Tính tạm tính
  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.price || it.unit_price || 0) * Number(it.quantity || 1),
    0
  );

  const shippingFee =
    shipping === "standard" ? 30000 :
    shipping === "fast" ? 60000 : 0;

  const grandTotal = subtotal + shippingFee;

  // Hàm đặt hàng
  const handleCheckout = async () => {
    if (!form.fullname || !form.phone || !form.address_line) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }

    const payload = {
      user_id: null, // hoặc lấy từ JWT nếu bạn có auth
      payment_method: payment,
      shipping_fee: shippingFee,
      discount: 0,
      note: form.note,
      items: items.map((item) => ({
        product_id: item.id || item.product_id || null,
        product_name: item.name,
        product_image: item.image,
        unit_price: Number(item.price || item.unit_price),
        quantity: Number(item.quantity),
      })),
      address: form,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Tạo đơn thất bại: " + (data.message || ""));
        return;
      }

      // Xóa giỏ hàng
      localStorage.removeItem("cart");

      alert("Đặt hàng thành công! Mã đơn: " + data.order.order_code);

      // Điều hướng sang trang đặt hàng thành công
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    }
  };

  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left: Shipping Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Thông tin giao hàng</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-3 rounded-lg"
                placeholder="Họ và tên"
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              />
              <input
                className="border p-3 rounded-lg"
                placeholder="Số điện thoại"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <input
              className="border p-3 rounded-lg w-full"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                className="border p-3 rounded-lg"
                placeholder="Tỉnh/Thành"
                onChange={(e) => setForm({ ...form, province: e.target.value })}
              />
              <input
                className="border p-3 rounded-lg"
                placeholder="Quận/Huyện"
                onChange={(e) => setForm({ ...form, district: e.target.value })}
              />
              <input
                className="border p-3 rounded-lg"
                placeholder="Phường/Xã"
                onChange={(e) => setForm({ ...form, ward: e.target.value })}
              />
            </div>

            <input
              className="border p-3 rounded-lg w-full"
              placeholder="Địa chỉ"
              onChange={(e) => setForm({ ...form, address_line: e.target.value })}
            />

            <textarea
              className="border p-3 rounded-lg w-full"
              placeholder="Ghi chú"
              rows={3}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Đơn hàng của bạn</h2>

          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-500">Giỏ hàng trống</p>
            ) : (
              items.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      className="w-16 h-16 rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500 text-sm">SL: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </p>
                </div>
              ))
            )}

            {/* Summary */}
            <div className="pt-4 text-gray-700">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString()} đ</span>
              </div>

              <div className="flex justify-between">
                <span>Vận chuyển</span>
                <span>{shippingFee.toLocaleString()} đ</span>
              </div>

              <div className="flex justify-between text-lg font-bold mt-2">
                <span>Tổng cộng</span>
                <span>{grandTotal.toLocaleString()} đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Phương thức vận chuyển</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={shipping === "standard"}
                onChange={() => setShipping("standard")}
              />
              Tiêu chuẩn (30.000đ)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={shipping === "fast"}
                onChange={() => setShipping("fast")}
              />
              Nhanh (60.000đ)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={shipping === "store"}
                onChange={() => setShipping("store")}
              />
              Nhận tại cửa hàng (Miễn phí)
            </label>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Thanh toán khi nhận hàng (COD)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={payment === "vnpay"}
                onChange={() => setPayment("vnpay")}
              />
              VNPay (Thanh toán online)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={payment === "momo"}
                onChange={() => setPayment("momo")}
              />
              MoMo (Quét mã)
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-2 bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between mt-4">
            <a
              href="/cart"
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              ← Quay lại giỏ hàng
            </a>

            <button
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              onClick={handleCheckout}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
