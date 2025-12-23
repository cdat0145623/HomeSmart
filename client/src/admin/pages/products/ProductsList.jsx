import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import { login as getAllProducts } from "../../../services/authService";
import { getAllProducts } from "../../../services/productService";
import httpRequest from "../../../utils/httpRequest";
import { api } from "../../../lib/api";
// import httpRequest from "../../../utils/httpRequest";

const ASSET_BASE = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5001"
).replace(/\/+$/, "");
const joinAsset = (p) => {
    if (!p) return "";
    if (/^https?:\/\//i.test(p)) return p;
    const path = String(p).startsWith("/") ? p : `/${p}`;
    return `${ASSET_BASE}${path}`;
};

function ProductsList() {
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
                    `/admin/products?page=${page}`,
                    {
                        query: { page, pageSize, q },
                        withCredentials: true,
                    }
                );
                const items = res?.data?.items ?? res?.items ?? [];
                const totalNum = res?.data?.total ?? res?.total ?? 0;
                // const res = await getAllProducts(
                //     "/admin/products",
                //     { query: { page, pageSize, q }, },
                // { withCredentials: true }
                // );
                // const items = res?.data?.items ?? res?.items ?? [];
                // const totalNum = res?.data?.total ?? res?.total ?? 0;
                // const res = await api("/admin/products", {
                //     method: "GET",
                //     withCred: true,
                //     query: { page, pageSize, q },
                // });

                setRows(items);
                setTotal(totalNum);
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
                <h2 className="text-xl font-semibold">Sản phẩm</h2>
                <Link
                    to="/admin/dashboard/products/new"
                    className="px-3 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                    + Thêm sản phẩm
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
                            if (v) setParams({ q: v, page: "1" });
                            else setParams({});
                        }
                    }}
                />
            </div>

            <div className="overflow-auto rounded-xl border bg-white">
                <table className="min-w-[900px] w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2 text-left">Sản phẩm</th>
                            <th className="px-3 py-2 text-left">Slug</th>
                            <th className="px-3 py-2 text-right">Giá</th>
                            <th className="px-3 py-2 text-center">
                                Trạng thái
                            </th>
                            <th className="px-3 py-2 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-3 py-6 text-center"
                                >
                                    Đang tải…
                                </td>
                            </tr>
                        ) : rows.length ? (
                            rows.map((r) => {
                                const productImg =
                                    r.anh_dai_dien_full ||
                                    joinAsset(r.anh_dai_dien);
                                const brandLogo =
                                    r.brand_logo_full ||
                                    joinAsset(r.brand_logo);
                                return (
                                    <tr key={r.id} className="border-t">
                                        <td className="px-3 py-2">{r.id}</td>

                                        <td className="px-3 py-2">
                                            <div className="flex items-center gap-3">
                                                {productImg ? (
                                                    <img
                                                        src={
                                                            r.anh_dai_dien_full
                                                        }
                                                        alt={r.ten_san_pham}
                                                        className="w-14 h-14 object-cover rounded-md border"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-md border bg-slate-50 grid place-items-center text-xs text-slate-400">
                                                        No img
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <div className="font-medium truncate">
                                                        {r.ten_san_pham}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                                                        {brandLogo ? (
                                                            <img
                                                                src={brandLogo}
                                                                alt={
                                                                    r.brand_name ||
                                                                    "brand"
                                                                }
                                                                className="w-4 h-4 object-contain"
                                                                loading="lazy"
                                                            />
                                                        ) : null}
                                                        {r.brand_name && (
                                                            <span>
                                                                {r.brand_name}
                                                            </span>
                                                        )}
                                                        {r.category_name && (
                                                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                                                {
                                                                    r.category_name
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-3 py-2">
                                            {r.duong_dan_ten_seo}
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            {formatMoney(
                                                r.gia_khuyen_mai ?? r.gia_goc
                                            )}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-xs " +
                                                    (r.trang_thai === "hien"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-slate-100 text-slate-600")
                                                }
                                            >
                                                {r.trang_thai}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <Link
                                                to={`/admin/dashboard/products/${r.id}`}
                                                className="px-2 py-1 rounded bg-white border hover:bg-slate-50"
                                            >
                                                Sửa
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-3 py-6 text-center"
                                >
                                    Chưa có sản phẩm
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
export default ProductsList;

function formatMoney(n) {
    if (n == null) return "—";
    return Number(n).toLocaleString("vi-VN");
}
