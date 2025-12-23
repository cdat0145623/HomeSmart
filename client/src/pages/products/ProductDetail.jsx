import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/ProductDetail.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import useFetch from "../../customHooks/useFetch";
import { DOMAIN, formatPrice } from "../../helper/helper";
import { cart as addNewProduct } from "../../services/cartService";
import { useCart } from "../../context/CartContext";
import Appreciate from "../Appreciate/Appreciate";

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    const { data: product, loading: productIsLoading } = useFetch(slug);
    const { data: relatedProduct, loading: relatedProductIsLoading } = useFetch(
        `${slug}/related`
    );
    // console.log("product:", product);
    const { updatedCartCount } = useCart();

    if (productIsLoading || relatedProductIsLoading) return <p>Đang tải...</p>;

    const handleAddToCart = async () => {
        try {
            const res = await addNewProduct(
                "add",
                {
                    productId: product.id,
                    quantity,
                },
                { withCredentials: true }
            );
            if (res?.ok) {
                updatedCartCount((c) => c + quantity);

                toast.success("Thêm thành công sản phẩm vào giỏ hàng", {
                    autoClose: 1200,
                });
            }
        } catch (err) {
            console.log("ERROR AT productDetail", err);
            toast.error(err, { autoClose: 1200 });
        }
    };

    const handleBuyNow = async () => {
        const res = await fetch("http://localhost:5000/api/cart/buy-now", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: product.id,
                quantity,
            }),
        });

        const data = await res.json();

        if (data.ok) {
            toast.success("Đặt hàng thành công!");
            setTimeout(() => {
                navigate(`/checkout/${data.orderId}`);
            }, 1200);
        } else {
            toast.error(data.message || "Đặt hàng thất bại!");
        }
    };

    return (
        <div className="pd-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <span className="crumb-link" onClick={() => navigate("/")}>
                    Trang chủ
                </span>
                <span className="separator">/</span>
                <span
                    className="crumb-link"
                    onClick={() =>
                        navigate(`/danh-muc/${product?.danh_muc_id || ""}`)
                    }
                >
                    {product?.danh_muc_ten || "Danh mục"}
                </span>
                <span className="separator">/</span>
                <span className="current">{product?.ten_san_pham}</span>
            </div>

            {/* MEDIA */}
            <div className="pd-media">
                <img
                    className="pd-main-img"
                    src={`${DOMAIN + product?.anh_dai_dien}`}
                    alt={product?.ten_san_pham}
                />
                <div className="pd-thumbs">
                    <img src={`${DOMAIN + product?.anh_dai_dien}`} alt="" />
                </div>
            </div>

            {/* INFO */}
            <div className="pd-right">
                <h1 className="pd-title">{product?.ten_san_pham}</h1>

                <div className="pd-rating-box">
                    <span className="pd-star">⭐ 4.7</span>
                    <span className="pd-review">(27 đánh giá)</span>
                    <span className="pd-sold">Đã bán 52.1k</span>
                </div>

                <div className="pd-price-box">
                    <del className="pd-old">
                        {formatPrice(product?.gia_goc)} VND
                    </del>
                    <span className="pd-new">
                        {formatPrice(product?.gia_khuyen_mai)} VND
                    </span>
                </div>

                <ul className="pd-features">
                    <li>
                        ✔ Bật tắt và điều khiển đèn từ xa dù ở bất kỳ nơi nào
                    </li>
                    <li>✔ Hẹn giờ bật tắt thiết bị qua điện thoại</li>
                    <li>
                        ✔ Có khả năng chia sẻ ra mọi thành viên gia đình dùng
                        chung
                    </li>
                    <li>✔ Lắp đặt cực kỳ dễ dàng, chỉ mất 2-3 phút</li>
                    <li>✔ Hotline 24/7: 0983.988.828</li>
                    <li>✔ HÀNG VIỆT NAM – CHẤT LƯỢNG CAO</li>
                </ul>

                {/* Quantity */}
                <div className="pd-qty-box">
                    <button
                        onClick={() =>
                            setQuantity(quantity > 1 ? quantity - 1 : 1)
                        }
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                {/* Buttons */}
                <div className="pd-btn-group">
                    <button className="pd-btn-add" onClick={handleAddToCart}>
                        Thêm vào giỏ
                    </button>

                    <button className="pd-btn-buy" onClick={handleBuyNow}>
                        Đặt mua ngay
                    </button>
                </div>

                {/* Secure Message */}
                <div className="pd-secure-box">
                    Cam kết các sản phẩm đang bán trên website là sản phẩm chính
                    hãng. Tất cả sản phẩm đều có bảo hành.
                </div>

                {/* Product Meta */}
                <p className="pd-meta">
                    <strong>Mã sản phẩm:</strong>{" "}
                    {product?.ma_san_pham || "ĐTBS01"}
                </p>
                <p className="pd-meta">
                    <strong>Danh mục:</strong> Công Tắc Điều Khiển Từ Xa, Thiết
                    Bị Điện Thông Minh
                </p>
            </div>

            {/* TABS */}
            <div className="pd-tabs">
                <button
                    className={activeTab === "description" ? "active" : ""}
                    onClick={() => setActiveTab("description")}
                >
                    Mô tả
                </button>
                <button
                    className={activeTab === "delivery" ? "active" : ""}
                    onClick={() => setActiveTab("delivery")}
                >
                    Chính Sách
                </button>
            </div>

            {/* TAB CONTENT */}
            <div className="pd-tab-content">
                {activeTab === "description" && (
                    <div
                        dangerouslySetInnerHTML={{ __html: product?.mo_ta }}
                    ></div>
                )}

                {activeTab === "delivery" && (
                    <div>
                        <h3>Bảo hành</h3>
                        <p>12 tháng đổi mới nếu lỗi kỹ thuật.</p>
                    </div>
                )}
            </div>

            {/* RELATED */}
            <h3 className="pd-related-title">Sản phẩm liên quan</h3>

            <div className="related-grid">
                {relatedProduct.map((p) => (
                    <div key={p.id} className="related-card">
                        <Link to={`/${p.duong_dan_ten_seo}`}>
                            <div className="related-img-wrapper">
                                <img
                                    src={`${DOMAIN + p.anh_dai_dien}`}
                                    alt={p.ten_san_pham}
                                />
                            </div>
                        </Link>

                        <Link to={`/${p.duong_dan_ten_seo}`}>
                            <p className="related-name">{p.ten_san_pham}</p>
                        </Link>

                        <div className="related-price">
                            <del>{formatPrice(p.gia_goc)} đ</del>
                            <span className="new-price">
                                {formatPrice(p.gia_khuyen_mai)} đ
                            </span>
                        </div>

                        <div className="related-btn-box">
                            <button className="btn-compare">So sánh</button>
                            <button
                                type="button"
                                className="SLP-cart"
                                aria-label="Thêm vào giỏ"
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Appreciate product={product} />
            {/* <Evaluate /> */}
        </div>
    );
};

export default ProductDetail;
