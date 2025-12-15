import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function CompanyVideo() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <section className="w-full py-20    ">
      <div className="container mx-auto px-6 text-center bg-white rounded-2xl shadow-sm py-10">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
        >
          Video giới thiệu công ty
        </h2>

        <div
          data-aos="zoom-in"
          className="relative aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
        >
          <video
            controls
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source
              src="/Videos/ssfrom.com--1-Minute-Timer-Pink-Checkered-Countdown-Soft-Bell.mp4"
              type="video/mp4"
            />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>

        <p
          data-aos="fade-up"
          className="mt-8 text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Video này giới thiệu về hành trình phát triển, giá trị cốt lõi và đội
          ngũ đứng sau các giải pháp công nghệ của chúng tôi — những con người
          luôn nỗ lực không ngừng để mang đến trải nghiệm sống thông minh, an
          toàn và tiện nghi nhất cho mọi gia đình.
        </p>
      </div>
    </section>
  );
}

export default CompanyVideo;
