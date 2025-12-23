// /pages/auth/components/Dangki.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";
import { login as register } from "../../../services/authService";

function Dangki({ setTab }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirm: "",
        agree: false,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((s) => ({
            ...s,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = "Vui lòng nhập họ và tên";
        if (!form.email) e.email = "Vui lòng nhập email";
        if (!form.password) e.password = "Vui lòng nhập mật khẩu";
        if (form.password && form.password.length < 6)
            e.password = "Mật khẩu tối thiểu 6 ký tự";
        if (!form.confirm) e.confirm = "Vui lòng nhập lại mật khẩu";
        if (form.password && form.confirm && form.password !== form.confirm)
            e.confirm = "Mật khẩu không khớp";
        if (!form.agree) e.agree = "Bạn cần đồng ý với điều khoản";
        return e;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const eObj = validate();
        setErrors(eObj);
        if (Object.keys(eObj).length) {
            toast.error("Vui lòng kiểm tra lại các trường bắt buộc.");
            return;
        }

        try {
            setSubmitting(true);
            const res = await register(
                "/auth/register",
                {
                    fullName: form.fullName,
                    email: form.email,
                    password: form.password,
                },
                { withCredentials: true }
            );
            console.log("res register:", res);

            if (res?.ok) {
                console.log("okeekeke", res.message);
                toast.success(res.message, { autoClose: 1400 });
                setTab("login");
            }
        } catch (err) {
            toast.error(err.message || "Đăng ký thất bại");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 md:p-8">
            <header className="mb-6">
                <h2 className="text-2xl md:text-3xl form-title">
                    Tạo tài khoản
                </h2>
                <p className="mt-1 form-subtitle">
                    Bắt đầu mua sắm thiết bị nhà thông minh
                </p>
            </header>

            <form
                onSubmit={onSubmit}
                noValidate
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="md:col-span-2">
                    <label htmlFor="fullName" className="form-label">
                        Họ và tên
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="form-input w-full"
                        value={form.fullName}
                        onChange={onChange}
                        placeholder="Nguyễn Văn A"
                        aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && (
                        <p className="form-error mt-1">{errors.fullName}</p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input w-full"
                        value={form.email}
                        onChange={onChange}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                        <p className="form-error mt-1">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="form-label">
                        Mật khẩu
                    </label>
                    <div className="input-with-icon">
                        <input
                            id="password"
                            name="password"
                            type={showPw ? "text" : "password"}
                            className="form-input w-full"
                            value={form.password}
                            onChange={onChange}
                            placeholder="Tối thiểu 6 ký tự"
                            aria-invalid={!!errors.password}
                            minLength={6}
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
                            title={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        >
                            {showPw ? "Ẩn" : "Hiện"}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="form-error mt-1">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirm" className="form-label">
                        Nhập lại mật khẩu
                    </label>
                    <div className="input-with-icon">
                        <input
                            id="confirm"
                            name="confirm"
                            type={showConfirm ? "text" : "password"}
                            className="form-input w-full"
                            value={form.confirm}
                            onChange={onChange}
                            placeholder="Nhập lại mật khẩu"
                            aria-invalid={!!errors.confirm}
                            aria-label="Xác nhận mật khẩu"
                        />
                        <button
                            type="button"
                            className="icon-btn"
                            onClick={() => setShowConfirm((s) => !s)}
                            aria-label={
                                showConfirm
                                    ? "Ẩn xác nhận mật khẩu"
                                    : "Hiện xác nhận mật khẩu"
                            }
                            aria-pressed={showConfirm}
                            title={showConfirm ? "Ẩn" : "Hiện"}
                        >
                            {showConfirm ? "Ẩn" : "Hiện"}
                        </button>
                    </div>
                    {errors.confirm && (
                        <p className="form-error mt-1">{errors.confirm}</p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={form.agree}
                            onChange={onChange}
                            className="form-checkbox"
                        />
                        <span>
                            Tôi đồng ý với{" "}
                            <Link to="/dieu-khoan" className="nh-link">
                                Điều khoản
                            </Link>{" "}
                            &{" "}
                            <Link to="/bao-mat" className="nh-link">
                                Chính sách bảo mật
                            </Link>
                        </span>
                    </label>
                    {errors.agree && (
                        <p className="form-error mt-1">{errors.agree}</p>
                    )}

                    <div className="mt-3">
                        <div
                            id="googleSignupBtn"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <button
                        className="btn btn-primary w-full"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default Dangki;
