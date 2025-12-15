import React from "react";

function HyundaiDoorLock() {
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Khóa cửa HUYNDAI</h1>

      <p>
        Dòng khóa cửa thông minh HUYNDAI được đánh giá cao về độ bền, thiết kế
        sang trọng và độ an toàn. Đây là trang mô tả và liệt kê các sản phẩm
        khóa cửa HUYNDAI.
      </p>

      <div
        className="product-list"
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >
       

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/hyundai-1.jpg"
            alt="Khóa Hyundai Model A"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Hyundai Model A</h3>
          <p>Giá: 4.900.000 VNĐ</p>
        </div>

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/hyundai-2.jpg"
            alt="Khóa Hyundai Model B"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Hyundai Model B</h3>
          <p>Giá: 6.500.000 VNĐ</p>
        </div>
      </div>
    </div>
  );
}

export default HyundaiDoorLock;

