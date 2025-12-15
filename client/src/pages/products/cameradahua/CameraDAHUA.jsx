import React from "react";

function CameraDAHUA() {
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#1e3a8a",
          marginBottom: 12,
        }}
      >
        Camera Dahua
      </h1>

      <p style={{ fontSize: 16, marginBottom: 18 }}>
        Camera Dahua là thương hiệu camera an ninh hàng đầu thế giới với công
        nghệ AI mạnh mẽ, độ bền cao và khả năng xử lý hình ảnh vượt trội. Dahua
        phù hợp cho cả gia đình, cửa hàng, văn phòng và hệ thống giám sát quy mô
        lớn nhờ sự ổn định, độ bảo mật cao và chất lượng phần cứng bền bỉ.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
        Tính năng nổi bật
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Công nghệ AI nhận diện người – phương tiện</li>
        <li>Độ phân giải Full HD – 2K – 4MP – 4K</li>
        <li>Chống nước – chống bụi chuẩn IP67/IP66</li>
        <li>Tầm nhìn ban đêm xa đến 30m – 50m</li>
        <li>Công nghệ Starlight nhìn đêm cực sáng</li>
        <li>Cảnh báo chuyển động thông minh</li>
        <li>Hỗ trợ đàm thoại 2 chiều (ở các mẫu Wifi)</li>
        <li>Kết nối Wifi hoặc dùng PoE tùy dòng</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Vì sao nên chọn Camera Dahua
      </h2>
      <p style={{ fontSize: 16, marginBottom: 12 }}>
        Dahua được đánh giá cao nhờ độ bền, độ ổn định và khả năng xử lý hình
        ảnh ban đêm vượt trội. Đây là lựa chọn tối ưu cho nhà ở, cửa hàng, kho
        xưởng và các hệ thống camera chuyên nghiệp cần độ an toàn cao.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 12 }}>
        Mẫu tham khảo
      </h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 260,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src="/images/dahua-1.jpg"
            alt="Camera Dahua mẫu 1"
            style={{
              width: "100%",
              display: "block",
              height: 170,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Dahua IPC-HDW1230S</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>
              Camera bán cầu Full HD, chống nước IP67 — phù hợp ngoài trời.
            </p>
          </div>
        </div>

        <div
          style={{
            width: 260,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src="/images/dahua-2.jpg"
            alt="Camera Dahua mẫu 2"
            style={{
              width: "100%",
              display: "block",
              height: 170,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Dahua IPC-C22EP</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>
              Camera Wifi trong nhà, đàm thoại 2 chiều, góc nhìn rộng.
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Ứng dụng
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Nhà ở – căn hộ – biệt thự</li>
        <li>Cửa hàng – nhà thuốc – showroom</li>
        <li>Kho – xưởng – bãi xe</li>
        <li>Văn phòng – tòa nhà</li>
        <li>Giám sát sân vườn – gara – hành lang</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Liên hệ & báo giá
      </h2>
      <p style={{ fontSize: 16 }}>
        Cần tư vấn mẫu Dahua phù hợp hoặc lắp đặt trọn gói? <br />
        Hotline: <b>0909 xxx xxx</b>
      </p>
    </div>
  );
}

export default CameraDAHUA;
