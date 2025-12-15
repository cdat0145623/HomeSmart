import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFiltered(data);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  //==============================
  // FILTER
  //==============================
  useEffect(() => {
    let result = [...orders];

    if (search.trim() !== "") {
      result = result.filter((o) =>
        o.order_code.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "") {
      result = result.filter((o) => o.status === statusFilter);
    }

    setFiltered(result);
  }, [search, statusFilter, orders]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Tìm mã đơn"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option>Chờ xử lý</option>
          <option>Đã xác nhận</option>
          <option>Đang giao</option>
          <option>Hoàn thành</option>
          <option>Hủy</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-4 text-left">Mã đơn</th>
            <th className="py-3 px-4 text-left">Khách hàng</th>
            <th className="py-3 px-4 text-left">Tổng tiền</th>
            <th className="py-3 px-4 text-left">Thanh toán</th>
            <th className="py-3 px-4 text-left">Ngày</th>
            <th className="py-3 px-4 text-left">Trạng thái</th>
            <th className="py-3 px-4 text-left">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{o.order_code}</td>
              <td className="py-3 px-4">{o.user_id || "Khách lẻ"}</td>
              <td className="py-3 px-4 font-semibold">
                {Number(o.total).toLocaleString()} đ
              </td>
              <td className="py-3 px-4">{o.payment_method}</td>
              <td className="py-3 px-4">
                {new Date(o.created_at).toLocaleString()}
              </td>
              <td className="py-3 px-4">{o.status}</td>

              <td className="py-3 px-4">
                <Link
                  to={`/admin/orders/${o.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-gray-500">Không có đơn nào</p>
      )}
    </div>
  );
}
