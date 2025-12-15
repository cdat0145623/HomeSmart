import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/SmartLockPage.css"; 
import AnimationWrapper from "./SharedEffect/AnimationWrapper";

const accessories = [
{
    img: "/homepage/accessories/module-01.png",
    title: "SOLITY SENDER – Module kết nối chuông của màn hình",
    to: "/solity-sender-module-ket-noi-chuong-man-hinh",
    price: "1.100.000 đ",
},
{
    img: "/homepage/accessories/module-02.png",
    title: "SOLITY RECEIVER MODULE RX-710",
    to: "/solity-receiver-module-rx-710",
    price: "700.000 đ",
},
{
    img: "/homepage/accessories/module-03.png",
    title: "SOLITY BLUETOOTH MODULE BL-100",
    to: "/solity-bluetooth-module-bl-100",
    price: "1.000.000 đ",
},
{
    img: "/homepage/accessories/the-nho-dahua.png",
    title: "Thẻ nhớ Dahua 64GB",
    to: "/the-nho-dahua-64gb",
    price: "200.000 đ",
},
{
    img: "/homepage/accessories/the-nho-imou.png",
    title: "Thẻ nhớ Imou 64GB",
    to: "/the-nho-imou-64gb",
    price: "200.000 đ",
},
{
    img: "/homepage/accessories/hop-y-noc.png",
    title: "Hộp INOX bảo vệ khóa điện tử",
    to: "/hop-inox-bao-ve-khoa-dien-tu",
    price: "300.000 đ",
},
];

function AccessoryPage() {
return (
    <div className="Container-SmartLockPage w-full">
    <div className="SmartLockPage-Content max-w-[1200px] mx-auto px-4 py-6">
        <AnimationWrapper type="fade" delay={0}>
        <div className="SmartLockPage-Content_Cate flex flex-wrap items-center gap-4">
            <div className="subject-pill border-2 px-4 py-2 rounded-md">
            <h2 className="text-lg md:text-xl font-bold">PHỤ KIỆN</h2>
            </div>

            <div>
            <Link to="/phu-kien-khoa-van-tay" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-semibold">PHỤ KIỆN KHÓA VÂN TAY</h2>
            </Link>
            </div>

            <div className="divider">|</div>

            <div>
            <Link to="/phu-kien-camera" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-medium">PHỤ KIỆN CAMERA</h2>
            </Link>
            </div>
        </div>
        </AnimationWrapper>

        <div className="SmartLockPage-Content_Products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {accessories.map((p, i) => (
            <AnimationWrapper key={p.title} type="fade-up" delay={i * 120}>
            <div className="SLP-card">
                <div className="SLP-thumb">
                <img src={p.img} alt={p.title} loading="lazy" />
                </div>

                <div className="SLP-info">
                <Link to={p.to} className="SLP-title">{p.title}</Link>

                <div className="SLP-prices">
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
            <Link to="/phu-kien" className="SLP-moreBtn">
            Xem thêm &rarr;
            </Link>
        </div>
        </AnimationWrapper>
    </div>
    </div>
);
}

export default AccessoryPage;
