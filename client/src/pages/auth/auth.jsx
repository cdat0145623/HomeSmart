import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dangnhap from "./components/Dangnhap";
import Dangki from "./components/Dangki";
import "./components/css/auth.css";
import { toast } from "react-toastify";

function AuthPage() {
  const navigate = useNavigate();
  const inited = useRef(false);
  const [tab, setTab] = useState(() => {
    const usp = new URLSearchParams(location.search);
    return usp.get("tab") === "register" ? "register" : "login";
  });

  const safeRenderGoogleBtn = (id) => {
    const google = window.google;
    if (!google?.accounts?.id) return;
    let tries = 0;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = "";
        google.accounts.id.renderButton(el, { theme: "outline", size: "large" });
        return;
      }
      if (++tries <= 20) setTimeout(attempt, 100);
    };
    attempt();
  };

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const google = window.google;
    if (!google?.accounts?.id) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const API_BASE = (
      import.meta.env.VITE_API_BASE_URL ||
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000"
    ).replace(/\/$/, "");

    google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        try {
          const r = await fetch(`${API_BASE}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ credential: response.credential }),
          });
          const data = await r.json();
          if (r.status === 202) {
            toast.info(data.message || "Vui lòng kiểm tra email để xác minh.");
            navigate("/dang-nhap?tab=login&verifySent=1", { replace: true });
            return;
          }
          if (!r.ok) throw new Error(data.message || "Google login failed");

          const meRes = await fetch(`${API_BASE}/auth/me`, { method: "GET", credentials: "include" });
          const meData = await meRes.json().catch(() => ({}));
          const role = meData?.data?.user?.vai_tro;

          toast.success("Đăng nhập Google thành công!", { autoClose: 1200 });
          if (["admin", "nhan_vien"].includes(role)) {
          navigate("/admin", { replace: true });
          } else {
            navigate("/tai-khoan", { replace: true });
          }
        } catch (e) {
          console.error("GOOGLE LOGIN ERROR:", e?.message || e);
          toast.error(`Lỗi Google: ${e?.message || "Không xác định"}`);
        }
      },
      ux_mode: "popup",
    });

    safeRenderGoogleBtn(tab === "login" ? "googleLoginBtn" : "googleSignupBtn");

    return () => {
      try {
        const g = window.google;
        if (g?.accounts?.id?.cancel) g.accounts.id.cancel();
      } catch (err) {
        console.error("[AuthPage] Cleanup Google One Tap error:", err);
      }
    };
  }, []); 

  useEffect(() => {
    const google = window.google;
    if (!google?.accounts?.id) return;
    safeRenderGoogleBtn(tab === "login" ? "googleLoginBtn" : "googleSignupBtn");
  }, [tab]);

  return (
    <section className="auth-page min-h-screen" aria-label="Trang xác thực">
      <main className="container-auth mx-auto px-4 py-10" role="main">
        <div className="nh-auth-shell">
          <header className="nh-auth-head" aria-labelledby="authTitle">
            <h1 id="authTitle" className="nh-auth-brand">NexaHome</h1>
            <p className="nh-auth-desc">Đăng nhập hoặc tạo tài khoản để tận hưởng ưu đãi thông minh</p>
          </header>

          <div className="nh-tabs" role="tablist" aria-label="Chuyển tab đăng nhập/đăng ký">
            <button
              role="tab"
              aria-selected={tab === "login"}
              className={`nh-tab ${tab === "login" ? "is-active" : ""}`}
              onClick={() => setTab("login")}
              type="button"
            >
              Đăng nhập
            </button>
            <button
              role="tab"
              aria-selected={tab === "register"}
              className={`nh-tab ${tab === "register" ? "is-active" : ""}`}
              onClick={() => setTab("register")}
              type="button"
            >
              Đăng ký
            </button>
          </div>

          <div className="nh-card" role="region" aria-live="polite">
            {tab === "login" ? <Dangnhap /> : <Dangki />}
          </div>
        </div>
      </main>
    </section>
  );
}
export default AuthPage;
