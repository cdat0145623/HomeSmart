import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import { DOMAIN, formatPrice } from "../../helper/helper";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
    const [shipping, setShipping] = useState("standard");
    const [payment, setPayment] = useState("COD");
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
    const { updatedCartCount } = useCart();
    useEffect(() => {
        try {
            const fetchCart = async () => {
                const cart = await httpRequest.get("/api/cart", {
                    withCredentials: true,
                });
                setItems(cart?.data?.data);
            };
            fetchCart();
        } catch (error) {
            console.log("Error at HEADER:", error);
        }
    }, []);

    // Tính tạm tính
    const subtotal = items.reduce(
        (sum, it) =>
            sum + Number(it.gia_khuyen_mai) * Number(it.total_quantity || 1),
        0
    );

    const shippingFee =
        shipping === "standard" ? 30000 : shipping === "fast" ? 60000 : 0;

    const grandTotal = Number(subtotal + shippingFee);

    // Hàm đặt hàng
    const handleCheckout = async () => {
        if (!form.fullname || !form.phone || !form.address_line) {
            alert("Vui lòng nhập đầy đủ thông tin giao hàng.");
            return;
        }
        console.log("items::", items);
        const body = {
            address: form,
            payment_method: payment,
            shipping_fee: Number(shippingFee),
            grandTotal: Number(grandTotal),
            discount: 0,
            note: form.note,
            items,
        };

        try {
            let query = "/api/orders/create";
            let res;
            if (payment === "VNPAY") {
                query = "/api/checkout/beginTransactionVnpay";
                const res = await httpRequest.post(`${query}`, body, {
                    withCredentials: true,
                });

                console.log("res payment vnpay:", res?.data);
                navigate(res?.data?.paymentUrl);
            } else if (payment === "COD") {
                res = await httpRequest.post(query, body, {
                    withCredentials: true,
                });
                console.log("payment with code client::::", res);
                if (res?.data?.ok) {
                    toast.success(`${res.data.message}`);
                    updatedCartCount(0);
                    navigate(
                        `/cart/checkout/order-success?order-code=${res?.data?.order?.order_code}`
                    );
                }
            } else if (payment === "MOMO") {
                query = "/api/checkout/createQRMoMo";
                res = await httpRequest.post(query, body, {
                    withCredentials: true,
                });
                console.log("res payment with MOMO:", res);
                navigate(res.data);
            }
        } catch (err) {
            console.error(err);
            toast.error("Lỗi: ", err);
        }
    };
    return (
        <div className="w-full bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Shipping Info */}
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">
                        Thông tin giao hàng
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="border p-3 rounded-lg"
                                placeholder="Họ và tên"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fullname: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="border p-3 rounded-lg"
                                placeholder="Số điện thoại"
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                            />
                        </div>

                        <input
                            className="border p-3 rounded-lg w-full"
                            placeholder="Email"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <input
                                className="border p-3 rounded-lg"
                                placeholder="Tỉnh/Thành"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        province: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="border p-3 rounded-lg"
                                placeholder="Quận/Huyện"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        district: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="border p-3 rounded-lg"
                                placeholder="Phường/Xã"
                                onChange={(e) =>
                                    setForm({ ...form, ward: e.target.value })
                                }
                            />
                        </div>

                        <input
                            className="border p-3 rounded-lg w-full"
                            placeholder="Địa chỉ"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    address_line: e.target.value,
                                })
                            }
                        />

                        <textarea
                            className="border p-3 rounded-lg w-full"
                            placeholder="Ghi chú"
                            rows={3}
                            onChange={(e) =>
                                setForm({ ...form, note: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">
                        Đơn hàng của bạn
                    </h2>

                    <div className="space-y-4">
                        {items.length === 0 ? (
                            <p className="text-gray-500">Giỏ hàng trống</p>
                        ) : (
                            items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center border-b pb-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={DOMAIN + item.anh_dai_dien}
                                            className="w-16 h-16 rounded-lg"
                                        />
                                        <div>
                                            <p className="font-semibold">
                                                {item.ten_san_pham}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                SỐ LƯỢNG: {item.total_quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">
                                        {formatPrice(
                                            item.gia_khuyen_mai *
                                                item.total_quantity
                                        )}
                                        &nbsp; đ
                                    </p>
                                </div>
                            ))
                        )}

                        {/* Summary */}
                        <div className="pt-4 text-gray-700">
                            <div className="flex justify-between">
                                <span>Tạm tính</span>
                                <span>{formatPrice(subtotal)} đ</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Vận chuyển</span>
                                <span>{formatPrice(shippingFee)} đ</span>
                            </div>

                            <div className="flex justify-between text-lg font-bold mt-2">
                                <span>Tổng cộng</span>
                                <span>{formatPrice(grandTotal)} đ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">
                        Phương thức vận chuyển
                    </h2>

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
                    <h2 className="text-xl font-semibold mb-4">
                        Phương thức thanh toán
                    </h2>

                    <div className="space-y-4">
                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={payment === "COD"}
                                onChange={() => setPayment("COD")}
                            />
                            Thanh toán khi nhận hàng (COD)
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={payment === "VNPAY"}
                                onChange={() => setPayment("VNPAY")}
                            />
                            VNPay (Thanh toán online)
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={payment === "MOMO"}
                                onChange={() => setPayment("MOMO")}
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
