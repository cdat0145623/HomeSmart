import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireAdmin({ children }) {
const { user, authLoading } = useAuth();
const loc = useLocation();

if (authLoading) {
    return (
    <div className="w-full h-[60vh] grid place-items-center">
        <div className="animate-pulse text-gray-500">Đang kiểm tra quyền...</div>
    </div>
    );
}

if (!user) {
    return <Navigate to="/dang-nhap?tab=login" replace state={{ from: loc }} />;
}

const allowedRoles = ["admin", "nhan_vien"];
if (!allowedRoles.includes(user.vai_tro)) {
    return <Navigate to="/" replace />;
}

return children;
}
