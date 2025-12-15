import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./css/HeroSection.css";

function HeroSection() {
const bannerImages = [
    "/homepage/BannerHome/LA_0001.JPG",
    "/homepage/BannerHome/LA_0002.JPG",
    "/homepage/BannerHome/LA_0003.JPG",
    "/homepage/BannerHome/LA_0004.JPG",
    "/homepage/BannerHome/LA_0005.JPG",
];

return (
    <div className="Container-HeroSection">
        <div className="HeroSection-banner_background">
            <img src="/homepage/background-banner/background-banner.jpg" alt="" />
        </div>
        <div className="HeroSection-banner_slider">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="HeroSlider"
            >
                {bannerImages.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt={`banner-${index}`} className="w-full h-auto object-cover" />
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <div className="HeroSection-banner_content">
            <h2>AN TOÀN MỖI NGÀY - KHỞI ĐẦU HẠNH PHÚC CÙNG NEXA HOME</h2>
            <p>Hãy để ngôi nhà của bạn trở thành nơi đáng sống nhất – với những giải pháp thông minh và tinh tế từ NexaHome!</p>
            <input type="text"  placeholder="Số điện thoại"/>
            <button className="submit-advise">Đăng kí tư vấn</button>
        </div>
    
    </div>
);
}

export default HeroSection;
