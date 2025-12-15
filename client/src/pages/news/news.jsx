import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import "./css/news.css";

function News() {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Số bài trên 1 trang
 

   //Lấy 3 bài viết mới nhất ngay sau khi có newsList
  const latestPosts = [...newsList]
    .sort((a, b) => new Date(b.ngay_tao) - new Date(a.ngay_tao))
    .slice(0, 3);



  useEffect(() => {
    fetch("http://localhost:5000/news")
      .then((res) => res.json())
      .then((data) => {
        setNewsList(Array.isArray(data.data) ? data.data : []);
      });
  }, []);

  // ---------------- PAGINATION ----------------
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newsList.slice(indexOfFirstPost, indexOfLastPost);

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
        <img src="/productpage/banner-page/banner-pages.png" alt="Banner" />
      </div>

      {/* Breadcrumb */}
      <div className="ProductSmartLock-Content">
        <nav className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
          <Link to="/" className="PSL-crumb"><span>Trang Chủ</span></Link>
          <FontAwesomeIcon icon={faAngleRight} className="PSL-sep" />
          <Link to="/tin-tuc" className="PSL-crumb PSL-crumb-active"><span>Tin Tức</span></Link>
        </nav>
      </div>

      {/* Nội dung */}
      <div className="new-contai">
        <div className="News-Content">
          <section className="News-Main">
            <h1>Tin tức & Bài viết mới nhất</h1>

            <div className="News-Grid">
              {currentPosts.map((item) => (
                <article key={item.id} className="News-Card">
                  <div className="News-Image">
                    <img src={item.anh_dai_dien} alt={item.tieu_de} />
                  </div>

                  <div className="News-Body">
                    <h2>
                      <Link to={`/tin-tuc/${item.duong_dan_ten_seo}`}>
                        {item.tieu_de}
                      </Link>
                    </h2>

                    {/* Meta */}
                    <div className="News-Meta">
                      <span>
                        <FontAwesomeIcon icon={faCalendarDays} />{" "}
                        {new Date(item.ngay_tao).toLocaleDateString("vi-VN")}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faUser} /> Admin
                      </span>
                    </div>

                    <p>{item.tom_tat}</p>

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
                  className={currentPage === index + 1 ? "active" : ""}
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
          <aside className="News-Sidebar">
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
          </aside>
        </div>
      </div>

      {/* CTA */}
      <section className="Contact-CTA">
        <div className="CTA-inner">
          <h3>Luôn cập nhật công nghệ mới nhất?</h3>
          <p>Theo dõi chúng tôi để không bỏ lỡ xu hướng khóa cửa thông minh.</p>
          <a className="CTA-btn" href="tel:0900000000">Liên hệ tư vấn ngay</a>
        </div>
      </section>
    </div>
  );
}

export default News;
