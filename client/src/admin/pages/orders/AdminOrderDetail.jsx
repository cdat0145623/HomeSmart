import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [addr, setAddr] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Fetch order detail
  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.order);
        setItems(data.items);
        setAddr(data.address);
        setNewStatus(data.order.status);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Update order status (Admin)
  const updateStatus = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Lỗi cập nhật trạng thái");
        return;
      }

      alert("Cập nhật trạng thái thành công!");
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Lỗi server");
    }
  };

  if (!order) return <p className="p-6">Đang tải...</p>;

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Chi tiết đơn hàng: {order.order_code}
        </h1>

        <Link
          to="/admin/orders"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ← Quay lại
        </Link>
      </div>

      {/* Order Info */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Thông tin đơn hàng</h3>

        <p><b>ID đơn:</b> {order.id}</p>
        <p><b>Ngày tạo:</b> {new Date(order.created_at).toLocaleString()}</p>
        <p><b>Thanh toán:</b> {order.payment_method}</p>
        <p><b>Tổng tiền:</b> {Number(order.total).toLocaleString()} đ</p>

        <div className="mt-4">
          <label className="font-semibold">Trạng thái:</label>
          <select
            className="border px-3 py-2 rounded ml-3"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option>Chờ xử lý</option>
            <option>Đã xác nhận</option>
            <option>Đang giao</option>
            <option>Hoàn thành</option>
            <option>Hủy</option>
          </select>

          <button
            onClick={updateStatus}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cập nhật
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Thông tin khách hàng</h3>

        <p><b>Họ tên:</b> {addr?.fullname}</p>
        <p><b>SĐT:</b> {addr?.phone}</p>
        <p><b>Email:</b> {addr?.email}</p>
        <p>
          <b>Địa chỉ:</b> {addr?.address_line}, {addr?.ward}, {addr?.district}, {addr?.province}
        </p>
      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Sản phẩm trong đơn</h3>

        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Sản phẩm</th>
              <th className="py-3 px-4 text-left">Giá</th>
              <th className="py-3 px-4 text-left">SL</th>
              <th className="py-3 px-4 text-left">Tổng</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-b">
                <td className="py-3 px-4">{it.product_name}</td>
                <td className="py-3 px-4">{Number(it.unit_price).toLocaleString()} đ</td>
                <td className="py-3 px-4">{it.quantity}</td>
                <td className="py-3 px-4 font-semibold">
                  {Number(it.total_price).toLocaleString()} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
