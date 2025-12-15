import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch chi tiết đơn hàng
  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;
  if (!data) return <div className="p-10 text-center">Không tìm thấy đơn hàng</div>;

  const { order, items, address } = data;

  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Chi tiết đơn hàng</h2>
          <p className="text-gray-600 mt-1">Mã đơn: {order.order_code}</p>
        </div>

        {/* Status */}
        <div className="mb-8">
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {order.status}
          </span>
        </div>

        {/* Shipping Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin giao hàng</h3>
          <div className="text-gray-700 leading-7">
            <p><strong>Họ tên:</strong> {address.fullname}</p>
            <p><strong>SĐT:</strong> {address.phone}</p>
            <p><strong>Email:</strong> {address.email}</p>
            <p>
              <strong>Địa chỉ:</strong> {address.address_line}, {address.ward}, {address.district}, {address.province}
            </p>
          </div>
        </div>

        {/* Item list */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Sản phẩm</h3>

          <div className="border rounded-xl overflow-hidden">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-4 border-b p-4 hover:bg-gray-50"
              >
                <img
                  src={it.product_image}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{it.product_name}</p>
                  <p className="text-gray-600">Số lượng: {it.quantity}</p>
                </div>

                <div className="font-semibold text-gray-800">
                  {Number(it.total_price).toLocaleString()} đ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Tổng cộng</h3>

          <div className="space-y-2 text-gray-700">
            <p>Tổng sản phẩm: {Number(order.total).toLocaleString()} đ</p>
            <p>Phí vận chuyển: {Number(order.shipping_fee).toLocaleString()} đ</p>
            <p>Giảm giá: {Number(order.discount).toLocaleString()} đ</p>

            <p className="text-xl font-bold text-gray-900 mt-3">
              Thành tiền:{" "}
              {(Number(order.total) + Number(order.shipping_fee) - Number(order.discount)).toLocaleString()} đ
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-10">

          <Link
            to="/order-history"
            className="px-5 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Quay lại lịch sử đơn hàng
          </Link>

          <button
            onClick={() => window.location.href = "/cart"}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
          >
            Mua lại đơn này
          </button>
        </div>

      </div>
    </div>
  );
}
