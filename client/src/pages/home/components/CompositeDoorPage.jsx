import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/SmartLockPage.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";

const products = [
{
    img: "/homepage/door/cua-phang01.png",
    title: "Cửa nhựa Composite PIMA phẳng PFS-1P0-S14",
    old: "4.548.000 đ",
    price: "3.411.049 đ",
    to: "/cua-phang",
},
{
    img: "/homepage/door/cua-phang02.png",
    title: "Cửa nhựa Composite PIMA phẳng PFS-1P0-W20",
    old: "4.5480.000 đ",
    price: "3.411.000 đ",
    to: "/cua-phang",
},
{
    img: "/homepage/door/cua-phang03.png",
    title: "CỬA NHỰA COMPOSITE PIMA PHẲNG PFS-1P0-W22",
    old: "4.548.000 đ",
    price: "3.411.000 đ",
    to: "/cua-nep-kim-loai",
},
{
    img: "/homepage/door/cua-o-kimh01.png",
    title: "Cửa nhựa Composite PIMA ô kính PFS-1K1-W23",
    old: "4.750.000 đ",
    price: "3.562.000 đ",
    to: "/cua-nep-kim-loai",
},
{
    img: "/homepage/door/cua-o-kinh02.png",
    title: "Cửa nhựa Composite PIMA ô kính PFS-1K2-W04",
    old: "4.750.000 đ",
    price: "3.562.000 đ",
    to: "/cua-o-kinh",
},
{
    img: "/homepage/door/cua-nep-kim-loai01.png",
    title: "CỬA NHỰA COMPOSITE PFS-AN4-S19",
    old: "8.141.000 đ",
    price: "5.890.000 đ",
    to: "/cua-chi-noi",
},
{
    img: "/homepage/door/cua-nep-kim-loai02.png",
    title: "Cửa nhựa Composite PIMA nẹp kim loại PFS-1N3-S20",
    old: "5.358.000 đ",
    price: "4.010.000 đ",
    to: "/cua-hut-huynh",
},
{
    img: "/homepage/door/cua-mep-kim-loai03.png",
    title: "Cửa nhựa Composite PIMA nẹp kim loại PFS-1N3-W33",
    old: "5.358.000 đ",
    price: "4.010.000 đ",
    to: "/cua-vom",
},
];

function CompositeDoorPage() {
return (
    <div className="Container-SmartLockPage w-full">
    <div className="SmartLockPage-Content max-w-[1200px] mx-auto px-4 py-6">
        <AnimationWrapper type="fade" delay={0}>
        <div className="SmartLockPage-Content_Cate flex flex-wrap items-center gap-4">
            <div className="subject-pill border-2 px-4 py-2 rounded-md">
            <h2 className="text-lg md:text-xl font-bold">CỬA NHỰA COMPOSITE</h2>
            </div>

            <div>
            <Link to="/cua-phang" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-semibold">CỬA PHẲNG</h2>
            </Link>
            </div>

            <div className="divider">|</div>

            <div>
            <Link to="/cua-nep-kim-loai" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-medium">CỬA NẸP KIM LOẠI</h2>
            </Link>
            </div>

            <div className="divider">|</div>

            <div>
            <Link to="/cua-o-kinh" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-medium">CỬA Ô KÍNH</h2>
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
                <Link to={p.to} className="SLP-title">{p.title}</Link>

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
            <Link to="/cua-nhua-composite" className="SLP-moreBtn">
            Xem thêm &rarr;
            </Link>
        </div>
        </AnimationWrapper>
    </div>
    </div>
);
}

export default CompositeDoorPage;
