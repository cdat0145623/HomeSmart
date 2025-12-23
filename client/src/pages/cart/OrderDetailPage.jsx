import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import { DOMAIN, formatPrice, statusOrder } from "../../helper/helper";

export default function OrderDetailPage() {
    const { order_code } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch chi tiết đơn hàng
    useEffect(() => {
        try {
            const fetchOrder = async () => {
                console.log("order_code at ordertailpage:", order_code);
                setLoading(true);
                const orderDetail = await httpRequest.get(
                    `/api/orders/user/${order_code}`,
                    { withCredentials: true }
                );
                console.log(orderDetail?.data);
                if (orderDetail?.data?.orderInfo)
                    setData(orderDetail?.data?.orderInfo);
                setLoading(false);
            };
            fetchOrder();
        } catch (err) {
            console.log("ERROR AT orderdetailpage:", err);
        }
    }, [order_code]);

    if (loading) return <div className="p-10 text-center">Đang tải...</div>;

    const { order, items, addr, totalSubShipFee } = data;

    return (
        <div className="w-full bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">
                {/* Header */}
                {!order ? (
                    <div>Đơn hàng không tồn tại</div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Chi tiết đơn hàng
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Mã đơn: {order?.ma_don}
                            </p>
                        </div>

                        <div className="mb-8">
                            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {statusOrder[order.trang_thai]}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                Thông tin giao hàng
                            </h3>
                            <div className="text-gray-700 leading-7">
                                <p>
                                    <strong>Họ tên:</strong> {addr?.ho_ten}
                                </p>
                                <p>
                                    <strong>SĐT:</strong> {addr?.sdt}
                                </p>
                                <p>
                                    <strong>Email:</strong> {addr?.email}
                                </p>
                                <p>
                                    <strong>Địa chỉ:</strong> {addr?.dia_chi},{" "}
                                    {addr?.phuong_xa}, {addr?.quan_huyen},{" "}
                                    {addr?.tinh_thanh}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                Sản phẩm
                            </h3>

                            <div className="border rounded-xl overflow-hidden">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 border-b p-4 hover:bg-gray-50"
                                    >
                                        <img
                                            src={`${
                                                DOMAIN + item.anh_dai_dien
                                            }`}
                                            alt=""
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />

                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">
                                                {item.ten_san_pham}
                                            </p>
                                            <p className="text-gray-600">
                                                Số lượng: {item.so_luong}
                                            </p>
                                        </div>

                                        <div className="font-semibold text-gray-800">
                                            {formatPrice(
                                                item.tong_gia_tung_san_pham
                                            )}
                                            đ
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                Tổng cộng
                            </h3>

                            <div className="space-y-2 text-gray-700">
                                <p>
                                    Tổng sản phẩm:&nbsp;
                                    {totalSubShipFee.totalQuantity}
                                </p>
                                <p>
                                    Phí vận chuyển:&nbsp;
                                    {formatPrice(order.phi_ship)}đ
                                </p>
                                <p>Giảm giá: {formatPrice(order.giam_gia)} đ</p>

                                <p className="text-xl font-bold text-gray-900 mt-3">
                                    Thành tiền: {formatPrice(order.tong_tien)}đ
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-10">
                            <Link
                                to="/order/order-history"
                                className="px-5 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                ← Quay lại lịch sử đơn hàng
                            </Link>

                            <button
                                onClick={() => (window.location.href = "/cart")}
                                className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                            >
                                Mua lại đơn này
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
