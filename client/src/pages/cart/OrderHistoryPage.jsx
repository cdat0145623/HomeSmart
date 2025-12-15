import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Map trạng thái → màu
const statusColors = {
  "Chờ xử lý": "bg-yellow-100 text-yellow-600",
  "Đã xác nhận": "bg-indigo-100 text-indigo-600",
  "Đang giao": "bg-blue-100 text-blue-600",
  "Hoàn thành": "bg-green-100 text-green-600",
  Hủy: "bg-red-100 text-red-600",
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchCode, setSearchCode] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const userId = 1; // sau này thay bằng token

  // ======================================================
  // 1. Lấy lịch sử đơn hàng từ API
  // ======================================================
  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setOrders(sorted);
        setFiltered(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  // ======================================================
  // 2. Áp dụng bộ lọc
  // ======================================================
  useEffect(() => {
    let result = [...orders];

    if (searchCode.trim() !== "") {
      result = result.filter((o) =>
        o.order_code.toLowerCase().includes(searchCode.toLowerCase())
      );
    }

    if (statusFilter !== "") {
      result = result.filter((o) => o.status === statusFilter);
    }

    if (paymentFilter !== "") {
      result = result.filter((o) => o.payment_method === paymentFilter);
    }

    setFiltered(result);
  }, [searchCode, statusFilter, paymentFilter, orders]);

  // ======================================================
  // 3. Reset bộ lọc
  // ======================================================
  const resetFilters = () => {
    setSearchCode("");
    setStatusFilter("");
    setPaymentFilter("");
    setFiltered(orders);
  };

  // ======================================================
  // 4. Mua lại đơn hàng → thêm vào giỏ
  // ======================================================
  const handleReorder = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      const data = await res.json();

      if (!res.ok) {
        alert("Không thể tải đơn hàng");
        return;
      }

      const oldItems = data.items || [];
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

      oldItems.forEach((it) => {
        cart.push({
          id: it.product_id,
          product_id: it.product_id,
          name: it.product_name,
          image: it.product_image,
          price: Number(it.unit_price),
          quantity: Number(it.quantity),
        });
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Đã thêm sản phẩm vào giỏ hàng!");
      window.location.href = "/cart";
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server.");
    }
  };

  // ======================================================
  // 5. Xuất CSV
  // ======================================================
  const exportCSV = () => {
    if (filtered.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    const header = [
      "Mã đơn",
      "Ngày tạo",
      "Trạng thái",
      "Thanh toán",
      "Tổng tiền",
    ];

    const rows = filtered.map((o) => [
      o.order_code,
      new Date(o.created_at).toLocaleString(),
      o.status,
      o.payment_method,
      o.total,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [header.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `lich-su-don-hang.csv`;
    link.click();
  };

  // ======================================================
  // 6. Render giữ nguyên 100% UI cũ
  // ======================================================
  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Lịch sử đơn hàng
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            className="border rounded-lg px-4 py-2 text-gray-700 w-60"
            placeholder="Tìm theo mã đơn"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />

          <select
            className="border rounded-lg px-4 py-2 text-gray-700"
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

          <select
            className="border rounded-lg px-4 py-2 text-gray-700"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">Phương thức thanh toán</option>
            <option value="COD">COD</option>
            <option value="VNPAY">VNPAY</option>
            <option value="MoMo">MoMo</option>
          </select>

          <button
            className="border px-4 py-2 rounded-lg text-gray-600"
            onClick={resetFilters}
          >
            Làm mới
          </button>

          <button
            onClick={exportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Xuất CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full rounded-xl overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Mã đơn</th>
                <th className="py-3 px-4 text-left">Ngày</th>
                <th className="py-3 px-4 text-left">Trạng thái</th>
                <th className="py-3 px-4 text-left">Thanh toán</th>
                <th className="py-3 px-4 text-left">Tổng tiền</th>
                <th className="py-3 px-4 text-left">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {order.order_code}
                    <Link
                      to={`/order/${order.id}`}
                      className="ml-3 text-sm text-blue-600 cursor-pointer hover:underline"
                    >
                      Chi tiết
                    </Link>
                  </td>

                  <td className="py-3 px-4 text-gray-600">
                    {new Date(order.created_at).toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[order.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {order.payment_method}
                  </td>

                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {Number(order.total).toLocaleString()} đ
                  </td>

                  <td className="py-3 px-4">
                    <span
                      onClick={() => handleReorder(order.id)}
                      className="text-yellow-600 font-medium cursor-pointer mr-3 hover:underline"
                    >
                      Mua lại
                    </span>

                    <span className="text-gray-800 font-medium cursor-pointer hover:underline">
                      Hoá đơn
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        <div className="flex justify-between items-center mt-6 text-gray-700">
          <p>{filtered.length} đơn • Trang 1/1</p>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Trước
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
