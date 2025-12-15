import React, { useState } from "react";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";

function CreateUserDialog({ open, onClose, onCreated }) {
const [form, setForm] = useState({
    ho_ten: "",
    email: "",
    vai_tro: "nhan_vien",
    password: "",
});
const [submitting, setSubmitting] = useState(false);

if (!open) return null;

const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
};

const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) return toast.error("Vui lòng nhập email");
    if (!form.vai_tro) return toast.error("Chọn vai trò");

    try {
    setSubmitting(true);
    const res = await api("/users/admin/users", {
        method: "POST",
        withCred: true,
        body: {
        ho_ten: form.ho_ten || null,
        email: form.email,
        vai_tro: form.vai_tro,        
        password: form.password || undefined, 
        },
    });

    const temp = res?.data?.tempPassword;
    toast.success("Tạo tài khoản thành công");
    if (temp) {
        toast.info(`Mật khẩu tạm thời: ${temp}`, { autoClose: 6000 });
    }

    onCreated?.(); 
    onClose?.();
    } catch (e) {
    toast.error(e.message || "Không tạo được tài khoản");
    } finally {
    setSubmitting(false);
    }
};

return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
    <div className="w-full max-w-lg rounded-2xl bg-white shadow-lg">
        <div className="p-5 border-b">
        <h3 className="text-lg font-semibold">Tạo tài khoản</h3>
        </div>
        <form onSubmit={onSubmit} className="p-5 space-y-4">
        <div>
            <label className="block text-sm mb-1">Họ tên</label>
            <input
            name="ho_ten"
            value={form.ho_ten}
            onChange={onChange}
            className="w-full form-input px-3 py-2 rounded border"
            placeholder="(tuỳ chọn)"
            />
        </div>

        <div>
            <label className="block text-sm mb-1">Email *</label>
            <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full form-input px-3 py-2 rounded border"
            placeholder="user@example.com"
            required
            />
        </div>

        <div>
            <label className="block text-sm mb-1">Vai trò *</label>
            <select
            name="vai_tro"
            value={form.vai_tro}
            onChange={onChange}
            className="w-full form-input px-3 py-2 rounded border"
            required
            >
            <option value="nhan_vien">Nhân viên</option>
            <option value="admin">Quản trị</option>
            </select>
        </div>

        <div>
            <label className="block text-sm mb-1">
            Mật khẩu (tuỳ chọn, để trống sẽ tự sinh)
            </label>
            <input
            name="password"
            type="text"
            value={form.password}
            onChange={onChange}
            className="w-full form-input px-3 py-2 rounded border"
            placeholder="Tối thiểu 8 ký tự hoặc để trống"
            />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
            <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
            disabled={submitting}
            >
            Huỷ
            </button>
            <button
            type="submit"
            className="btn btn-primary text-white px-4 py-2 rounded"
            disabled={submitting}
            >
            {submitting ? "Đang tạo…" : "Tạo"}
            </button>
        </div>
        </form>
    </div>
    </div>
);
}
export default CreateUserDialog;