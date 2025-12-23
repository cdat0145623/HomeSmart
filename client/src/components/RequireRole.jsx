import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireRole({ role }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    return user.vai_tro === role ? (
        <Outlet />
    ) : (
        // <>{children}</>
        <Navigate to="/" replace />
    );
}

export default RequireRole;
