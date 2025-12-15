// import React from "react";
// import BannerAbout from "../about/components/BannerAbout"
// import IntroducingTheCompany from "./components/IntroducingTheCompany"; 
// import AboutTeam from './components/AboutTeam';

// function About() {
//     return(
//         <div className="Container-About">
//             <div className="Container-About_banner">
//                 <BannerAbout />
//             </div>
//             <div className="Container-About_main">
//                 <IntroducingTheCompany />
//                 <AboutTeam/>
//             </div> 
//         </div>
//     );
// }
// export default About;
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PartnerLogos from "../home/components/PartnerLogos";
import "./css/About.css";

export default function About() {
return (
    <div className="nh-about">
    <div className="ProductSmartLock-BannerPage">
        <img src="/productpage/banner-page/banner-pages.png" alt="NexaHome banner" />
    </div>

    <div className="ProductSmartLock-Content">
        <nav className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base" aria-label="Breadcrumb">
        <Link to="/" className="PSL-crumb"><span>Trang chủ</span></Link>
        <FontAwesomeIcon icon={faAngleRight} className="PSL-sep" />
        <span className="PSL-crumb PSL-crumb-active">Về chúng tôi</span>
        </nav>
    </div>

    <section className="nh-about__container">
        <div className="nh-card nh-p">
        <h1 className="nh-h2">NexaHome – Giải pháp nhà thông minh cho mọi gia đình</h1>
        <p className="nh-lead">
            Chúng tôi mang đến trải nghiệm sống an toàn – tiện nghi – tối giản với hệ sinh thái thiết bị đồng bộ,
            dễ dùng và bền bỉ theo thời gian.
        </p>
        <ul className="nh-list mt-2">
            <li>Thiết kế giải pháp theo không gian & ngân sách thực tế.</li>
            <li>Thi công chuẩn – bảo hành nhanh – bảo trì tận nơi.</li>
            <li>Hỗ trợ kỹ thuật 24/7, dễ dàng mở rộng nâng cấp.</li>
        </ul>
        </div>
    </section>


    <section className="nh-about__container">
        <div className="nh-tiles">
        <div className="nh-tile">
            <h3 className="nh-tile__title">Khóa cửa thông minh</h3>
            <p className="nh-tile__desc">An toàn đa lớp, mở cửa linh hoạt, quản trị từ xa.</p>
        </div>
        <div className="nh-tile">
            <h3 className="nh-tile__title">Camera giám sát</h3>
            <p className="nh-tile__desc">Hình ảnh rõ nét, cảnh báo thông minh, lưu trữ bảo mật.</p>
        </div>
        <div className="nh-tile">
            <h3 className="nh-tile__title">Cửa nhựa Composite</h3>
            <p className="nh-tile__desc">Chống ẩm, cách âm tốt, thẩm mỹ cho mọi phong cách.</p>
        </div>
        <div className="nh-tile">
            <h3 className="nh-tile__title">Hệ sinh thái phụ kiện</h3>
            <p className="nh-tile__desc">Đồng bộ – bền bỉ – dễ thay thế và nâng cấp.</p>
        </div>
        </div>
    </section>

    <section className="nh-about__container nh-card nh-p">
        <h2 className="nh-h2">Cam kết dịch vụ</h2>
        <div className="nh-bullets">
        <div className="nh-bullets__item">
            <span className="nh-badge">01</span>
            <div>
            <div className="nh-bullet-title">Khảo sát & tư vấn miễn phí</div>
            <div className="nh-muted">Đề xuất cấu hình tối ưu trong 24–48h.</div>
            </div>
        </div>
        <div className="nh-bullets__item">
            <span className="nh-badge">02</span>
            <div>
            <div className="nh-bullet-title">Thi công tiêu chuẩn</div>
            <div className="nh-muted">An toàn – gọn gàng – đúng tiến độ.</div>
            </div>
        </div>
        <div className="nh-bullets__item">
            <span className="nh-badge">03</span>
            <div>
            <div className="nh-bullet-title">Bảo hành – bảo trì</div>
            <div className="nh-muted">Phản hồi nhanh, thay thế linh kiện chính hãng.</div>
            </div>
        </div>
        <div className="nh-bullets__item">
            <span className="nh-badge">04</span>
            <div>
            <div className="nh-bullet-title">Hỗ trợ 24/7</div>
            <div className="nh-muted">Kết nối kỹ thuật từ xa & tại chỗ khi cần.</div>
            </div>
        </div>
        </div>
    </section>

    <section className="nh-about__container nh-grid-2">
        <div className="nh-card nh-p">
        <h2 className="nh-h2">Đội ngũ kỹ thuật</h2>
        <p className="nh-muted">Tư vấn – thiết kế – lắp đặt – hướng dẫn sử dụng – bảo hành định kỳ.</p>
        <ul className="nh-list">
            <li>Chứng chỉ hãng: Bosch, Hafele, Hikvision, EZVIZ…</li>
            <li>Quy trình thi công an toàn – gọn gàng – đúng tiến độ.</li>
            <li>Checklist nghiệm thu & hồ sơ bàn giao chuẩn.</li>
        </ul>
        <Link to="/lien-he" className="btn btn-primary mt-3">Nhận tư vấn miễn phí</Link>
        </div>
        <div className="nh-card nh-p nh-about__photo">
        <img src="/about/team.jpg" alt="NexaHome team" />
        </div>
    </section>

    <section className="nh-about__container nh-cta nh-card nh-p">
        <div>
        <h3 className="nh-h3">Nâng cấp ngôi nhà của bạn ngay hôm nay</h3>
        <p className="nh-muted">Chúng tôi sẽ khảo sát & lên giải pháp tối ưu chỉ trong 24–48h.</p>
        </div>
        <div className="nh-cta__actions">
        <Link to="/lien-he" className="btn btn-primary">Đặt lịch khảo sát</Link>
        <Link to="/khoa-cua-thong-minh" className="btn">Khám phá sản phẩm</Link>
        </div>
    </section>


    <PartnerLogos />
    </div>
);
}
