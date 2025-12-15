import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "./data/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/ProductSmartLock.css";
import './css/BrandAll.css'

const brandTitles = {
ezviz: "Khóa cửa Ezviz",
bosch: "Khóa vân tay Bosch",
hafele: "Khóa cửa Hafele",
hubert: "Khóa cửa Hubert",
hyundai: "Khóa cửa Hyundai",
kaadas: "Khóa cửa Kaadas",
kassler: "Khóa cửa Kassler",
};

function ProductCard({ product, uniqueKey }) {
return (
<div key={uniqueKey} className="SLP-card">
    <div className="SLP-thumb">
        <img src={product.img} alt={product.title} loading="lazy" />
        </div>
        <div className="SLP-info">
        <Link to={product.to} className="SLP-title">{product.title}</Link>
        <div className="SLP-prices">
            <span className="SLP-price">{product.price}</span>
            {product.old && <span className="SLP-price-old">{product.old}</span>}
        </div>
        <div className="SLP-actions">
            <button type="button" className="SLP-compare">So sánh</button>
            <button type="button" className="SLP-cart" aria-label="Thêm vào giỏ"><FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    </div>
</div>
);
}

function BrandAll() {
const { slug } = useParams();
const title = brandTitles[slug] || "Sản phẩm";
const brandProducts = products.filter(product => product.brand === slug);

return (
<div className="Container-ProductSmartLock">
    <div className="ProductSmartLock-BannerPage">
        <img src="/productpage/banner-page/banner-pages.png" alt="" />
    </div>
    <div className="ProductSmartLock-Content">
    <nav className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
        <Link to="/" className="PSL-crumb"><span>Trang Chủ</span></Link>
        <span className="PSL-sep">/</span>
        <Link to="/khoa-cua-thong-minh" className="PSL-crumb"><span>Khóa cửa thông minh</span></Link>
        <span className="PSL-sep">/</span>
        <span className="PSL-crumb PSL-crumb-active">{title}</span>
    </nav>
    </div>


<div className="BrandAll-Filter max-w-[1200px] mx-auto px-5">
        <div className="BrandAll-row flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div className="BA-brand">
            Thương hiệu: <span className="name">{title}</span>
            </div>

            <fieldset className="BA-fieldset w-full lg:w-auto">
            <div className="BA-legend">Khoảng giá</div>
            <div className="BA-inline flex flex-wrap items-center gap-3">
                <label className="BA-control inline-flex items-center gap-2">
                <input type="radio" name="priceRange" />
                <span>Dưới 3 triệu</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="radio" name="priceRange" />
                <span>3 triệu - 5 triệu</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="radio" name="priceRange" />
                <span>5 triệu - 8 triệu</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="radio" name="priceRange" />
                <span>Từ 8 triệu trở lên</span>
                </label>

                <button type="button" className="BA-btn BA-btn--mini">
                Bỏ chọn giá
                </button>
            </div>
            </fieldset>
        </div>

        <div className="BA-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
            <fieldset className="BA-fieldset">
            <div className="BA-legend">Kiểu dáng tay</div>
            <div className="BA-stack flex flex-col gap-2 max-h-36 overflow-auto pr-1">
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Không tay cầm</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Kéo đẩy (Push-Pull)</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Tay gạt</span>
                </label>
            </div>
            </fieldset>

            <fieldset className="BA-fieldset">
            <div className="BA-legend">Theo loại cửa</div>
            <div className="BA-stack flex flex-col gap-2 max-h-36 overflow-auto pr-1">
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Cửa nhôm</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Cửa gỗ</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Cửa khách sạn</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Cửa đại sảnh</span>
                </label>
            </div>
            </fieldset>

            <fieldset className="BA-fieldset">
            <div className="BA-legend">Tính năng mở khóa</div>
            <div className="BA-stack flex flex-col gap-2 max-h-36 overflow-auto pr-1">
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Vân tay</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Nhận diện khuôn mặt</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Mật mã</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Thẻ từ</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>WiFi / App</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Bluetooth</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Chìa cơ</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Chuông hình</span>
                </label>
            </div>
            </fieldset>
            <fieldset className="BA-fieldset">
            <div className="BA-legend">Màu sắc</div>
            <div className="BA-inline flex flex-wrap items-center gap-3">
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Đen</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Xám</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Đồng</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Vàng</span>
                </label>
                <label className="BA-control inline-flex items-center gap-2">
                <input type="checkbox" /> <span>Bạc</span>
                </label>
            </div>
            </fieldset>
        </div>
        <div className="BA-toolbar flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3">
            <div className="flex items-center gap-2">
            <span className="BA-sortLabel">Sắp xếp theo:</span>
            <select className="BA-select">
                <option>Mới nhất</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
                <option>Tên A → Z</option>
                <option>Còn hàng</option>
            </select>
            </div>

            <button type="button" className="BA-btn BA-btn--reset self-start sm:self-auto">
            Xóa bộ lọc
            </button>
        </div>
</div>
<div className="ProductSmartLock-ListSP">
    <div className="ProductSmartLock-ListSP_Title">
        <div><h2>{title}</h2></div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-6">
        {brandProducts.map((product, index) => (
        <ProductCard key={slug + index} product={product} uniqueKey={slug + index} />
        ))}
        {!brandProducts.length && <div>Chưa có sản phẩm.</div>}
    </div>
    </div>
</div>
);
}

export default BrandAll;
