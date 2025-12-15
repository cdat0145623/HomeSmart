import React from "react";

function HubertDoorLock() {
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Khóa cửa HUBERT</h1>

      <p>
        Khóa cửa thông minh HUBERT đem lại sự ổn định, bảo mật cao và thiết kế hiện đại.
        Đây là trang giới thiệu các mẫu khóa cửa HUBERT đang được phân phối.
      </p>

      <div
        className="product-list"
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >
       

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/hubert-1.jpg"
            alt="Hubert Model A"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Hubert Model A</h3>
          <p>Giá: 4.700.000 VNĐ</p>
        </div>

        <div className="product-card" style={{ width: "250px" }}>
          <img
            src="/images/hubert-2.jpg"
            alt="Hubert Model B"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Hubert Model B</h3>
          <p>Giá: 6.300.000 VNĐ</p>
        </div>
      </div>
    </div>
  );
}

export default HubertDoorLock;
