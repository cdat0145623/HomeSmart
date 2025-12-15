import React from "react";

function CameraIMOU() {
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
        Camera Wifi Imou
      </h1>

      <p style={{ fontSize: 16, marginBottom: 18 }}>
        Camera Wifi Imou là giải pháp an ninh thông minh dành cho gia đình, cửa
        hàng, văn phòng và các không gian cần giám sát 24/7. Với khả năng kết
        nối Wifi, chất lượng hình ảnh cao, cảnh báo chuyển động thông minh và ứng
        dụng điều khiển từ xa, Imou là lựa chọn hàng đầu trong phân khúc camera
        thông minh giá tốt.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
        Tính năng nổi bật
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Độ phân giải Full HD – 2K – 4MP tùy model</li>
        <li>Nhận diện chuyển động AI, phân biệt người – vật thể</li>
        <li>Tích hợp micro & loa – đàm thoại 2 chiều</li>
        <li>Hỗ trợ quay xoay 360° (PTZ) ở nhiều mẫu</li>
        <li>Lưu trữ cloud hoặc thẻ nhớ MicroSD</li>
        <li>Cảnh báo tức thì qua ứng dụng Imou Life</li>
        <li>Kết nối Wifi ổn định – cài đặt nhanh</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Vì sao nên chọn Camera Imou
      </h2>
      <p style={{ fontSize: 16, marginBottom: 12 }}>
        Imou là thương hiệu camera nổi bật với ưu điểm giá tốt, chất lượng ổn
        định, dễ sử dụng và hệ sinh thái ứng dụng mượt. Đặc biệt phù hợp cho hộ
        gia đình và cửa hàng muốn giải pháp an ninh tiện lợi, cài đặt nhanh.
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
            src="/images/imou-1.jpg"
            alt="Camera Imou mẫu 1"
            style={{
              width: "100%",
              display: "block",
              height: 170,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Imou Ranger 2</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>
              Camera xoay 360°, đàm thoại 2 chiều, Full HD.
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
            src="/images/imou-2.jpg"
            alt="Camera Imou mẫu 2"
            style={{
              width: "100%",
              display: "block",
              height: 170,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Imou Cue 2</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>
              Camera cố định góc rộng, nhỏ gọn, phù hợp phòng ngủ – văn phòng.
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Ứng dụng
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Gia đình – chung cư</li>
        <li>Nhà trẻ / lớp học</li>
        <li>Cửa hàng – quầy thu ngân</li>
        <li>Văn phòng – kho hàng</li>
        <li>Giám sát thú cưng – người già – trẻ nhỏ</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Liên hệ & báo giá
      </h2>
      <p style={{ fontSize: 16 }}>
        Cần tư vấn mẫu phù hợp hoặc báo giá chi tiết? <br />
        Hotline: <b>0909 xxx xxx</b>
      </p>
    </div>
  );
}

export default CameraIMOU;
