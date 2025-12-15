import React, { useEffect, useState } from "react";
import "./css/TopsellingProducts.css";
import { Link } from "react-router-dom";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const items = [
  {
    to: "/khuyen-mai",
    title: "Sản phẩm giá sốc",
    subtitle: "Giá luôn rẻ nhất",
    icon: "/homepage/collection/flame.png",
    emphasis: true,
  },
  {
    to: "/camera",
    title: "Camera ưu đãi",
    subtitle: "Chuẩn hàng chính hãng",
    icon: "/homepage/collection/cctv.png",
  },
  {
    to: "/khoa-thong-minh",
    title: "Khóa vân tay giảm sốc",
    subtitle: "TOP 1 bán chạy 2025",
    icon: "/homepage/collection/knob.png",
  },
  {
    to: "/cua-nhua-composite",
    title: "Cửa nẹp kim loại",
    subtitle: "Bền - đẹp - chống nước",
    icon: "/homepage/collection/open-door.png",
  },
];

function TopSellingProducts() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/stats/top-selling")
      .then((res) => {
        if (res.data.ok) {
          setTopProducts(res.data.data);
        }
      })
      .catch((err) => console.error("Lỗi API top-selling:", err));
  }, []);

  return (
    <section className="Container-TopSellingProducts px-4 py-8">
      <div className="TopSellingProducts-Content max-w-6xl mx-auto">
        <AnimationWrapper type="fade" delay={0}>
          <div className="TopSellingProducts-Content_Title text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase">
              Top sản phẩm bán chạy
            </h2>
          </div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <AnimationWrapper key={i} type="fade-up" delay={i * 120}>
              <div className={`TSP-card ${it.emphasis ? "is-emphasis" : ""}`}>
                <Link className="TSP-link flex items-center gap-3" to={it.to}>
                  <div className="TSP-icon flex items-center justify-center rounded-full">
                    <img src={it.icon} className="w-7 h-7 object-contain" />
                  </div>
                  <div className="TSP-text flex-1">
                    <div className="TSP-title font-semibold">{it.title}</div>
                    <div className="TSP-subtitle text-sm">{it.subtitle}</div>
                  </div>
                </Link>
              </div>
            </AnimationWrapper>
          ))}
        </div>

        {/* TOP SELLING PRODUCTS */}
        <div className="TSP-Product grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {topProducts.map((p, i) => (
            <AnimationWrapper key={p.product_id} type="fade-up" delay={i * 150}>
              <div className="SLP-card">
                <div className="SLP-thumb">
                  <Link to={`/san-pham/${p.duong_dan_ten_seo}`}>
                    <img src={p.anh_dai_dien} alt={p.ten_san_pham} />
                  </Link>
                </div>

                <div className="SLP-info">
                  <Link
                    to={`/san-pham/${p.duong_dan_ten_seo}`}
                    className="SLP-title"
                  >
                    {p.ten_san_pham}
                  </Link>

                  <div className="SLP-prices">
                    <span className="SLP-price-old">
                      {p.gia?.toLocaleString()} đ
                    </span>
                    <span className="SLP-price">
                      {p.gia_khuyen_mai?.toLocaleString()} đ
                    </span>
                  </div>

                  <div className="SLP-actions">
                    <button className="SLP-compare">So sánh</button>
                    <button className="SLP-cart">
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </div>

        <AnimationWrapper type="zoom-in" delay={100}>
          <div className="text-center mt-8">
            <Link to="/san-pham-ban-chay" className="TSP-more-btn">
              Xem thêm →
            </Link>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}

export default TopSellingProducts;
