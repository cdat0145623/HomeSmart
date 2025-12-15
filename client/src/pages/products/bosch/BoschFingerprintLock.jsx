import React from "react";

function BoschFingerprintLock() {
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Khóa vân tay BOSCH</h1>

      <p>
        Dòng khóa cửa thông minh BOSCH nổi tiếng với độ bền, bảo mật cao và
        thiết kế sang trọng. Đây là trang giới thiệu và hiển thị các sản phẩm
        khóa vân tay BOSCH trong hệ thống.
      </p>

      <div className="product-list">
        <div className="product-card">
          <img
            src="/images/bosch-lock-1.jpg"
            alt="Khóa Bosch Model A"
            style={{ width: "250px", borderRadius: "8px" }}
          />
          <h3>BOSCH Model A</h3>
          <p>Giá: 5.500.000 VNĐ</p>
        </div>

        <div className="product-card">
          <img
            src="/images/bosch-lock-2.jpg"
            alt="Khóa Bosch Model B"
            style={{ width: "250px", borderRadius: "8px" }}
          />
          <h3>BOSCH Model B</h3>
          <p>Giá: 7.200.000 VNĐ</p>
        </div>
      </div>
    </div>
  );
}

export default BoschFingerprintLock;
