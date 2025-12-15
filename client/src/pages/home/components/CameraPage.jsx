import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/SmartLockPage.css";
import AnimationWrapper from "./SharedEffect/AnimationWrapper";

const products = [
{
    img: "/homepage/camera/cameraimou01.png",
    title: "Imou IPC-C22SP (Cue 2E)",
    old: "790.000 đ",
    price: "395.000 đ",
    to: "/camera-ipc-c22sp",
},
{
    img: "/homepage/camera/cameraimou02.png",
    title: "Imou IPC-A32EP (Ranger 2, 3MP)",
    old: "810.000 đ",
    price: "405.000 đ",
    to: "/camera-ipc-a32ep",
},
{
    img: "/homepage/camera/cameraimou03.png",
    title: "Imou IPC-C22FP-C (Versa)",
    old: "950.000 đ",
    price: "650.000 đ",
    to: "/camera-ipc-c22fp-c",
},
{
    img: "/homepage/camera/camera-ezviz01.png",
    title: "Camera Ezviz H1C 2MP",
    old: "768.000 đ",
    price: "400.000 đ",
    to: "/camera-ezviz-h1c",
},
{
    img: "/homepage/camera/camera-ezviz02.png",
    title: "Camera Ezviz C6N Pro 2K (3MP)",
    old: "768.000 đ",
    price: "450.000 đ",
    to: "/camera-ezviz-c6n",
},
{
    img: "/homepage/camera/camera-ezviz03.png",
    title: "Camera Ezviz H6C Pro 2K (3MP)",
    old: "768.000 đ",
    price: "450.000 đ",
    to: "/camera-ezviz-h6c",
},
{
    img: "/homepage/camera/camera-dahua01.png",
    title: "Camera Dahua DH-IPC-T1E29-A-IL (2MP)",
    old: "1.999.000 đ",
    price: "619.000 đ",
    to: "/camera-dahua-t1e29",
},
{
    img: "/homepage/camera/camera-dahua02.png",
    title: "Camera Dahua DH-IPC-HFW2841T-ZAS (8MP)",
    old: "7.990.000 đ",
    price: "3.697.000 đ",
    to: "/camera-dahua-hfw2841",
},
];

function CameraPage() {
return (
    <div className="Container-SmartLockPage w-full">
    <div className="SmartLockPage-Content max-w-[1200px] mx-auto px-4 py-6">
        <AnimationWrapper type="fade" delay={0}>
        <div className="SmartLockPage-Content_Cate flex flex-wrap items-center gap-4">
            <div className="subject-pill border-2 px-4 py-2 rounded-md">
            <h2 className="text-lg md:text-xl font-bold">CAMERA GIÁM SÁT</h2>
            </div>

            <div>
            <Link to="/camera-wifi-imou" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-semibold">CAMERA WIFI IMOU</h2>
            </Link>
            </div>

            <div className="divider">|</div>

            <div>
            <Link to="/camera-wifi-ezviz" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-medium">CAMERA WIFI EZVIZ</h2>
            </Link>
            </div>

            <div className="divider">|</div>

            <div>
            <Link to="/camera-dahua" className="block px-4 py-2">
                <h2 className="text-base md:text-lg font-medium">CAMERA DAHUA</h2>
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
            <Link to="/camera-giam-sat" className="SLP-moreBtn">
            Xem thêm &rarr;
            </Link>
        </div>
        </AnimationWrapper>
    </div>
    </div>
);
}

export default CameraPage;
