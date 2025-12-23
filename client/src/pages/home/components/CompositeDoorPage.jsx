import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/SmartLockPage.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";
import { DOMAIN, formatPrice } from "../../../helper/helper";
import useFetch from "../../../customHooks/useFetch";

function CompositeDoorPage() {
    const { data, loading } = useFetch("category/cua nhua composite", 8);
    return (
        <div className="Container-SmartLockPage w-full">
            <div className="SmartLockPage-Content max-w-[1200px] mx-auto px-4 py-6">
                <AnimationWrapper type="fade" delay={0}>
                    <div className="SmartLockPage-Content_Cate flex flex-wrap items-center gap-4">
                        <div className="subject-pill border-2 px-4 py-2 rounded-md">
                            <h2 className="text-lg md:text-xl font-bold">
                                CỬA NHỰA COMPOSITE
                            </h2>
                        </div>

                        <div>
                            <Link to="/cua-phang" className="block px-4 py-2">
                                <h2 className="text-base md:text-lg font-semibold">
                                    CỬA PHẲNG
                                </h2>
                            </Link>
                        </div>

                        <div className="divider">|</div>

                        <div>
                            <Link
                                to="/cua-nep-kim-loai"
                                className="block px-4 py-2"
                            >
                                <h2 className="text-base md:text-lg font-medium">
                                    CỬA NẸP KIM LOẠI
                                </h2>
                            </Link>
                        </div>

                        <div className="divider">|</div>

                        <div>
                            <Link to="/cua-o-kinh" className="block px-4 py-2">
                                <h2 className="text-base md:text-lg font-medium">
                                    CỬA Ô KÍNH
                                </h2>
                            </Link>
                        </div>
                    </div>
                </AnimationWrapper>

                <div className="SmartLockPage-Content_Products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
                    {data?.products?.length > 0 &&
                        !loading &&
                        data?.products?.map((p, i) => (
                            <AnimationWrapper
                                key={p.id}
                                type="fade-up"
                                delay={i * 120}
                            >
                                <div className="SLP-card">
                                    <div className="SLP-thumb">
                                        <img
                                            src={`${DOMAIN + p.anh_dai_dien}`}
                                            alt={p.ten_san_pham}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="SLP-info">
                                        <Link to={p.to} className="SLP-title">
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
                                to="/cua-nhua-composite"
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

export default CompositeDoorPage;
