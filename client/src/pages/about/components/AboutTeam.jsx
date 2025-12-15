import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/IntroducingTheCompany.css";
import "./css/AboutTeam.css";

function AboutTeam() {
  useEffect(() => {
    AOS.init({
      duration: 900,  // tốc độ animation
      once: true,     // chỉ chạy 1 lần
      offset: 100,    // khoảng cách kích hoạt
      easing: "ease-out",
    });
  }, []);

  const Avatar = ({ name = "", role = "" }) => {
    const initial = (name?.trim?.()[0] || "?").toUpperCase();
    return (
      <div className="text-center w-full">
        <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
          {initial}
        </div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    );
  };

  const members = [
    { name: "Nguyễn Văn A", role: "CEO" },
    { name: "Nguyễn Văn B", role: "CTO" },
    { name: "Nguyễn Văn C", role: "CMO" },
    { name: "Nguyễn Văn D", role: "COO" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container py-20 mx-auto px-4">
        <h2
          data-aos="fade-up"
          className="text_top text-center text-3xl font-bold md:text-4xl"
        >
          Đội ngũ của chúng tôi
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-amber-500 hover:bg-amber-50"
            >
              <Avatar name={m.name} role={m.role} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeam;
