import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookF,
    faYoutube,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "./css/Footer.css";

function Footer() {
    return (
        <div className="ConTaiNer-Footer w-full bg-black text-white">
            <div className="overall-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-10">
                <div className="overall-content_company space-y-3">
                    <h2 className="content-company_title-company text-lg font-semibold">
                        NEXA HOME – AN TOÀN & ĐẲNG CẤP CHUẨN HÀN
                    </h2>
                    <div className="content-company space-y-2 text-sm">
                        <div className="content-company_itemEmail flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>nexahome@gmail.com</span>
                        </div>
                        <div className="content-company_itemPhone flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} />
                            <span>0123 456 789</span>
                        </div>
                        <div className="content-company_itemPhone flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} />
                            <span>0098 765 432</span>
                        </div>
                        <div className="content-company_itemMaps flex items-center gap-2">
                            <FontAwesomeIcon icon={faMapLocationDot} />
                            <span>123 Đường ABC, xxx, xxx, TP.HCM</span>
                        </div>
                    </div>
                </div>
                <div className="overall-Footer_categories">
                    <p className="categories-title text-lg font-semibold mb-2">
                        Danh mục chúng tôi
                    </p>
                    <ul className="list-category space-y-1 text-sm">
                        <li>
                            <Link to="/ve-chung-toi">Về chúng tôi</Link>
                        </li>
                        <li>
                            <Link to="/du-an-thuc-te">Dự án thực tế</Link>
                        </li>
                        <li>
                            <Link to="/huong-dan-su-dung">
                                Hướng dẫn sử dụng
                            </Link>
                        </li>
                        <li>
                            <Link to="/lien-he">Liên hệ với chúng tôi</Link>
                        </li>
                    </ul>
                </div>
                <div className="overall-Footer_policy grid grid-cols-1 gap-4">
                    <div>
                        <p className="policy-title text-lg font-semibold mb-2">
                            Chính sách
                        </p>
                        <ul className="list-policy space-y-1 text-sm">
                            <li>
                                <Link to="/chinh-sach-bao-mat">
                                    Chính sách bảo mật
                                </Link>
                            </li>
                            <li>
                                <Link to="/chinh-sach-bao-hanh">
                                    Chính sách bảo hành
                                </Link>
                            </li>
                            <li>
                                <Link to="/chinh-sach-giao-hang">
                                    Chính sách giao hàng
                                </Link>
                            </li>
                            <li>
                                <Link to="/chinh-sach-doi-tra-hang">
                                    Chính sách đổi trả hàng
                                </Link>
                            </li>
                            <li>
                                <Link to="/huong-dan-mua-hang">
                                    Hướng dẫn mua hàng
                                </Link>
                            </li>
                            <li>
                                <Link to="/hinh-thuc-thanh-toan">
                                    Hình thức thanh toán
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="over-Footer_social-links flex flex-col items-center gap-4">
                    <div className="logo-Footer">
                        <img
                            src="/nexahome.png"
                            alt="Logo footer"
                            className="h-14"
                        />
                    </div>
                    <div className="social-links_item flex gap-4 text-xl">
                        <div className="item-Facebook text-[#3b5998]">
                            <a
                                href="https://www.facebook.com/Lequoctinh2512/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                        </div>
                        <div className="item-TikTok text-black">
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                        </div>
                        <div className="item-YouTube text-[#ff0000]">
                            <a
                                href="https://www.youtube.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </div>
                        <div className="item-Email text-[#b88e2f]">
                            <Link to="/lien-he">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-4">
                <p className="text-sm text-gray-400">
                    © 2025 - Bản quyền thuộc về securesmarthome.com
                </p>
            </div>
        </div>
    );
}

export default Footer;
