import React from "react";
import "./css/PartnerLogos.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
{ src: "/homepage/PartnerLogos/logo_ezviz.jpg", alt: "EZVIZ" },
{ src: "/homepage/PartnerLogos/logo_hikvision.jpg", alt: "Hikvision" },
{ src: "/homepage/PartnerLogos/logo_bosh.jpg", alt: "Bosch" },
{ src: "/homepage/PartnerLogos/logo_dahua.jpg", alt: "Dahua" },
{ src: "/homepage/PartnerLogos/logo_hafele.jpg", alt: "Hafele" },
{ src: "/homepage/PartnerLogos/logo_hubert.jpg", alt: "Hubert" },
{ src: "/homepage/PartnerLogos/logo_hyundai.png", alt: "Hyundai" },
{ src: "/homepage/PartnerLogos/logo_imou.png", alt: "Imou" },
{ src: "/homepage/PartnerLogos/logo_kaadas.jpg", alt: "Kaadas" },
{ src: "/homepage/PartnerLogos/logo_pimadoor.png", alt: "Pimadoor" },
{ src: "/homepage/PartnerLogos/logo_tapo.jpg", alt: "Tapo" },
{ src: "/homepage/PartnerLogos/logo_kassler.jpg", alt: "Kassler" },
];

function PartnerLogos() {
return (
    <div className="Container-PartnerLogos flex flex-col items-center gap-6">
    <AnimationWrapper type="fade" delay={0}>
        <div className="PartnerLogos-Content text-center">
        <h2 className="PartnerLogos-title">Đối tác của chúng tôi</h2>
        <p className="text-dim mt-2">
            Những thương hiệu đồng hành & phân phối sản phẩm
        </p>
        </div>
    </AnimationWrapper>

    <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
        }}
        loop={true}
        className="w-full max-w-6xl"
    >
        {logos.map((logo, index) => (
        <SwiperSlide key={index}>
            <AnimationWrapper type="zoom-in" delay={index * 100}>
            <div className="PartnerLogos-card">
                <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
            </AnimationWrapper>
        </SwiperSlide>
        ))}
    </Swiper>
    </div>
);
}

export default PartnerLogos;
