import React from "react";

function PhuKienCamera() {
  return (
    <div className="w-full">
      <div className="px-6 lg:px-20 py-8">
        <h2 className="text-3xl font-bold mb-4">Phụ kiện Camera Chính Hãng</h2>
        <p className="leading-relaxed text-gray-700 mb-8 text-[16px]">
          Chúng tôi cung cấp đầy đủ các dòng phụ kiện camera chính hãng: nguồn,
          dây tín hiệu, BNC, jack nguồn, thẻ nhớ, ổ cứng, phụ kiện đi dây và các
          thiết bị lắp đặt. Tất cả đều đạt tiêu chuẩn kỹ thuật, tương thích với
          camera Hikvision, Dahua, Ezviz, Imou, Tapo – TP-Link và các hệ thống
          camera analog – IP khác.
        </p>
        <div className="mt-10 bg-gray-100 p-5 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Lý do nên chọn phụ kiện tại chúng tôi</h3>
          <ul className="list-disc ml-6 text-gray-700 leading-7">
            <li>Phụ kiện chính hãng – độ bền cao – bảo hành đầy đủ.</li>
            <li>Đa dạng mẫu mã, phù hợp với mọi hệ thống camera.</li>
            <li>Giá tốt hơn thị trường.</li>
            <li>Hỗ trợ tư vấn kỹ thuật & lắp đặt tận nơi.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PhuKienCamera;