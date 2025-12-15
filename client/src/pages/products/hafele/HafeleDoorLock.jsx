import React from "react";

function HafeleDoorLock() {
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Khóa cửa HAFELE</h1>

      <p>
        Khóa cửa HAFELE nổi tiếng với công nghệ Đức, độ bền cao, thiết kế sang trọng
        và nhiều tính năng bảo mật hiện đại. Đây là trang giới thiệu các sản phẩm 
        khóa cửa HAFELE trong hệ thống.
      </p>

      <div
        className="product-list"
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >
       

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/hafele-1.jpg"
            alt="Hafele Model A"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Hafele Model A</h3>
          <p>Giá: 6.800.000 VNĐ</p>
        </div>

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/hafele-2.jpg"
            alt="Hafele Model B"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Hafele Model B</h3>
          <p>Giá: 8.500.000 VNĐ</p>
        </div>
      </div>
    </div>
  );
}

export default HafeleDoorLock;
