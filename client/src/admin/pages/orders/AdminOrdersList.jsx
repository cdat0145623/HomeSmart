import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../../utils/httpRequest";
import { formatPrice, statusOrder } from "../../../helper/helper";

export default function AdminOrdersList() {
    const [orders, setOrders] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("");
    const [pagination, setPagination] = useState(null);
    const pageSize = 10;
    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            const orders = await httpRequest.get(
                `/api/orders/admin?page=${page}&pageSize=${pageSize}`,
                {
                    withCredentials: true,
                }
            );
            // console.log("fetchOrder dat:", orders?.data);

            setOrders(orders.data?.data);
            setPagination(orders.data.pagination);

            setLoading(false);
        };
        fetchOrder();
    }, [page]);

    //==============================
    // FILTER
    //==============================

    useEffect(() => {
        if (orders?.length === 0) return;
        let result = [...orders];

        if (search.trim() !== "") {
            result = result.filter((o) =>
                o.ma_don.toLowerCase().includes(search.toLowerCase())
            );
            console.log("reslut:::", result);
        }

        if (statusFilter !== "") {
            result = result.filter((o) => o.trang_thai === statusFilter);
            console.log("result from trang thai", result);
        }

        setFiltered(result);
    }, [search, statusFilter, orders]);

    if (loading) return <div>Loading...</div>;
    // console.log("pagination::", pagination);
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
                    <option value="cho_xu_ly">Chờ xử lý</option>
                    <option value="da_xac_nhan">Đã xác nhận</option>
                    <option value="dang_giao">Đang giao</option>
                    <option value="hoan_thanh">Hoàn thành</option>
                    <option value="huy">Hủy</option>
                </select>
            </div>

            {/* Table */}
            <table className="min-w-full bg-white shadow rounded">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm ">
                    <tr className="text-center">
                        <th className="py-3 px-4 text-center">STT</th>
                        <th className="py-3 px-4 text-center">Mã đơn</th>
                        <th className="py-3 px-4 text-center">Khách hàng</th>
                        <th className="py-3 px-4 text-center">Tổng tiền</th>
                        <th className="py-3 px-4 text-center">Thanh toán</th>
                        <th className="py-3 px-4 text-center">Ngày</th>
                        <th className="py-3 px-4 text-center">Trạng thái</th>
                        <th className="py-3 px-4 text-center">Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.map((o, index) => (
                        <tr key={o.id} className="border-b hover:bg-gray-50 ">
                            <td className="py-3 px-4 text-center">
                                {index + 1}
                            </td>
                            <td className="py-3 px-4 text-center">
                                {o.ma_don}
                            </td>
                            <td className="py-3 px-4 text-center">
                                {o.nguoi_dung_id || "Khách lẻ"}
                            </td>
                            <td className="py-3 px-4 font-semibold text-center">
                                {formatPrice(o.tong_tien)} đ
                            </td>
                            <td className="py-3 px-4 text-center">
                                {o.payment_method}
                            </td>
                            <td className="py-3 px-4 text-center">
                                {o.ngay_tao.split(" ")[0]}
                            </td>
                            <td className="py-3 px-4 text-center">
                                {statusOrder[o.trang_thai]}
                            </td>

                            <td className="py-3 px-4 text-center">
                                <Link
                                    to={`/admin/dashboard/orders/${o.ma_don}`}
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

            <div className="flex justify-end gap-2 mt-3">
                {Array.from(
                    {
                        length: Math.ceil(
                            pagination?.total / pagination?.pageSize
                        ),
                    },
                    (_, i) => i + 1
                ).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={
                            "px-3 py-1 rounded border " +
                            (p === page
                                ? "bg-orange-600 text-white border-orange-600"
                                : "bg-white hover:bg-slate-50")
                        }
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
}
