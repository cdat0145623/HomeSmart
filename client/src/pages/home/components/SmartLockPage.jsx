import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/SmartLockPage.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";
import useFetch from "../../../customHooks/useFetch";
import { DOMAIN, formatPrice } from "../../../helper/helper";

function SmartLockPage() {
    const { data, loading } = useFetch("category/khoa cua thong minh", 8);

    // console.log("data:", data);
    return (
        <div className="Container-SmartLockPage w-full">
            <div className="SmartLockPage-Content max-w-[1200px] mx-auto px-4 py-6">
                <AnimationWrapper type="fade" delay={loading}>
                    <div className="SmartLockPage-Content_Cate flex flex-wrap items-center gap-4">
                        <div className="border-2 px-4 py-2 rounded-md uppercase subject-pill">
                            <h2 className="text-base md:text-lg font-semibold">
                                {data?.category?.main?.ten_danh_muc}
                            </h2>
                        </div>

                        {data?.category?.subs.slice(0, 4).map((sub, index) => (
                            <Link
                                key={index}
                                to={sub.duong_dan_ten_seo}
                                className="block px-4 py-2"
                            >
                                <h2 className="text-base uppercase md:text-lg font-semibold">
                                    {sub.ten_danh_muc}
                                </h2>
                            </Link>
                        ))}
                    </div>
                </AnimationWrapper>
                <div className="SmartLockPage-Content_Products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
                    {data?.products?.length > 0 &&
                        !loading &&
                        data?.products.map((p, i) => (
                            <AnimationWrapper
                                key={p.id}
                                type="fade-up"
                                delay={i * 120}
                            >
                                <div className="SLP-card">
                                    <div className="SLP-thumb">
                                        <Link to={`/${p.duong_dan_ten_seo}`}>
                                            <img
                                                src={`${
                                                    DOMAIN + p.anh_dai_dien
                                                }`}
                                                alt={p.ten_san_pham}
                                                loading="lazy"
                                            />
                                        </Link>
                                    </div>

                                    <div className="SLP-info">
                                        <Link
                                            to={`/${p.duong_dan_ten_seo}`}
                                            className="SLP-title"
                                        >
                                            {p.ten_san_pham}
                                        </Link>

                                        <div className="SLP-prices">
                                            <span className="SLP-price-old">
                                                {formatPrice(p.gia_goc)}
                                            </span>
                                            <span className="SLP-price">
                                                {formatPrice(p.gia_khuyen_mai)}
                                            </span>
                                        </div>

                                        <div className="SLP-actions">
                                            <button
                                                type="button"
                                                className="SLP-compare"
                                            >
                                                So sánh
                                            </button>
                                            <button
                                                type="button"
                                                className="SLP-cart"
                                                aria-label="Thêm vào giỏ"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faShoppingCart}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </AnimationWrapper>
                        ))}
                </div>
                {data?.total > 8 && (
                    <AnimationWrapper type="zoom-in" delay={100}>
                        <div className="SmartLockPage-SeeMore text-center mt-6">
                            <Link
                                to="/khoa-cua-thong-minh"
                                className="SLP-moreBtn"
                            >
                                Xem thêm &rarr;
                            </Link>
                        </div>
                    </AnimationWrapper>
                )}
            </div>
        </div>
    );
}

export default SmartLockPage;
