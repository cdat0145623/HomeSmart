import { useEffect, useState } from "react";
import httpRequest from "../../utils/httpRequest";
import { formatPrice } from "../../helper/helper";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [stat, setStat] = useState([]);
    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const res = await httpRequest.get("/admin/products/stats", {
                withCredentials: true,
            });
            setStat(res.data[0]);
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Tổng quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                    title="Tổng doanh thu"
                    value={`${formatPrice(stat.tong_doanh_thu)} VND`}
                />
                <Card title="Đơn hoàn thành" value={stat.don_hoan_thanh} />
                <Card title="Khách hàng mới" value={stat.so_khach_hang} />
            </div>
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
