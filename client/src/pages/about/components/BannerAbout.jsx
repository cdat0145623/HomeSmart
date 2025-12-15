import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./css/BannerAbout.css";

function BannerAbout() {
  return (
    <div className="BannerAbout-Container">
      <div className="ProductSmartLock-BannerPage relative">
        <img
          src="/productpage/banner-page/banner-pages.png"
          alt="Banner giới thiệu"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
            Giới thiệu
          </h2>
        </div>
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
          <Link to="/gioi-thieu" className="PSL-crumb PSL-crumb-active">
            <span>Giới thiệu</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default BannerAbout;
