import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../css/ProductSmartLock.css";
import LockCard from "./LockCard";
import { logos } from "../../../helper/helper";
import useFetch from "../../../customHooks/useFetch";

function SmartLock() {
    const { data, loading } = useFetch(
        "category/khoa cua thong minh",
        8,
        "category"
    );
    if (loading) return <div>Loading...</div>;
    console.log("data:::", data);
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
                    <Link
                        to="/khoa-cua-thong-minh"
                        className="PSL-crumb PSL-crumb-active"
                    >
                        <span>Khóa cửa thông minh</span>
                    </Link>
                </nav>
            </div>

            <div className="ProductSmartLock-cate-wrapper">
                <div className="ProductSmartLock-cate">
                    {logos.map((logoItem) => (
                        <Link
                            key={logoItem.slug}
                            to={logoItem.link}
                            className="PSL-logoItem"
                        >
                            <div className="PSL-logoBox">
                                <img src={logoItem.src} alt={logoItem.alt} />
                            </div>
                            <p className="PSL-logoTitle">{logoItem.title}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {data.length > 0 &&
                data.map((items) => {
                    const products = items.productByCate;
                    if (products.length === 0) return;
                    return (
                        <section
                            key={items.cate.id}
                            className="ProductSmartLock-ListSP"
                        >
                            <div className="ProductSmartLock-ListSP_Title">
                                <div>
                                    <h2>{items.cate.ten_danh_muc}</h2>
                                </div>
                                <div>
                                    <Link
                                        to={`/${items.cate.duong_dan_ten_seo}`}
                                    >
                                        <span>Xem tất cả</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="ProductSmartLock-ListSP_Products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
                                {products.slice(0, 4).map((product, index) => (
                                    <LockCard
                                        key={`${
                                            product.duong_dan_ten_seo + index
                                        }`}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}
        </div>
    );
}

export default SmartLock;
