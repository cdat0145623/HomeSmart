import React from "react";
import { Link } from "react-router-dom";
import "./css/ProductCatalog.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";

function ProductCatalog() {
    const cards = [
        {
            to: "/khoa-cua-thong-minh",
            img: "/homepage/categories/smart-door.png",
            alt: "Khóa cửa thông minh",
            title: "Khóa cửa thông minh",
        },
        {
            to: "/cua-nhua-composite",
            img: "/homepage/categories/door.png",
            alt: "Cửa nhựa composite",
            title: "Cửa nhựa composite",
        },
        {
            to: "/camera-giam-sat",
            img: "/homepage/categories/cctv.png",
            alt: "Camera giám sát",
            title: "Camera giám sát",
        },
        {
            to: "/phu-kien",
            img: "/homepage/categories/setting.png",
            alt: "Phụ kiện",
            title: "Phụ kiện",
        },
    ];

    return (
        <div className="Container-ProductCatalog flex flex-col items-center gap-6">
            <AnimationWrapper type="fade" delay={0}>
                <div className="ProductCatalog-Content text-center">
                    <h2 className="font-bold text-xl">Danh mục sản phẩm</h2>
                </div>
            </AnimationWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
                {cards.map((c, i) => (
                    <AnimationWrapper key={c.to} type="fade-up" delay={i * 120}>
                        <Link
                            to={c.to}
                            className="ProductCatalog-card"
                            aria-label={`Xem danh mục ${c.title}`}
                        >
                            <div className="thumb">
                                <img src={c.img} alt={c.alt} />
                            </div>
                            <p className="title">{c.title}</p>
                        </Link>
                    </AnimationWrapper>
                ))}
            </div>
        </div>
    );
}

export default ProductCatalog;
