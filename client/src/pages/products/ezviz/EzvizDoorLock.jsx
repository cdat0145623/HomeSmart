import React from "react";

function EzvizDoorLock() {
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Khóa cửa EZVIZ</h1>

      <p>
        Khóa cửa thông minh EZVIZ nổi tiếng với khả năng kết nối hệ sinh thái camera,
        bảo mật mạnh mẽ, thiết kế hiện đại và tính năng mở khóa thông minh. 
        Đây là trang giới thiệu các mẫu khóa cửa EZVIZ.
      </p>

      <div
        className="product-list"
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/ezviz-1.jpg"
            alt="Ezviz Model A"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Ezviz Model A</h3>
          <p>Giá: 4.900.000 VNĐ</p>
        </div>

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/ezviz-2.jpg"
            alt="Ezviz Model B"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Ezviz Model B</h3>
          <p>Giá: 6.700.000 VNĐ</p>
        </div>
      </div>
    </div>
  );
}

export default EzvizDoorLock;
