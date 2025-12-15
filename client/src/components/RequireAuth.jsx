import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
const { me, loading } = useAuth();
const location = useLocation();
if (loading) return null;
if (!me) return <Navigate to="/auth-page" replace state={{ from: location }} />;
return children;
}
