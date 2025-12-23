import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DOMAIN } from "../../../helper/helper";

function LockCard({ product }) {
    return (
        <div className="SLP-card">
            <div className="SLP-thumb">
                <Link to={`/${product.duong_dan_ten_seo}`}>
                    <img
                        src={`${DOMAIN + product.anh_dai_dien}`}
                        alt={product.ten_san_pham}
                        loading="lazy"
                    />
                </Link>
            </div>
            <div className="SLP-info">
                <Link to={product.duong_dan_ten_seo} className="SLP-title">
                    {product.ten_san_pham}
                </Link>
                <div className="SLP-prices">
                    <span className="SLP-price">{product.gia_khuyen_mai}</span>
                    <span className="SLP-price-old">{product.gia_goc}</span>
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

export default LockCard;
