import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/SmartLockPage.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";

const products = [
{
    img: "/homepage/smartlock/boshms01.jpg",
    title: "Khóa cửa điện tử Bosch FU6 Plus",
    old: "14.500.900 đ",
    price: "9.300.000 đ",
    to: "/khoa-cua-huyndai",
},
{
    img: "/homepage/smartlock/boshms02.jpg",
    title: "Khóa cửa điện tử Bosch ID60",
    old: "11.500.900 đ",
    price: "8.900.000 đ",
    to: "/khoa-cua-huyndai",
},
{
    img: "/homepage/smartlock/boshms03.jpg",
    title: "Khóa cửa điện tử BOSCH EL800VF DE",
    old: "20.500.900 đ",
    price: "19.000.000 đ",
    to: "/khoa-cua-huyndai",
},
{
    img: "/homepage/smartlock/boshms04.jpg",
    title: "Khóa cửa điện tử BOSCH FU8 PLUS",
    old: "16.500.900 đ",
    price: "10.100.000 đ",
    to: "/khoa-cua-huyndai",
},
{
    img: "/homepage/smartlock/huyndaims01.png",
    title: "Khóa cửa gỗ điện tử Hyundai HY-SLA808F BROWN",
    old: "8.990.900 đ",
    price: "7.600.000 đ",
    to: "/khoa-cua-huyndai",
},
{
    img: "/homepage/smartlock/huyndaims02.png",
    title: "Khóa cửa gỗ điện tử Hyundai HY-SLA808F BLACK",
    old: "9.990.000 đ",
    price: "8.490.000 đ",
    to: "/khoa-cua-huyndai",
},
{
    img: "/homepage/smartlock/hafelems01.png",
    title: "Khóa Điện Tử EL7500 Hafele 912.05.728",
    old: "8.129.000 đ",
    price: "6.100.000 đ",
    to: "/khoa-cua-huyndai",
},
{
    img: "/homepage/smartlock/hafelems02.png",
    title: "Khóa điện tử DL6000 Hafele 912.20.581",
    old: "5.764.000 đ",
    price: "4.300.000 đ",
    to: "/khoa-cua-huyndai",
},
];

function SmartLockPage() {
return (
    <div className="Container-SmartLockPage w-full">
    <div className="SmartLockPage-Content max-w-[1200px] mx-auto px-4 py-6">
        <AnimationWrapper type="fade" delay={0}>
        <div className="SmartLockPage-Content_Cate flex flex-wrap items-center gap-4">
            <div className="subject-pill border-2 px-4 py-2 rounded-md">
            <h2 className="text-lg md:text-xl font-bold">KHÓA CỬA THÔNG MINH</h2>
            </div>

            <div>
            <Link to="/khoa-van-tay-bosh" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-semibold">KHÓA VÂN TAY BOSH</h2>
            </Link>
            </div>

            <div className="divider">|</div>

            <div>
            <Link to="/khoa-cua-huyndai" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-medium">KHÓA CỬA HUYNDAI</h2>
            </Link>
            </div>

            <div className="divider">|</div>

            <div>
            <Link to="/khoa-cua-hafele" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-medium">KHÓA CỬA HAFELE</h2>
            </Link>
            </div>
        </div>
        </AnimationWrapper>
        <div className="SmartLockPage-Content_Products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">

        {products.map((p, i) => (
            <AnimationWrapper key={p.title} type="fade-up" delay={i * 120}>
            <div className="SLP-card">
                <div className="SLP-thumb">
                <img src={p.img} alt={p.title} loading="lazy" />
                </div>

                <div className="SLP-info">
                <Link to={p.to} className="SLP-title">
                    {p.title}
                </Link>

                <div className="SLP-prices">
                    <span className="SLP-price-old">{p.old}</span>
                    <span className="SLP-price">{p.price}</span>
                </div>

                <div className="SLP-actions">
                    <button type="button" className="SLP-compare">So sánh</button>
                    <button type="button" className="SLP-cart" aria-label="Thêm vào giỏ">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                </div>
                </div>
            </div>
            </AnimationWrapper>
        ))}
        </div>
        <AnimationWrapper type="zoom-in" delay={100}>
        <div className="SmartLockPage-SeeMore text-center mt-6">
            <Link to="/khoa-cua-thong-minh" className="SLP-moreBtn">
            Xem thêm &rarr;
            </Link>
        </div>
        </AnimationWrapper>
    </div>
    </div>
);
}

export default SmartLockPage;
