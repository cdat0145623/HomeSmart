import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import "./css/AdminLoginCss.css";

function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login: logged } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showPw, setShowPw] = useState(false);

    useEffect(() => {
        const usp = new URLSearchParams(location.search);
        if (usp.get("verified") === "1") {
            toast.success("Email đã được xác minh, bạn có thể đăng nhập.", {
                toastId: "verified-ok",
            });
        }
    }, [location.search]);

    const onChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.email) e.email = "Vui lòng nhập email";
        if (!form.password) e.password = "Vui lòng nhập mật khẩu";
        return e;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const eObj = validate();
        setErrors(eObj);
        if (Object.keys(eObj).length) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            setSubmitting(true);
            const data = await login(
                "/auth/login",
                {
                    email: form.email,
                    password: form.password,
                },
                { withCredentials: true }
            );
            console.log("data:", data);
            if (data?.token) {
                logged(data.user, data.token);
                toast.success("Đăng nhập thành công!", { autoClose: 1200 });
                navigate("/admin/dashboard", { replace: true });
            }
        } catch (err) {
            console.log("error at login", err);
            toast.error(err.message || "Đăng nhập thất bại");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="auth-page min-h-screen" aria-label="Trang xác thực">
            <main className="container-auth mx-auto px-4 py-10" role="main">
                <div>
                    <header
                        className="nh-auth-head"
                        aria-labelledby="authTitle"
                    >
                        <h1 id="authTitle" className="nh-auth-brand">
                            NexaHome
                        </h1>
                        <p className="nh-auth-desc">QUẢN TRỊ NEXAHOME</p>
                    </header>
                </div>
                <div className="mt-6 p-6 md:p-8 border border-slate-300 rounded-xl bg-white shadow-2xl">
                    <header className="mb-6">
                        <h2 className="text-2xl md:text-3xl form-title">
                            Đăng nhập
                        </h2>
                        <p className="mt-1 form-subtitle">
                            Chào mừng quay lại NexaHome
                        </p>
                    </header>

                    <form onSubmit={onSubmit} noValidate className="space-y-4">
                        <div>
                            <label htmlFor="login-email" className="form-label">
                                Email
                            </label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                className="form-input w-full"
                                value={form.email}
                                onChange={onChange}
                                placeholder="you@example.com"
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="form-error mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="login-password"
                                className="form-label"
                            >
                                Mật khẩu
                            </label>
                            <div className="input-with-icon">
                                <input
                                    id="login-password"
                                    name="password"
                                    type={showPw ? "text" : "password"}
                                    className="form-input w-full"
                                    value={form.password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    aria-invalid={!!errors.password}
                                    aria-label="Mật khẩu"
                                />
                                <button
                                    type="button"
                                    className="icon-btn"
                                    onClick={() => setShowPw((s) => !s)}
                                    aria-label={
                                        showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                                    }
                                    aria-pressed={showPw}
                                    title={
                                        showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                                    }
                                >
                                    {showPw ? "Ẩn" : "Hiện"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="form-error mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                />{" "}
                                <span>Ghi nhớ tôi</span>
                            </label>
                            <Link to="/quen-mat-khau" className="nh-link">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <div className="mt-3">
                            <div
                                id="googleLoginBtn"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                    </form>
                </div>
            </main>
        </section>
    );
}
export default AdminLogin;
