import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { products } from "./data/products";
import "./css/ProductSmartLock.css";

const logos = [
{ slug: "ezviz", title: "Khóa cửa Ezviz", src: "/homepage/PartnerLogos/logo_ezviz.jpg", alt: "EZVIZ", link: "/thuong-hieu/ezviz" },
{ slug: "bosch", title: "Khóa vân tay Bosch", src: "/homepage/PartnerLogos/logo_bosh.jpg", alt: "Bosch", link: "/thuong-hieu/bosch" },
{ slug: "hafele", title: "Khóa cửa Hafele", src: "/homepage/PartnerLogos/logo_hafele.jpg", alt: "Hafele", link: "/thuong-hieu/hafele" },
{ slug: "hubert", title: "Khóa cửa Hubert", src: "/homepage/PartnerLogos/logo_hubert.jpg", alt: "Hubert", link: "/thuong-hieu/hubert" },
{ slug: "hyundai", title: "Khóa cửa Hyundai", src: "/homepage/PartnerLogos/logo_hyundai.png", alt: "Hyundai", link: "/thuong-hieu/hyundai" },
{ slug: "kaadas", title: "Khóa cửa Kaadas", src: "/homepage/PartnerLogos/logo_kaadas.jpg", alt: "Kaadas", link: "/thuong-hieu/kaadas" },
{ slug: "kassler", title: "Khóa cửa Kassler", src: "/homepage/PartnerLogos/logo_kassler.jpg", alt: "Kassler", link: "/thuong-hieu/kassler" },
];

function ProductCard({ product, uniqueKey }) {
return (
    <div key={uniqueKey} className="SLP-card">
    <div className="SLP-thumb"><img src={product.img} alt={product.title} loading="lazy" /></div>
    <div className="SLP-info">
        <Link to={product.to} className="SLP-title">{product.title}</Link>
        <div className="SLP-prices">
        <span className="SLP-price">{product.price}</span>
        {product.old && <span className="SLP-price-old">{product.old}</span>}
        </div>
        <div className="SLP-actions">
        <button type="button" className="SLP-compare">So sánh</button>
        <button type="button" className="SLP-cart" aria-label="Thêm vào giỏ">
            <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        </div>
    </div>
    </div>
);
}

function ProductSmartLock() {
return (
    <div className="Container-ProductSmartLock">
    <div className="ProductSmartLock-BannerPage">
        <img src="/productpage/banner-page/banner-pages.png" alt="" />
    </div>

    <div className="ProductSmartLock-Content">
        <nav className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base" aria-label="Breadcrumb">
        <Link to="/" className="PSL-crumb"><span>Trang Chủ</span></Link>
        <FontAwesomeIcon icon={faAngleRight} className="PSL-sep" />
        <Link to="/khoa-cua-thong-minh" className="PSL-crumb PSL-crumb-active"><span>Khóa cửa thông minh</span></Link>
        </nav>
    </div>

    <div className="ProductSmartLock-cate-wrapper">
        <div className="ProductSmartLock-cate">
        {logos.map((logoItem) => (
            <Link key={logoItem.slug} to={logoItem.link} className="PSL-logoItem">
            <div className="PSL-logoBox"><img src={logoItem.src} alt={logoItem.alt} /></div>
            <p className="PSL-logoTitle">{logoItem.title}</p>
            </Link>
        ))}
        </div>
    </div>

    {logos.map((brand) => {
        const brandProducts = products.filter(product => product.brand === brand.slug).slice(0, 5);
        if (!brandProducts.length) return null;
        return (
        <section key={brand.slug} className="ProductSmartLock-ListSP">
            <div className="ProductSmartLock-ListSP_Title">
            <div><h2>{brand.title}</h2></div>
            <div><Link to={brand.link}><span>Xem tất cả</span></Link></div>
            </div>
            <div className="ProductSmartLock-ListSP_Products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-6">
            {brandProducts.map((product, index) => (
                <ProductCard key={brand.slug + index} product={product} uniqueKey={brand.slug + index} />
            ))}
            </div>
        </section>
        );
    })}
    </div>
);
}

export default ProductSmartLock;
