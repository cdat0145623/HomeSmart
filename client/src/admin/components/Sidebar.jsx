import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/api";
import { useCart } from "../../context/CartContext";
import httpRequest from "../../utils/httpRequest";
import { useAuth } from "../../context/AuthContext";
import {
    IconBrands,
    IconDashboard,
    IconNews,
    IconOrders,
    IconUsers,
} from "../../assets/Icon/Icon.jsx";

const itemCls = ({ isActive }) =>
    [
        "group flex items-center gap-3 px-4 py-2 rounded-xl transition-colors",
        "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        isActive &&
            "bg-orange-100 text-orange-800 border-l-4 border-orange-600",
    ]
        .filter(Boolean)
        .join(" ");

function IconProducts() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M20 7l-8-4-8 4 8 4 8-4z" />
            <path d="M4 7v10l8 4 8-4V7" />
        </svg>
    );
}

function Sidebar({ open, onToggle }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        const res = await httpRequest.delete("/auth/logout", {
            withCredentials: true,
        });
        if (res.data?.ok) {
            logout();
        }
        toast.success("Bạn đã đăng xuất!", {
            autoClose: 1200,
        });
        navigate("/admin", { replace: true });
    };
    return (
        <aside
            className={[
                "bg-white/95 backdrop-blur border-r shadow-sm z-30",
                "fixed inset-y-0 left-0 lg:sticky lg:top-0",
                "transition-all duration-200",
                open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                open ? "w-72" : "w-20",
                "flex flex-col  h-screen",
            ].join(" ")}
        >
            <div className="h-16 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 grid place-items-center text-white font-bold shadow">
                        N
                    </div>
                    {open && (
                        <div className="leading-tight">
                            <img
                                src="/nexahome.png"
                                alt="NexaHome"
                                className=" h-10 object-contain"
                            />
                            <div className="text-xs text-slate-500">
                                Quản trị hệ thống
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={onToggle}
                    className="rounded-lg px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
                    aria-label="Thu gọn / Mở rộng"
                    title={open ? "Thu gọn" : "Mở rộng"}
                >
                    {open ? "«" : "»"}
                </button>
            </div>

            <nav className="px-3 space-y-1">
                <NavLink to="/admin/dashboard" end className={itemCls}>
                    <IconDashboard />
                    {open && <span>Tổng quan</span>}
                </NavLink>
                <NavLink to="/admin/dashboard/brands" className={itemCls}>
                    <IconBrands />
                    {open && <span>Thương hiệu</span>}
                </NavLink>
                <NavLink to="/admin/dashboard/users" className={itemCls}>
                    <IconUsers />
                    {open && <span>Người dùng</span>}
                </NavLink>
                <NavLink to="/admin/dashboard/products" className={itemCls}>
                    <IconProducts />
                    {open && <span>Sản phẩm</span>}
                </NavLink>
                <NavLink to="/admin/dashboard/news" className={itemCls}>
                    <IconNews />
                    {open && <span>Tin tức</span>}
                </NavLink>
                <NavLink to="/admin/dashboard/orders" className={itemCls}>
                    <IconOrders />
                    {open && <span>Quản lý đơn hàng</span>}
                </NavLink>
            </nav>

            <div className="mt-auto p-3">
                <button
                    onClick={handleLogout}
                    className="w-full rounded-xl px-3 py-2 text-sm bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 flex items-center justify-center gap-2"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="M16 17l5-5-5-5" />
                        <path d="M21 12H9" />
                    </svg>
                    {open && <span>Đăng xuất</span>}
                </button>
            </div>
        </aside>
    );
}
export default Sidebar;
