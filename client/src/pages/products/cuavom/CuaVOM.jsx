import React from "react";

function CuaVOM() {
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1e3a8a", marginBottom: 12 }}>
        Cửa vòm
      </h1>

      <p style={{ fontSize: 16, marginBottom: 18 }}>
        Cửa vòm là dòng cửa có phần đầu bo cong mềm mại, tạo điểm nhấn kiến trúc thanh lịch
        và sang trọng cho không gian. Phù hợp nhiều phong cách nội thất: hiện đại, tân cổ điển,
        Indochine hay Minimalist.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
        Tính năng nổi bật
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Thiết kế cong mềm mại, thẩm mỹ cao</li>
        <li>Tăng chiều cao thị giác — khiến phòng trông rộng và cao hơn</li>
        <li>Đa dạng vật liệu: gỗ tự nhiên, gỗ công nghiệp, composite, nhôm-kính</li>
        <li>Nhiều kiểu vòm: vòm tròn, vòm bán nguyệt, vòm Gothic, vòm elip</li>
        <li>Lắp đặt linh hoạt cho phòng ngủ, phòng khách, hành lang, lối đi</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Vì sao nên chọn cửa vòm
      </h2>
      <p style={{ fontSize: 16, marginBottom: 12 }}>
        Cửa vòm nâng tầm thẩm mỹ tổng thể, tạo chiều sâu và cảm giác sang trọng cho công trình.
        Là lựa chọn lý tưởng khi bạn muốn một chi tiết kiến trúc khác biệt, tinh tế mà vẫn hài hòa.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 12 }}>
        Mẫu tham khảo
      </h2>

      <div style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        marginBottom: 20
      }}>
        <div style={{ width: 260, borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
          <img
            src="/images/cua-vom-1.jpg"
            alt="Cửa vòm mẫu 1"
            style={{ width: "100%", display: "block", height: 170, objectFit: "cover" }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Cửa vòm gỗ công nghiệp</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>Kiểu vòm tròn, tông ấm – phù hợp phòng khách.</p>
          </div>
        </div>

        <div style={{ width: 260, borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
          <img
            src="/images/cua-vom-2.jpg"
            alt="Cửa vòm mẫu 2"
            style={{ width: "100%", display: "block", height: 170, objectFit: "cover" }}
          />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Cửa vòm nhôm kính</h3>
            <p style={{ margin: "8px 0 0", color: "#555" }}>Mẫu tối giản, lấy sáng tốt — phù hợp hành lang, lối đi.</p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Ứng dụng
      </h2>
      <ul style={{ marginLeft: 18, marginBottom: 12 }}>
        <li>Nhà phố & biệt thự</li>
        <li>Căn hộ cao cấp</li>
        <li>Nhà hàng, quán café theo phong cách Châu Âu</li>
        <li>Khoảng chuyển tiếp giữa các không gian (sảnh, hành lang)</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
        Liên hệ & báo giá
      </h2>
      <p style={{ fontSize: 16 }}>
        Cần tư vấn kiểu vòm phù hợp hoặc nhận báo giá chi tiết? <br />
        Hotline: <b>0909 xxx xxx</b>
      </p>
    </div>
  );
}

export default CuaVOM;
