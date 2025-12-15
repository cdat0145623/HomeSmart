import React from "react";

function CameraEZVIZ() {
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
        Camera Wifi Ezviz
      </h1>

      <p style={{ fontSize: 16, marginBottom: 18 }}>
        Camera Wifi Ezviz là dòng camera an ninh thông minh đến từ thương hiệu
        nổi tiếng toàn cầu. Ezviz được yêu thích bởi chất lượng hình ảnh sắc nét,
        độ ổn định cao, tính năng AI hiện đại và hệ sinh thái ứng dụng Ezviz
        CloudPlay dễ sử dụng. Phù hợp cho gia đình, cửa hàng và văn phòng cần
        giải pháp giám sát chủ động 24/7.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
        Tính năng nổi bật
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Độ phân giải Full HD – 2K – 2K+</li>
        <li>Nhận diện người bằng AI, giảm cảnh báo giả</li>
        <li>Đàm thoại 2 chiều rõ ràng</li>
        <li>Hỗ trợ quay xoay 360° ở nhiều mẫu PTZ</li>
        <li>Tầm nhìn ban đêm màu (Color Night Vision)</li>
        <li>Cảnh báo âm thanh + ánh sáng</li>
        <li>Lưu trữ CloudPlay hoặc thẻ nhớ MicroSD</li>
        <li>Kết nối Wifi ổn định, cài đặt nhanh</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Vì sao nên chọn Camera Ezviz
      </h2>
      <p style={{ fontSize: 16, marginBottom: 12 }}>
        Ezviz là thương hiệu thuộc tập đoàn Hikvision – một trong những nhà sản
        xuất thiết bị an ninh lớn nhất thế giới. Camera Ezviz có chất lượng hình
        ảnh vượt trội, công nghệ AI mạnh mẽ và ứng dụng Ezviz Life dễ dùng, phù
        hợp cho gia đình cần độ bền và sự ổn định lâu dài.
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
            src="/images/ezviz-1.jpg"
            alt="Camera Ezviz mẫu 1"
            style={{
              width: "100%",
              display: "block",
              height: 170,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Ezviz C6N 2MP</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>
              Camera xoay 360°, Full HD, giá tốt – phù hợp gia đình.
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
            src="/images/ezviz-2.jpg"
            alt="Camera Ezviz mẫu 2"
            style={{
              width: "100%",
              display: "block",
              height: 170,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Ezviz H8 Pro</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>
              Camera ngoài trời 2K+, chống nước IP67, theo dõi AI thông minh.
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Ứng dụng
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Nhà ở – căn hộ – chung cư</li>
        <li>Shop – cửa hàng – phố kinh doanh</li>
        <li>Kho – xưởng – bãi giữ xe</li>
        <li>Trường học – quán café – văn phòng</li>
        <li>Giám sát trẻ nhỏ – người già – thú cưng</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Liên hệ & báo giá
      </h2>
      <p style={{ fontSize: 16 }}>
        Cần tư vấn mẫu Ezviz phù hợp hoặc báo giá lắp đặt trọn gói? <br />
        Hotline: <b>0909 xxx xxx</b>
      </p>
    </div>
  );
}

export default CameraEZVIZ;
