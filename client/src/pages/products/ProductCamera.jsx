import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { productCamera as products } from "./data/products";
import "./css/ProductSmartLock.css";

const logos = [
    {
        slug: "imou",
        title: "Camera Wifi IMOU",
        alt: "Camera Wifi IMOU",
        link: "/imou",
    },
    {
        slug: "ezviz",
        title: "Camera Wifi Ezviz",
        alt: "Camera Wifi Ezviz",
        link: "/ezviz",
    },
    {
        slug: "dahua",
        title: "Camera Dahua",
        alt: "Camera Dahua",
        link: "/dahua",
    },
    {
        slug: "hikvision",
        title: "Camera Hikvision",
        alt: "Camera Hikvision",
        link: "/hikvision",
    },
    {
        slug: "tapo-tp-link",
        title: "Camera Tapo TP Link",
        alt: "Camera Tapo TP Link",
        link: "/tapo-tp-link",
    },
    {
        slug: "hanh-trinh",
        title: "Camera Hành Trình",
        alt: "Camera Hành Trình",
        link: "/hanh-trinh",
    },
];

function ProductCard({ product, uniqueKey }) {
    return (
        <div key={uniqueKey} className="SLP-card">
            <div className="SLP-thumb">
                <img src={product.img} alt={product.title} loading="lazy" />
            </div>
            <div className="SLP-info">
                <Link to={product.to} className="SLP-title">
                    {product.title}
                </Link>
                <div className="SLP-prices">
                    <span className="SLP-price">{product.price}</span>
                    {product.old && (
                        <span className="SLP-price-old">{product.old}</span>
                    )}
                </div>
                <div className="SLP-actions">
                    <button type="button" className="SLP-compare">
                        So sánh
                    </button>
                    <button
                        type="button"
                        className="SLP-cart"
                        aria-label="Thêm vào giỏ"
                    >
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProductCamera() {
    return (
        <div className="Container-ProductSmartLock">
            <div className="ProductSmartLock-BannerPage">
                <img src="/productpage/banner-page/banner-pages.png" alt="" />
            </div>

            <div className="ProductSmartLock-Content">
                <nav
                    className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                    aria-label="Breadcrumb"
                >
                    <Link to="/" className="PSL-crumb">
                        <span>Trang Chủ</span>
                    </Link>
                    <FontAwesomeIcon icon={faAngleRight} className="PSL-sep" />
                    <Link to="/camera" className="PSL-crumb PSL-crumb-active">
                        <span>Camera</span>
                    </Link>
                </nav>
            </div>

            {logos.map((brand) => {
                const brandProducts = products
                    .filter((product) => product.brand === brand.slug)
                    .slice(0, 5);
                if (!brandProducts.length) return null;
                return (
                    <section
                        key={brand.slug}
                        className="ProductSmartLock-ListSP"
                    >
                        <div className="ProductSmartLock-ListSP_Title">
                            <div>
                                <h2>{brand.title}</h2>
                            </div>
                            <div>
                                <Link to={brand.link}>
                                    <span>Xem tất cả</span>
                                </Link>
                            </div>
                        </div>
                        <div className="ProductSmartLock-ListSP_Products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-6">
                            {brandProducts.map((product, index) => (
                                <ProductCard
                                    key={brand.slug + index}
                                    product={product}
                                    uniqueKey={brand.slug + index}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default ProductCamera;
