import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faAngleRight,
faPhone,
faEnvelope,
faLocationDot,
faClock,
faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";
import './css/contact.css';
function Contact() {
return (
<div className="Container-Contact">
    <div className="ProductSmartLock-BannerPage">
        <img src="/productpage/banner-page/banner-pages.png" alt="" />
    </div>
    <div className="ProductSmartLock-Content">
        <nav className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base" aria-label="Breadcrumb">
        <Link to="/" className="PSL-crumb">
            <span>Trang Chủ</span>
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="PSL-sep" />
        <Link to="/lien-he" className="PSL-crumb PSL-crumb-active">
            <span>Liên hệ</span>
        </Link>
        </nav>
    </div>
    <div className="box-contact"> 
        <section className="Contact-Intro">
            <h1>Liên hệ Secure Smart Home</h1>
            <p>
            Cần tư vấn khóa thông minh, camera, cửa nhựa composite hay phụ kiện?
            Điền form hoặc gọi trực tiếp – chúng tôi phản hồi trong giờ làm việc.
            </p>
        </section>

        <section className="Contact-Grid">
            <aside className="Contact-Card Contact-Info">
            <h2>Thông tin liên hệ</h2>

            <div className="CI-item">
                <div className="CI-icon">
                <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="CI-text">
                <strong>Địa chỉ:</strong>
                <span> 123 Tô Kí, Quận 12, TP.HCM</span>
                </div>
            </div>

            <div className="CI-item">
                <div className="CI-icon">
                <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="CI-text">
                <strong>Hotline:</strong>
                <a href="tel:0900000000"> 0900 000 000</a>
                </div>
            </div>

            <div className="CI-item">
                <div className="CI-icon">
                <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="CI-text">
                <strong>Email:</strong>
                <a href="#"> securesmarthome@gmail.com</a>
                </div>
            </div>

            <div className="CI-item">
                <div className="CI-icon">
                <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="CI-text">
                <strong>Giờ làm việc:</strong>
                <span> Thứ 2 – Thứ 7: 08:30 – 18:00</span>
                </div>
            </div>

            <div className="CI-social">
                <a href="#" aria-label="Facebook" className="CI-social-btn">
                <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" aria-label="YouTube" className="CI-social-btn">
                <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#" aria-label="TikTok" className="CI-social-btn">
                <FontAwesomeIcon icon={faTiktok} />
                </a>
            </div>

            <div className="CI-note">
                * Gọi trước khi đến để được phục vụ nhanh hơn.
            </div>
            </aside>

            <div className="Contact-Card Contact-Form">
                <h2>Gửi yêu cầu tư vấn</h2>
                <form>
                    <div className="CF-row">
                    <div className="CF-field">
                        <label htmlFor="fullname">Họ & tên</label>
                        <input id="fullname" type="text" placeholder="VD: Nguyễn Văn A" />
                    </div>
                    <div className="CF-field">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input id="phone" type="tel" placeholder="VD: 09xx xxx xxx" />
                    </div>
                    </div>

                    <div className="CF-row">
                    <div className="CF-field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="CF-field">
                        <label htmlFor="topic">Nhu cầu</label>
                        <select id="topic" defaultValue="">
                        <option value="" disabled>Chọn hạng mục</option>
                        <option>Khóa cửa thông minh</option>
                        <option>Camera giám sát</option>
                        <option>Cửa nhựa composite</option>
                        <option>Phụ kiện</option>
                        <option>Khác</option>
                        </select>
                    </div>
                    </div>

                    <div className="CF-field">
                    <label htmlFor="message">Nội dung</label>
                    <textarea id="message" rows={5} placeholder="Mô tả ngắn gọn nhu cầu của bạn…" />
                    </div>

                    <button type="button" className="CF-submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>Gửi yêu cầu</span>
                    </button>
                </form>
            </div>
        </section>

        <section className="Contact-FAQ">
            <h2>Câu hỏi thường gặp</h2>
            <details>
            <summary>Thời gian lắp đặt trong bao lâu?</summary>
            <p>Thường từ 1–2 giờ cho khóa cửa, 2–4 giờ cho bộ camera 2–4 mắt.</p>
            </details>
            <details>
            <summary>Bảo hành như thế nào?</summary>
            <p>Bảo hành 12–24 tháng tùy hãng, hỗ trợ kỹ thuật trong giờ làm việc.</p>
            </details>
            <details>
            <summary>Có khảo sát tận nơi không?</summary>
            <p>Có, vui lòng để lại thông tin – chúng tôi sẽ hẹn lịch khảo sát.</p>
            </details>
        </section>

        <section className="Contact-CTA">
            <div className="CTA-inner">
            <h3>Sẵn sàng nâng cấp ngôi nhà của bạn?</h3>
            <p>Gọi ngay để được kỹ thuật viên tư vấn giải pháp phù hợp nhất.</p>
            <a className="CTA-btn" href="tel:0900000000">Gọi 0900 000 000</a>
            </div>
        </section>
    </div>
</div>
);
}

export default Contact;
