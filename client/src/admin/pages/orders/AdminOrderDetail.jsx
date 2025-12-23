import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import httpRequest from "../../../utils/httpRequest";
import { formatPrice } from "../../../helper/helper";
import { toast } from "react-toastify";

export default function AdminOrderDetail() {
    const { order_code } = useParams();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [addr, setAddr] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch order detail
    useEffect(() => {
        console.log("order_code", order_code);
        const fetchOrder = async () => {
            setLoading(true);
            const orders = await httpRequest.get(
                `/api/orders/admin/orders/${order_code}`,
                {
                    withCredentials: true,
                }
            );
            console.log("fetchOrder dat:", orders?.data);
            setOrder(orders.data?.orderInfo?.order);
            setItems(orders.data?.orderInfo?.items);
            setAddr(orders?.data?.orderInfo?.addr);
            setNewStatus(orders.data?.orderInfo?.order?.trang_thai);
            setLoading(false);
        };
        fetchOrder();
    }, [order_code]);

    // Update order status (Admin)
    const updateStatus = async () => {
        try {
            console.log("status::", newStatus);
            const body = {
                status: newStatus,
            };
            const res = await httpRequest.put(
                `/api/orders/status/${order_code}`,
                body,
                {
                    withCredentials: true,
                }
            );
            console.log("res udpdate Status::", res);
            if (res.data?.ok) {
                toast.success(res.data?.message);
                navigate("/admin/dashboard/orders");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi server");
        }
    };

    if (loading) return <p className="p-6">Đang tải...</p>;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    Chi tiết đơn hàng: {order?.ma_don}
                </h1>

                <Link
                    to="/admin/dashboard/orders"
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    ← Quay lại
                </Link>
            </div>

            {/* Order Info */}
            <div className="bg-white p-6 rounded shadow mb-6">
                <h3 className="text-xl font-semibold mb-3">
                    Thông tin đơn hàng
                </h3>

                <p>
                    <b>ID đơn:</b> {order?.id}
                </p>
                <p>
                    <b>Ngày tạo:</b>{" "}
                    {new Date(order?.ngay_tao).toLocaleString()}
                </p>
                <p>
                    <b>Thanh toán:</b> {order?.payment_method}
                </p>
                <p>
                    <b>Tổng tiền:</b> {formatPrice(order?.tong_tien)} đ
                </p>

                <div className="mt-4">
                    <label className="font-semibold">Trạng thái:</label>
                    <select
                        className="border px-3 py-2 rounded ml-3"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="cho_xu_ly">Chờ xử lý</option>
                        <option value="da_xac_nhan">Đã xác nhận</option>
                        <option value="dang_giao">Đang giao</option>
                        <option value="hoan_thanh">Hoàn thành</option>
                        <option value="huy">Hủy</option>
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
                <h3 className="text-xl font-semibold mb-3">
                    Thông tin khách hàng
                </h3>

                <p>
                    <b>Họ tên:</b> {addr?.ho_ten}
                </p>
                <p>
                    <b>SĐT:</b> {addr?.sdt}
                </p>
                <p>
                    <b>Email:</b> {addr?.email}
                </p>
                <p>
                    <b>Địa chỉ:</b> {addr?.dia_chi}, {addr?.phuong_xa},{" "}
                    {addr?.quan_huyen}, {addr?.tinh_thanh}
                </p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-semibold mb-3">
                    Sản phẩm trong đơn
                </h3>

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
                                <td className="py-3 px-4">
                                    {it?.ten_san_pham}
                                </td>
                                <td className="py-3 px-4">
                                    {formatPrice(it?.gia_khuyen_mai)} đ
                                </td>
                                <td className="py-3 px-4">{it?.so_luong}</td>
                                <td className="py-3 px-4 font-semibold">
                                    {formatPrice(it.tong_gia_tung_san_pham)} đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
