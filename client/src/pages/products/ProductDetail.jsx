import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/ProductDetail.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate()

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [related, setRelated] = useState([]);

  const formatted = (v) =>
    Number(v).toLocaleString("vi-VN", { style: "currency", currency: "VND" });


  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:5000/products/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
      .catch(console.error);

    fetch(`http://localhost:5000/products/slug/${slug}/related`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setRelated(data.data);
      })
      .catch(console.error);
  }, [slug]);

  if (!product) return <p>Đang tải...</p>;

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;

    // Nếu ảnh nằm trong server/uploads
    if (path.startsWith("uploads")) {
      return `http://localhost:5000/${path}`;
    }

    // Nếu ảnh nằm trong client/public
    return path;
  };
 const handleAddToCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        credentials: "include",   // <== gửi cookie
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId: product.id,
            quantity,
        }),
    });

    const data = await res.json();
    alert(data.message);
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
          onClick={() => navigate(`/danh-muc/${product?.danh_muc_id || ""}`)}
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
          src={
            product.anh_dai_dien.startsWith("http")
              ? product.anh_dai_dien
              : product.anh_dai_dien
          }
          alt={product.ten_san_pham}
        />
        <div className="pd-thumbs">
          <img
            src={
              product.anh_dai_dien.startsWith("http")
                ? product.anh_dai_dien
                : product.anh_dai_dien
            }
            alt=""
          />
        </div>
      </div>


      {/* INFO */}
       <div className="pd-right">
        <h1 className="pd-title">{product.ten_san_pham}</h1>

        <div className="pd-rating-box">
          <span className="pd-star">⭐ 4.7</span>
          <span className="pd-review">(27 đánh giá)</span>
          <span className="pd-sold">Đã bán 52.1k</span>
        </div>

        <div className="pd-price-box">
          <del className="pd-old">{formatted(product.gia_goc)}</del>
          <span className="pd-new">{formatted(product.gia_khuyen_mai)}</span>
        </div>

        <ul className="pd-features">
          <li>✔ Bật tắt và điều khiển đèn từ xa dù ở bất kỳ nơi nào</li>
          <li>✔ Hẹn giờ bật tắt thiết bị qua điện thoại</li>
          <li>✔ Có khả năng chia sẻ ra mọi thành viên gia đình dùng chung</li>
          <li>✔ Lắp đặt cực kỳ dễ dàng, chỉ mất 2-3 phút</li>
          <li>✔ Hotline 24/7: 0983.988.828</li>
          <li>✔ HÀNG VIỆT NAM – CHẤT LƯỢNG CAO</li>
        </ul>

        {/* Quantity */}
        <div className="pd-qty-box">
          <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        {/* Buttons */}
        <div className="pd-btn-group">
          <button className="pd-btn-add" onClick={handleAddToCart}>Thêm vào giỏ</button>

          <button className="pd-btn-buy" onClick={handleBuyNow}>Đặt mua ngay</button>
        </div>

        {/* Secure Message */}
        <div className="pd-secure-box">
          Cam kết các sản phẩm đang bán trên website là sản phẩm chính hãng.
          Tất cả sản phẩm đều có bảo hành.
        </div>

        {/* Product Meta */}
        <p className="pd-meta">
          <strong>Mã sản phẩm:</strong> {product.ma_san_pham || "ĐTBS01"}
        </p>
        <p className="pd-meta">
          <strong>Danh mục:</strong> Công Tắc Điều Khiển Từ Xa, Thiết Bị Điện
          Thông Minh
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
          <div dangerouslySetInnerHTML={{ __html: product.mo_ta }}></div>
        )}

        {activeTab === "delivery" && (
          <div>
            <h3>Bảo hành</h3>
            <p>12 tháng đổi mới nếu lỗi kỹ thuật.</p>
          </div>
        )}
      </div>

      {/* RELATED */}
      {/* <h3 className="pd-related-title">Sản phẩm liên quan</h3>

      <div className="pd-related-list">
        {related.map((p) => (
          <div key={p.id} className="pd-related-card">
            <a href={`/san-pham/${p.duong_dan_ten_seo}`}>
              <img
                src={getImageUrl(p.anh_dai_dien)}
                alt={p.ten_san_pham}
                className="pd-related-img"
              />
            </a>
            <p>{p.ten_san_pham}</p>
            <strong>{Number(p.gia_khuyen_mai).toLocaleString("vi-VN")} đ</strong>
          </div>
        ))}
      </div> */}
      {/* RELATED */}
<h3 className="pd-related-title">Sản phẩm liên quan</h3>

<div className="related-grid">
  {related.map((p) => (
    <div key={p.id} className="related-card">
      <a href={`/san-pham/${p.duong_dan_ten_seo}`}>
        <div className="related-img-wrapper">
          <img
            src={getImageUrl(p.anh_dai_dien)}
            alt={p.ten_san_pham}
          />
        </div>
      </a>

      <p className="related-name">{p.ten_san_pham}</p>

      <div className="related-price">
        <del>{Number(p.gia_goc).toLocaleString("vi-VN")} đ</del>
        <span className="new-price">
          {Number(p.gia_khuyen_mai).toLocaleString("vi-VN")} đ
        </span>
      </div>

      <div className="related-btn-box">
        <button className="btn-compare">So sánh</button>
        <button type="button" className="SLP-cart" aria-label="Thêm vào giỏ">
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ProductDetail;
