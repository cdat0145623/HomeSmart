import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
    // nhận order id/code qua state hoặc url query
    // khi redirect: navigate('/order-success', { state: { order: data.order }})
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const order_code = queryParams.get("order-code");

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl text-center shadow-sm">
                <h2 className="text-3xl font-semibold mb-4">
                    Đặt hàng thành công!
                </h2>
                <p className="text-gray-700 mb-4">
                    Cảm ơn bạn đã đặt hàng. Mã đơn của bạn:
                </p>
                <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg font-mono text-lg mb-4">
                    {order_code ? `${order_code}` : "—"}
                </div>
                <div className="mt-6 space-x-4">
                    <Link
                        to={`/order/${order_code}`}
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg"
                    >
                        Xem chi tiết đơn
                    </Link>
                    <Link to="/" className="px-6 py-2 border rounded-lg">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}
