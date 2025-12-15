import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";

const empty = {
ten_thuong_hieu: "",
duong_dan_ten_seo: "",
logo_thuong_hieu: "",
};

function BrandForm() {
const { id } = useParams();
const isEdit = Boolean(id);
const navigate = useNavigate();
const [search] = useSearchParams();
const [form, setForm] = useState(empty);
const [file, setFile] = useState(null);
const [saving, setSaving] = useState(false);

useEffect(() => {
    (async () => {
    if (isEdit && search.get("delete") === "1") {
        const ok = confirm("Xóa thương hiệu này?");
        if (!ok) return navigate(`/admin/brands/${id}`, { replace: true });
        try {
        const res = await api(`/admin/brands/${id}`, { method: "DELETE", withCred: true });
        if (!res?.ok) throw new Error(res?.message || "Xóa thất bại");
        toast.success("Đã xóa thương hiệu");
        navigate("/admin/brands", { replace: true });
        } catch (e) {
        toast.error(e.message);
        }
    }
    })();
}, [isEdit, id, search, navigate]);

useEffect(() => {
    if (!isEdit) return;
    (async () => {
    const res = await api(`/admin/brands/${id}`, { method: "GET", withCred: true });
    const d = res?.data;
    if (d) setForm({ ...empty, ...d });
    })();
}, [isEdit, id]);

function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
}

function onNameBlur() {
    if (!form.duong_dan_ten_seo && form.ten_thuong_hieu) {
    setForm((s) => ({ ...s, duong_dan_ten_seo: slugify(s.ten_thuong_hieu) }));
    }
}

async function onSubmit(e) {
    e.preventDefault();
    if (!form.ten_thuong_hieu) return toast.error("Vui lòng nhập tên thương hiệu");

    setSaving(true);
    try {
    const fd = new FormData();
    fd.append("ten_thuong_hieu", form.ten_thuong_hieu);
    fd.append("duong_dan_ten_seo", form.duong_dan_ten_seo || "");
    if (file) fd.append("logo_file", file);
    else fd.append("logo_thuong_hieu", form.logo_thuong_hieu || "");

    if (isEdit) {
        await api(`/admin/brands/${id}`, { method: "PUT", withCred: true, data: fd });
        toast.success("Đã cập nhật thương hiệu!");
    } else {
        await api("/admin/brands", { method: "POST", withCred: true, data: fd });
        toast.success("Đã thêm thương hiệu!");
    }
    navigate("/admin/brands", { replace: true });
    } catch (err) {
    toast.error(err.message || "Lưu thất bại");
    } finally {
    setSaving(false);
    }
}

return (
    <section>
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{isEdit ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}</h2>
        <Link to="/admin/brands" className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50">Danh sách</Link>
    </div>

    <form onSubmit={onSubmit} className="max-w-xl space-y-3">
        <Field label="Tên thương hiệu" required>
        <input
            name="ten_thuong_hieu"
            value={form.ten_thuong_hieu}
            onChange={onChange}
            onBlur={onNameBlur}
            className="w-full px-3 py-2 border rounded-lg"
        />
        </Field>

        <Field label="Slug (đường dẫn SEO)">
        <input
            name="duong_dan_ten_seo"
            value={form.duong_dan_ten_seo}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-lg"
        />
        </Field>

        <Field label="Logo (URL)">
        <input
            name="logo_thuong_hieu"
            value={form.logo_thuong_hieu}
            onChange={onChange}
            placeholder="https://..."
            className="w-full px-3 py-2 border rounded-lg"
        />
        </Field>

        <Field label="hoặc Upload logo">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {file && <div className="text-xs text-slate-500 mt-1">{file.name}</div>}
        </Field>

        <div className="flex gap-2 pt-2">
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-60">
            {saving ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo mới"}
        </button>
        <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50">Hủy</button>
        </div>
    </form>
    </section>
);
}

function Field({ label, required, children }) {
return (
    <label className="block">
    <div className="mb-1 text-sm text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
    </div>
    {children}
    </label>
);
}

function slugify(s) {
return String(s)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default  BrandForm;