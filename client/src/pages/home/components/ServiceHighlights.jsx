import React from "react";
import "./css/ServiceHighlights.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";

const HIGHLIGHTS = [
    {
        id: "warranty",
        title: "Bảo hành chính hãng",
        img: "/homepage/service/bao-hanh-chinh-hang.png",
        alt: "Bảo hành chính hãng",
    },
    {
        id: "cod",
        title: "Ship COD toàn quốc",
        img: "/homepage/service/ship-cod-toan-quoc.png",
        alt: "Ship COD toàn quốc",
    },
    {
        id: "exchange",
        title: "Đổi 1-1 trong 30 ngày",
        img: "/homepage/service/doi1-1.png",
        alt: "Đổi 1-1 trong 30 ngày",
    },
    {
        id: "install",
        title: "Lắp đặt chuyên nghiệp",
        img: "/homepage/service/lap-dat-chuyen-nghiep.png",
        alt: "Lắp đặt chuyên nghiệp",
    },
];

function ServiceHighlights() {
    return (
        <div className="Container-ServiceHighlights flex flex-col items-center gap-6">
            <AnimationWrapper type="fade" delay={0}>
                <div className="ServiceHighlights-Content text-center">
                    <h2 className="font-bold text-xl">
                        Ưu đãi & Cam kết dịch vụ
                    </h2>
                </div>
            </AnimationWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
                {HIGHLIGHTS.map((item, i) => (
                    <AnimationWrapper
                        key={item.id}
                        type="fade-up"
                        delay={i * 120}
                    >
                        <div className="ServiceHighlights-card">
                            <div className="thumb">
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    loading="lazy"
                                />
                            </div>
                            <p className="title">{item.title}</p>
                        </div>
                    </AnimationWrapper>
                ))}
            </div>
        </div>
    );
}

export default ServiceHighlights;
