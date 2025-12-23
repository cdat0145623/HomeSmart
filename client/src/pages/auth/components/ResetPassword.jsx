import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    // const submit = async (e) => {
    //   e.preventDefault();

    //   if (!token) {
    //     toast.error("Token không hợp lệ");
    //     return;
    //   }

    //   if (password.length < 6) {
    //     toast.error("Mật khẩu tối thiểu 6 ký tự");
    //     return;
    //   }

    //   if (password !== confirm) {
    //     toast.error("Mật khẩu nhập lại không khớp");
    //     return;
    //   }

    //   try {
    //     setLoading(true);
    //     const res = await api.post("/auth/reset-password", {
    //       token,
    //       newPassword: password,
    //     });

    //     toast.success(res.data.message);
    //     setTimeout(() => navigate("/dang-nhap"), 1500);
    //   } catch (err) {
    //     toast.error(err.response?.data?.message || "Có lỗi xảy ra");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const submit = async (e) => {
        e.preventDefault();
        console.log("aotung chod djs");
        if (!token) {
            toast.error("Token không hợp lệ");
            return;
        }

        if (password.length < 6) {
            toast.error("Mật khẩu tối thiểu 6 ký tự");
            return;
        }

        if (password !== confirm) {
            toast.error("Mật khẩu nhập lại không khớp");
            return;
        }

        try {
            setLoading(true);

            const res = await api("/auth/reset-password", {
                method: "POST",
                body: {
                    token,
                    newPassword: password,
                },
                withCred: false, // BẮT BUỘC
            });

            toast.success(res.message);
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            toast.error(err.message || "Có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center p-10 max-w-[500px] mx-auto">
            <h2 className="font-bold text-3xl text-[#b88e2f] uppercase">
                Đặt lại mật khẩu
            </h2>

            <form onSubmit={submit} className="flex flex-col gap-2 mt-4">
                <label className="text-left">Mật khẩu mới</label>
                <input
                    className="border border-solid outline-red-400 p-3 rounded-md mt-2"
                    type="password"
                    placeholder="Mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="text-left">Nhập lại mật khẩu</label>
                <input
                    className="border border-solid outline-red-400 p-3 rounded-md mt-2"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                    disabled={loading}
                    className="bg-[#b88e2f] mt-5 p-3 w-full border border-solid rounded-md text-slate-50 hover:bg-[#c39732]"
                >
                    {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
