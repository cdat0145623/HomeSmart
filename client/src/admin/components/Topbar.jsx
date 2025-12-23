import React from "react";
import { useAuth } from "../../context/AuthContext";

function Topbar({ onMenu }) {
    const { user } = useAuth();

    return (
        <header
            className="
        sticky top-0 z-20 h-16
        bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500
        text-white shadow-lg
        flex items-center justify-between px-4 md:px-6
    "
        >
            <button
                onClick={onMenu}
                className="md:hidden rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2"
                aria-label="Mở menu"
            >
                ☰
            </button>

            <h1 className="font-semibold tracking-wide">Bảng điều khiển</h1>

            <div className="flex items-center gap-3">
                <span className="text-sm/5 opacity-90">
                    {user?.ho_ten || user?.email}
                </span>

                {user?.google_avatar_url ? (
                    <img
                        src={user.google_avatar_url}
                        alt="avatar"
                        className="w-9 h-9 rounded-full ring-2 ring-white/70 shadow-md object-cover"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-white/15 grid place-items-center ring-2 ring-white/60">
                        <span className="font-semibold">
                            {(user?.email || "A")[0].toUpperCase()}
                        </span>
                    </div>
                )}
            </div>
        </header>
    );
}
export default Topbar;
