import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer } from "react-toastify";

function usePageTitle() {
    const { pathname } = useLocation();

    const title = useMemo(() => {
        if (pathname === "/admin" || pathname === "/admin/") return "Tổng quan";
        if (pathname.startsWith("/admin/users")) return "Người dùng";

        if (pathname === "/admin/products") return "Sản phẩm";
        if (pathname === "/admin/products/new") return "Thêm sản phẩm";
        if (/^\/admin\/products\/\d+$/i.test(pathname))
            return "Cập nhật sản phẩm";
        return "Bảng điều khiển";
    }, [pathname]);

    const breadcrumb = useMemo(() => {
        const parts = pathname.replace(/^\/+/, "").split("/");
        const map = {
            admin: "Bảng điều khiển",
            users: "Người dùng",
            products: "Sản phẩm",
            new: "Thêm mới",
        };
        const labels = parts.map((p) => map[p] || p);
        return labels;
    }, [pathname]);

    return { title, breadcrumb };
}

function AdminLayout() {
    const [open, setOpen] = useState(true);
    const { title, breadcrumb } = usePageTitle();

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2200}
                theme="colored"
                newestOnTop
                pauseOnFocusLoss={false}
                closeOnClick
                draggable
            />
            <div className="min-h-screen bg-slate-50 flex">
                <Sidebar open={open} onToggle={() => setOpen((o) => !o)} />
                <div className="flex-1 flex flex-col">
                    <Topbar onMenu={() => setOpen((o) => !o)} />
                    <main role="main" className="p-4 md:p-6 lg:p-8">
                        <div className="max-w-screen-2xl mx-auto space-y-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold text-slate-800">
                                    {title}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Quản trị hệ thống NexaHome
                                </p>
                                <nav
                                    className="text-xs text-slate-500 mt-1 hidden sm:block"
                                    aria-label="Breadcrumb"
                                >
                                    <ol className="flex items-center gap-1 flex-wrap">
                                        {breadcrumb.map((b, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-1"
                                            >
                                                <span
                                                    className={
                                                        i ===
                                                        breadcrumb.length - 1
                                                            ? "text-slate-700"
                                                            : ""
                                                    }
                                                >
                                                    {b}
                                                </span>
                                                {i < breadcrumb.length - 1 && (
                                                    <span className="opacity-50">
                                                        /
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            </div>

                            <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-6">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
