import React, { useState } from "react";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // const submit = async (e) => {
    //   e.preventDefault();
    //   if (!email) {
    //     toast.error("Vui lòng nhập email");
    //     return;
    //   }

    //   try {
    //     setLoading(true);
    //     const res = await api.post("/auth/forgot-password", { email });
    //     toast.success(res.data.message);
    //     setEmail("");
    //   } catch (err) {
    //     toast.error(err.response?.data?.message || "Có lỗi xảy ra");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const submit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Vui lòng nhập email");
            return;
        }

        try {
            setLoading(true);

            const res = await api("/auth/forgot-password", {
                method: "POST",
                body: { email },
                withCred: false, // RẤT QUAN TRỌNG
            });

            toast.success(res.message);
            setEmail("");
        } catch (err) {
            toast.error(err.message || "Có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center p-10 max-w-[500px] mx-auto">
            <h2 className="font-bold text-3xl text-[#b88e2f] uppercase">
                Tạo mật khẩu mới
            </h2>
            <span className="my-6 block">
                Hãy nhập Email của bạn vào bên dưới để bắt đầu quá trình khôi
                phục mật khẩu.
            </span>

            <form onSubmit={submit} className="flex flex-col">
                <label className="text-left">Email</label>
                <input
                    className="border border-solid outline-red-400 p-3 rounded-md mt-2"
                    type="email"
                    placeholder="Nhập email đăng ký"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex justify-between mt-4">
                    <button className="p-3 border border-solid rounded-md hover:bg-slate-200">
                        <Link to="/login" className="flex items-center">
                            <FontAwesomeIcon icon={faAngleLeft} />
                            <span>Quay lại đăng nhập</span>
                        </Link>
                    </button>

                    <button
                        disabled={loading}
                        className="bg-[#b88e2f] p-3 border border-solid rounded-md text-slate-50 hover:bg-[#c39732]"
                    >
                        {loading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
