import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import { DOMAIN, formatPrice } from "../../helper/helper";
import { toast } from "react-toastify";
import "./ModalCartPage.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToRemove, setProductToRemove] = useState(null);
    const [cartUpdated, setCartUpdated] = useState(false);
    const { cartCount, updatedCartCount } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        try {
            const fetchCart = async () => {
                const cart = await httpRequest.get("/api/cart", {
                    withCredentials: true,
                });
                console.log("cart ::", cart?.data?.data);
                setCart(cart?.data?.data);
            };
            fetchCart();
        } catch (error) {
            console.log("Error at HEADER:", error);
        }
    }, []);

    // 🔥 Xóa sản phẩm
    const handleRemoveProduct = (product) => {
        setProductToRemove(product);
        setShowConfirmModal(true);
    };

    // 🔥 Tính tổng tiền
    const subtotal = cart.reduce(
        (sum, item) => sum + item.gia_khuyen_mai * Number(item.total_quantity),
        0
    );

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = cart.map((product) =>
            product.product_id === id
                ? { ...product, total_quantity: newQuantity }
                : product
        );
        setCart(updatedCart);
        setCartUpdated(true);
    };
    const confirmRemoveProduct = async () => {
        const updatedCart = cart.filter(
            (product) => product.product_id !== productToRemove.product_id
        );
        await httpRequest.delete(`/api/cart/${productToRemove?.id}`, {
            withCredentials: true,
        });
        updatedCartCount();
        setCart(updatedCart);
        setShowConfirmModal(false);
        setCartUpdated(true);
        toast.success(
            `Đã bỏ sản phẩm ${productToRemove.ten_san_pham} ra ngoài giỏ hàng`,
            {
                autoClose: 1200,
            }
        );
    };

    const cancelRemoveProduct = () => {
        setShowConfirmModal(false);
    };

    const handleCheckout = async () => {
        if (cartUpdated) {
            await updateCartOnServer(cart);
            setCartUpdated(false);
        }
        navigate("/cart/checkout");
    };
    const handleGoBack = async () => {
        if (cartUpdated) {
            await updateCartOnServer(cart);
            setCartUpdated(false);
        }
        navigate(-1);
    };

    const updateCartOnServer = async (updatedCart) => {
        try {
            await httpRequest.put(
                "/api/cart/updated",
                {
                    userId: user.id,
                    updatedCart,
                },
                { withCredentials: true }
            );
            // console.log("res:: on cartpage:", res);
        } catch (err) {
            console.log("Error at cart page:", err);
        }
    };

    return (
        <>
            {showConfirmModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3 className="uppercase font-bold">
                            Bạn có chắc chắn muốn xóa sản phẩm này?
                        </h3>
                        <p className="mt-3">{productToRemove?.ten_san_pham}</p>
                        <div className="flex mt-3">
                            <button
                                className="flex-1 p-2 border border-red-400 bg-red-400 rounded text-black hover:bg-red-600 hover:text-white"
                                onClick={confirmRemoveProduct}
                            >
                                Xóa
                            </button>
                            <button
                                className="flex-1 p-2 border border-red-400 rounded"
                                onClick={cancelRemoveProduct}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-gray-50 min-h-screen">
                <div className="bg-white py-2 px-10 mt-4 text-sm">
                    <span>Trang Chủ</span> &gt;{" "}
                    <span className="text-yellow-600">Giỏ hàng</span>
                </div>

                <div className="container mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 px-10 pb-20">
                    {/* LEFT */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Sản phẩm</h2>

                        {cart.length === 0 ? (
                            <p className="text-gray-500">
                                Giỏ hàng của bạn đang trống.
                            </p>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="flex items-center justify-between border-b py-4"
                                >
                                    <div className="flex items-center gap-3 max-w-[300px]">
                                        <img
                                            src={`${
                                                DOMAIN + item.anh_dai_dien
                                            }`}
                                            alt={item.ten_san_pham}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium text-yellow-700">
                                                {item.ten_san_pham}
                                            </p>
                                            <p className="text-xs text-yellow-900">
                                                {/* {item.bienthe} */}
                                            </p>
                                            <p className="font-semibold">
                                                {formatPrice(
                                                    item.gia_khuyen_mai
                                                )}{" "}
                                                ₫
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center mt-2">
                                            <button
                                                className="px-3 border"
                                                disabled={
                                                    item.total_quantity <= 1
                                                }
                                                onClick={() => {
                                                    updatedCartCount(
                                                        (c) => c - 1
                                                    );
                                                    handleQuantityChange(
                                                        item.product_id,
                                                        item.total_quantity - 1
                                                    );
                                                }}
                                            >
                                                -
                                            </button>

                                            <input
                                                type="text"
                                                value={item.total_quantity}
                                                readOnly
                                                className="w-10 text-center border-t border-b"
                                            />

                                            <button
                                                className="px-3 border"
                                                onClick={() => {
                                                    updatedCartCount(
                                                        (c) => c + 1
                                                    );
                                                    handleQuantityChange(
                                                        item.product_id,
                                                        item.total_quantity + 1
                                                    );
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold mt-2 text-yellow-700">
                                            {(
                                                item.total_quantity *
                                                Number(item.gia_khuyen_mai)
                                            ).toLocaleString()}{" "}
                                            ₫
                                        </p>

                                        <button
                                            className="w-full mt-6 bg-red-500 text-white py-1.5 rounded hover:bg-red-900 "
                                            onClick={() =>
                                                handleRemoveProduct(item)
                                            }
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}

                        <button
                            onClick={() => handleGoBack()}
                            className="mt-6 inline-block bg-transparent border border-yellow-600 text-yellow-600 px-4 py-2 rounded hover:bg-yellow-600 hover:text-white"
                        >
                            ← Tiếp tục xem sản phẩm
                        </button>
                    </div>

                    {/* RIGHT */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Tổng cộng giỏ hàng
                        </h2>

                        <div className="flex justify-between border-b pb-2">
                            <span>Tạm tính</span>
                            <span className="font-medium">
                                {subtotal.toLocaleString()} ₫
                            </span>
                        </div>

                        <div className="flex justify-between border-b py-2">
                            <span>Vận chuyển</span>
                            <span className="text-gray-500 text-sm">
                                Miễn phí vận chuyển
                            </span>
                        </div>

                        <div className="flex justify-between mt-3">
                            <span className="text-lg font-semibold">Tổng</span>
                            <span className="text-lg font-semibold text-yellow-600">
                                {subtotal.toLocaleString()} ₫
                            </span>
                        </div>

                        {cartCount > 0 && (
                            <button
                                className="w-full mt-6 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
                                onClick={() => handleCheckout()}
                            >
                                Tiến hành thanh toán
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
