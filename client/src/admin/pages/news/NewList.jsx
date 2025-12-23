import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import httpRequest from "../../../utils/httpRequest";

function NewsList() {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useSearchParams();

    const page = Number(params.get("page") || 1);
    const q = params.get("q") || "";
    const pageSize = 10;

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const res = await httpRequest.get(
                    `/admin/news?page=${page}&pageSize=${pageSize}&q=${q}`,
                    { withCredentials: true }
                );
                console.log("API /admin/news:", res);
                setRows(res?.data?.items ?? []);
                setTotal(res?.data?.total ?? 0);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [page, q]);

    const pages = useMemo(
        () => Math.max(1, Math.ceil(total / pageSize)),
        [total]
    );

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tin tức</h2>
                <Link
                    to="/admin/dashboard/news/new"
                    className="px-3 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                    + Thêm bài viết
                </Link>
            </div>

            <input
                className="w-full md:w-80 px-3 py-2 border rounded-lg mb-3"
                placeholder="Tìm theo tiêu đề / slug..."
                defaultValue={q}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const v = e.currentTarget.value.trim();
                        setParams(v ? { q: v, page: "1" } : {});
                    }
                }}
            />

            <div className="overflow-auto rounded-xl border bg-white">
                <table className="min-w-[900px] w-full text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2">Hình ảnh</th>
                            <th className="px-3 py-2 text-left">Tiêu đề</th>
                            <th className="px-3 py-2 text-left">Slug</th>
                            <th className="px-3 py-2 text-center">
                                Trạng thái
                            </th>
                            <th className="px-3 py-2 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6">
                                    Đang tải…
                                </td>
                            </tr>
                        ) : rows.length ? (
                            rows.map((n) => (
                                <tr key={n.id} className="border-t">
                                    <td className="px-3 py-2">{n.id}</td>
                                    <td className="px-1 py-1 ">
                                        {n.anh_dai_dien ? (
                                            <img
                                                className="w-14 h-14 object-cover  border"
                                                src={n.anh_dai_dien}
                                                alt={n.tieu_de}
                                            />
                                        ) : (
                                            <div className="w-14 h-14 bg-slate-100 grid place-items-center text-xs">
                                                No img
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex gap-3 items-center justify-between">
                                            <div>
                                                <div className="font-medium">
                                                    {n.tieu_de}
                                                </div>
                                                <div className="text-xs text-slate-500 line-clamp-1">
                                                    {n.tom_tat}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        {n.duong_dan_ten_seo}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                n.trang_thai === "hien"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {n.trang_thai}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <Link
                                            to={`/admin/dashboard/news/${n.id}`}
                                            className="px-2 py-1 border rounded hover:bg-slate-50"
                                        >
                                            Sửa
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6">
                                    Chưa có bài viết
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pages > 1 && (
                <div className="flex justify-end gap-2 mt-3">
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setParams({ q, page: String(p) })}
                            className={`px-3 py-1 rounded border ${
                                p === page
                                    ? "bg-orange-600 text-white"
                                    : "bg-white"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}

export default NewsList;
