import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useState,
} from "react";
import { api } from "../lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [authLoading, setAuthLoading] = useState(true);
const [error, setError] = useState(null);

const refresh = useCallback(async () => {
    setAuthLoading(true);
    setError(null);
    try {
    const res = await api("/auth/me", { method: "GET", withCred: true });
    setUser(res?.data?.user || res?.user || null);
    } catch (e) {
    setUser(null);
    setError(e);
    } finally {
    setAuthLoading(false);
    }
}, []);

const logout = useCallback(async () => {
    try {
    await api("/auth/logout", { method: "POST", withCred: true });
    } catch (e) {
    console.error("Logout failed:", e);
    } finally {
    setUser(null);
    }
}, []);

useEffect(() => {
    refresh();
}, [refresh]);

const isAdmin = user?.vai_tro === "admin";


const value = useMemo(
    () => ({
    user,
    setUser,
    authLoading,
    error,
    isAdmin,
    refresh,
    logout,
    me: user,
    loading: authLoading,
    refetchMe: refresh,
    }),
    [user, authLoading, error, isAdmin, refresh, logout]
);

return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
return useContext(AuthCtx);
}
