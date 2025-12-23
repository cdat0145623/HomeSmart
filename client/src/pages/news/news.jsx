import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faCalendarDays,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./css/news.css";
import httpRequest from "../../utils/httpRequest";
import { DOMAIN } from "../../helper/helper";

function News() {
    const [newsList, setNewsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 7; // Số bài trên 1 trang

    //Lấy 3 bài viết mới nhất ngay sau khi có newsList
    const latestPosts = [...newsList]
        .sort((a, b) => new Date(b.ngay_tao) - new Date(a.ngay_tao))
        .slice(0, 3);

    useEffect(() => {
        const fetchNews = async () => {
            const res = await httpRequest.get("/users/news", {
                withCredentials: true,
            });
            // console.log("resss nes::", res);
            setNewsList(res.data?.rows);
        };
        fetchNews();
    }, []);

    // ---------------- PAGINATION ----------------
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = newsList.slice(indexOfFirstPost, indexOfLastPost);

    const featuredPost = currentPosts.length > 0 ? currentPosts[0] : null;
    const otherPosts = currentPosts.slice(1);

    const totalPages = Math.ceil(newsList.length / postsPerPage);

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="Container-News">
            {/* Banner */}
            <div className="ProductSmartLock-BannerPage">
                <img
                    src="/productpage/banner-page/banner-pages.png"
                    alt="Banner"
                />
            </div>

            {/* Breadcrumb */}
            <div className="ProductSmartLock-Content max-w-[1200px] mt-8 md:mx-5 sm:mx-5 max-sm:mx-3 lg:mx-auto">
                <nav className="flex items-center gap-2 sm:gap-3 text-sm sm:text-sm">
                    <Link to="/" className="PSL-crumb">
                        <span>Trang Chủ</span>
                    </Link>
                    <FontAwesomeIcon icon={faAngleRight} className="PSL-sep" />
                    <Link to="/tin-tuc" className="PSL-crumb PSL-crumb-active">
                        <span className="sm:font-semibold sm:text-[#c29b2b]">
                            Tin Tức
                        </span>
                    </Link>
                </nav>
            </div>

            {/* Nội dung */}
            <div className="new-contai">
                <div className="News-Content">
                    <section className="News-Main">
                        <h1>Tin tức & Bài viết mới nhất</h1>

                        {/* FEATURED POST */}
                        {featuredPost && (
                            <article className="News-Featured modern">
                                <div className="Featured-Image">
                                    <img
                                        src={`${
                                            DOMAIN + featuredPost.anh_dai_dien
                                        }`}
                                        alt={featuredPost.tieu_de}
                                    />
                                </div>

                                <div className="Featured-Body">
                                    <span className="Featured-Category">
                                        Tin nổi bật
                                    </span>

                                    <h2>
                                        <Link
                                            to={`/tin-tuc/${featuredPost.duong_dan_ten_seo}`}
                                        >
                                            {featuredPost.tieu_de}
                                        </Link>
                                    </h2>

                                    <div className="News-Meta">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                            />{" "}
                                            {new Date(
                                                featuredPost.ngay_tao
                                            ).toLocaleDateString("vi-VN")}
                                        </span>
                                        <span>
                                            <FontAwesomeIcon icon={faUser} />{" "}
                                            Admin
                                        </span>
                                    </div>

                                    <p>{featuredPost.tom_tat}</p>

                                    <Link
                                        to={`/tin-tuc/${featuredPost.duong_dan_ten_seo}`}
                                        className="Featured-ReadMore"
                                    >
                                        Đọc bài viết →
                                    </Link>
                                </div>
                            </article>
                        )}

                        {/* GRID POSTS */}
                        <div className="News-Grid modern">
                            {otherPosts.map((item) => (
                                <article
                                    key={item.id}
                                    className="News-Card modern"
                                >
                                    <div className="News-Image ">
                                        <img
                                            src={`${
                                                DOMAIN + item.anh_dai_dien
                                            }`}
                                            alt={item.tieu_de}
                                        />
                                    </div>

                                    <div className="News-Body">
                                        <h2 className="line-clamp-2 min-h-[50px]">
                                            <Link
                                                to={`/tin-tuc/${item.duong_dan_ten_seo}`}
                                            >
                                                {item.tieu_de}
                                            </Link>
                                        </h2>

                                        <div className="News-Meta">
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                />{" "}
                                                {new Date(
                                                    item.ngay_tao
                                                ).toLocaleDateString("vi-VN")}
                                            </span>
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                />{" "}
                                                Admin
                                            </span>
                                        </div>

                                        <p className="line-clamp-3 min-h-[72px]">
                                            {item.tom_tat}
                                        </p>

                                        <Link
                                            to={`/tin-tuc/${item.duong_dan_ten_seo}`}
                                            className="News-ReadMore"
                                        >
                                            Đọc thêm →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="Pagination">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ← Trước
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={
                                        currentPage === index + 1
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => changePage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Sau →
                            </button>
                        </div>
                    </section>

                    {/* Sidebar */}
                    {/* <aside className="News-Sidebar">
            <div className="Sidebar-Box">
              <h3>Bài viết nổi bật</h3>
                <ul>
                {latestPosts.map(post => (
                  <li key={post.id}>
                    <Link to={`/tin-tuc/${post.duong_dan_ten_seo}`}>
                      {post.tieu_de}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="Sidebar-Box">
              <h3>Đăng ký nhận tin</h3>
              <p>Nhận tin tức mới nhất về sản phẩm & khuyến mãi.</p>
              <form>
                <input type="email" placeholder="Nhập email của bạn" />
                <button type="submit">Đăng ký</button>
              </form>
            </div>
          </aside> */}
                </div>
            </div>

            {/* CTA */}
            <section className="Contact-CTA">
                <div className="CTA-inner">
                    <h3>Luôn cập nhật công nghệ mới nhất?</h3>
                    <p>
                        Theo dõi chúng tôi để không bỏ lỡ xu hướng khóa cửa
                        thông minh.
                    </p>
                    <a className="CTA-btn" href="tel:0900000000">
                        Liên hệ tư vấn ngay
                    </a>
                </div>
            </section>
        </div>
    );
}

export default News;
