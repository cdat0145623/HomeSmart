import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { productAccessory as products } from "./data/products";
import "./css/ProductSmartLock.css";

const logos = [
    {
        slug: "phu-kien-khoa-van-tay",
        title: "Phụ kiện khoá vân tay",
        alt: "khoa van tay",
        link: "/phu-kien/khoa-van-tay",
    },
    {
        slug: "phu-kien-camera",
        title: "Phụ kiện Camera",
        alt: "phu kien camera",
        link: "/phu-kien/camera",
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

function ProductAccessory() {
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
                        <span>Phụ kiện</span>
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

export default ProductAccessory;
