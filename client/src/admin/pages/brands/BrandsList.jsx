import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { joinAsset } from "../../../lib/asset";
import httpRequest from "../../../utils/httpRequest";
import { DOMAIN } from "../../../helper/helper";

function BrandsList() {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useSearchParams();
    const page = Number(params.get("page") || 1);
    const q = params.get("q") || "";
    const pageSize = 10;

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await httpRequest.get(
                    `/admin/brands?page=${page}&pageSize=${pageSize}&q=${q}`,
                    {
                        withCredentials: true,
                    }
                );
                const items = res?.data?.items ?? res?.items ?? [];
                console.log("BRANDS:", items);
                setRows(items);
                setTotal(res?.data?.total ?? res?.total ?? 0);
            } finally {
                setLoading(false);
            }
        })();
    }, [page, q]);

    const pages = useMemo(
        () => Math.max(1, Math.ceil(total / pageSize)),
        [total]
    );

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Thương hiệu</h2>
                <Link
                    to="/admin/dashboard/brands/new"
                    className="px-3 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                    + Thêm thương hiệu
                </Link>
            </div>

            <div className="mb-3">
                <input
                    className="w-full md:w-80 px-3 py-2 border rounded-lg"
                    placeholder="Tìm theo tên/slug..."
                    defaultValue={q}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const v = e.currentTarget.value.trim();
                            console.log("vv::", v);
                            if (v) setParams({ q: v, page: "1" });
                            else setParams({});
                        }
                    }}
                />
            </div>

            <div className="overflow-auto rounded-xl border bg-white">
                <table className="min-w-[700px] w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2 text-left">Thương hiệu</th>
                            <th className="px-3 py-2 text-left">Slug</th>
                            <th className="px-3 py-2 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-3 py-6 text-center"
                                >
                                    Đang tải…
                                </td>
                            </tr>
                        ) : rows.length ? (
                            rows.map((r) => (
                                <tr key={r.id} className="border-t">
                                    <td className="px-3 py-2">{r.id}</td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-3">
                                            {r?.logo_thuong_hieu ? (
                                                <img
                                                    src={`${
                                                        DOMAIN +
                                                        r?.logo_thuong_hieu
                                                    }`}
                                                    alt={r.ten_thuong_hieu}
                                                    className="w-10 h-10 object-contain rounded border bg-white"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded border grid place-items-center text-[10px] text-slate-500 bg-slate-50">
                                                    No logo
                                                </div>
                                            )}

                                            <div className="font-medium">
                                                {r.ten_thuong_hieu}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        {r.duong_dan_ten_seo}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <Link
                                            to={`/admin/dashboard/brands/${r.id}`}
                                            className="px-2 py-1 rounded bg-white border hover:bg-slate-50 mr-2"
                                        >
                                            Sửa
                                        </Link>
                                        <Link
                                            to={`/admin/dashboard/brands/${r.id}?delete=1`}
                                            className="px-2 py-1 rounded border border-red-200 text-red-700 hover:bg-red-50"
                                        >
                                            Xóa
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-3 py-6 text-center"
                                >
                                    Chưa có thương hiệu
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
                            className={
                                "px-3 py-1 rounded border " +
                                (p === page
                                    ? "bg-orange-600 text-white border-orange-600"
                                    : "bg-white hover:bg-slate-50")
                            }
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}

export default BrandsList;
