import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/PartnerSlider.css";

function PartnerSlider() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1280, // laptop nhỏ
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024, // tablet ngang
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768, // tablet dọc
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480, // mobile
        settings: {
          slidesToShow: 1,
          centerMode: false,
          dots: true,
        },
      },
    ],
  };

  const partners = [
    "/BannerAbout/banner.png",
    "/BannerAbout/banner3.jpg",
    "/BannerAbout/banner.png",
    "/BannerAbout/banner3.jpg",
  ];

  return (
    <section className="py-24 bg-white">
      <div
        className="container mx-auto max-w-[1200px] px-6"
        data-aos="fade-up"
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-16">
          Đối tác của chúng tôi
        </h2>

        <Slider {...settings}>
          {partners.map((logo, index) => (
            <div key={index} className="partner-slide">
              <div className="partner-image-wrapper">
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="partner-image"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default PartnerSlider;
