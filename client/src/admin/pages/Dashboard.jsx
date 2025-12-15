import React from "react";

function Dashboard() {
return (
    <section>
    <h2 className="text-xl font-semibold mb-4">Tổng quan</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Doanh thu tháng" value="—" />
        <Card title="Đơn hoàn thành" value="—" />
        <Card title="Khách hàng mới" value="—" />
    </div>
    <p className="text-sm text-gray-500 mt-6">
        (Sẽ nối API v_top_doanh_thu_thang, v_top_khach_hang, v_top_san_pham sau)
    </p>
    </section>
);
}
export default Dashboard;

function Card({ title, value }) {
return (
    <div className="p-4 rounded-xl bg-white border shadow-sm">
    <div className="text-gray-500 text-sm">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
);
}
