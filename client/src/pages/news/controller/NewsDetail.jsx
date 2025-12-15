import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import "./../../news/controller/css/newsDetail.css";
function NewsDetail() {
  const { slug } = useParams(); // slug từ URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/news/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setPost(data.data);
      });
  }, [slug]);

  if (!post) return <div className="loading">Đang tải...</div>;

  return (
    <div className="NewsDetail-Container">
      {/* Banner */}
      <div className="NewsDetail-Banner">
        <img src="/productpage/banner-page/banner-pages.png" alt="Banner" />
      </div>

      {/* Breadcrumb */}
      <nav className="Breadcrumb">
        <Link to="/">Trang Chủ</Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <Link to="/tin-tuc">Tin Tức</Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <span className="active">{post.tieu_de}</span>
      </nav>

      {/* Nội dung */}
      <div className="NewsDetail-Content">
        <h1>{post.tieu_de}</h1>

        <div className="NewsDetail-Meta">
          <span>
            <FontAwesomeIcon icon={faCalendarDays} /> {post.ngay_tao}
          </span>
          <span>
            <FontAwesomeIcon icon={faUser} /> {post.danh_muc}
          </span>
        </div>

        <div className="NewsDetail-Image">
          <img src={post.anh_dai_dien} alt={post.tieu_de} />
        </div>

        <article
          className="NewsDetail-Body"
          dangerouslySetInnerHTML={{ __html: post.noi_dung }}
        />

        <Link to="/tin-tuc" className="BackButton">
          ← Quay về danh sách
        </Link>
      </div>
    </div>
  );
}

export default NewsDetail;
