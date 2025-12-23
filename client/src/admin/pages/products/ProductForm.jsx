// src/admin/pages/products/ProductForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";

const empty = {
    ten_san_pham: "",
    duong_dan_ten_seo: "",
    gia_goc: "",
    gia_khuyen_mai: "",
    thuong_hieu_id: "",
    danh_muc_id: "",
    bao_hanh_thang: 12,
    trang_thai: "hien",
    mo_ta: "",
    thong_so: "{}", // JSON string
    anh_dai_dien: "",
};

function ProductForm() {
    const { id } = useParams();
    const isEdit = Boolean(id === "new" ? false : id);
    const navigate = useNavigate();

    const [form, setForm] = useState(empty);
    const [brands, setBrands] = useState([]);
    const [cats, setCats] = useState([]);
    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        (async () => {
            const [th, dm] = await Promise.all([
                api("/admin/brands", { method: "GET", withCred: true }),
                api("/admin/categories", { method: "GET", withCred: true }),
            ]);
            setBrands(th?.data?.items ?? th?.items ?? []);
            setCats(dm?.data?.items ?? dm?.items ?? []);
        })();
    }, []);

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            console.log("isedit call", isEdit);
            const res = await api(`/admin/products/${id}`, {
                method: "GET",
                withCred: true,
            });
            const p = res?.data;
            if (!p) return;

            setForm({
                ten_san_pham: p.ten_san_pham ?? "",
                duong_dan_ten_seo: p.duong_dan_ten_seo ?? "",
                gia_goc: p.gia_goc ?? "",
                gia_khuyen_mai: p.gia_khuyen_mai ?? "",
                thuong_hieu_id: p.thuong_hieu_id ?? "",
                danh_muc_id: p.danh_muc_id ?? "",
                bao_hanh_thang: p.bao_hanh_thang ?? 12,
                trang_thai: p.trang_thai ?? "hien",
                mo_ta: p.mo_ta ?? "",
                thong_so: p.thong_so
                    ? JSON.stringify(p.thong_so, null, 2)
                    : "{}",
                anh_dai_dien: p.anh_dai_dien ?? "",
            });
        })();
    }, [isEdit, id]);

    const errors = useMemo(() => validate(form), [form]);

    function onChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    function onNameBlur() {
        if (!form.duong_dan_ten_seo && form.ten_san_pham) {
            setForm((s) => ({
                ...s,
                duong_dan_ten_seo: slugify(s.ten_san_pham),
            }));
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length) {
            toast.error("Vui lòng điền đầy đủ hợp lệ.");
            return;
        }

        let thongSoJson = null;
        try {
            thongSoJson = form.thong_so ? JSON.parse(form.thong_so) : null;
        } catch {
            toast.error("Thông số (JSON) không hợp lệ.");
            return;
        }

        setSaving(true);
        try {
            const fd = new FormData();
            [
                "ten_san_pham",
                "duong_dan_ten_seo",
                "gia_goc",
                "gia_khuyen_mai",
                "thuong_hieu_id",
                "danh_muc_id",
                "bao_hanh_thang",
                "trang_thai",
                "mo_ta",
            ].forEach((k) => {
                const value = form[k] ?? "";
                console.log("formk:", value);
                fd.append(k, form[k] ?? "");
            });

            fd.append(
                "thong_so",
                thongSoJson ? JSON.stringify(thongSoJson) : ""
            );

            if (file) {
                console.log("co file", file);
                fd.append("anh_dai_dien_file", file);
            } else {
                console.log("ko co file:");
                fd.append("anh_dai_dien", form.anh_dai_dien || "");
            }

            if (isEdit) {
                console.log("anh dai dien::", form.anh_dai_dien);
                console.log("fd::", fd);
                const res = await api(`/admin/products/update/${id}`, {
                    method: "PUT",
                    withCred: true,
                    data: fd,
                });
                if (res?.ok) {
                    toast.success("Cập nhật thành công sản phẩm mới!", {
                        autoClose: 1200,
                    });
                    navigate("/admin/products", { replace: true });
                }
            } else {
                const res = await api("/admin/products/create", {
                    method: "POST",
                    withCred: true,
                    data: fd,
                });
                if (res?.ok) {
                    toast.success("Tạo thành công sản phẩm mới!", {
                        autoClose: 1200,
                    });
                    navigate(-1);
                }
            }
        } catch (err) {
            console.error("[ProductForm] Submit error:", err);
            toast.error(err.message || "Lưu sản phẩm thất bại");
        } finally {
            setSaving(false);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </h2>
            </div>

            <form
                onSubmit={onSubmit}
                className="grid md:grid-cols-3 gap-4"
                encType="multipart/form-data"
            >
                <div className="md:col-span-2 space-y-3">
                    <Field label="Tên sản phẩm" error={errors.ten_san_pham}>
                        <input
                            name="ten_san_pham"
                            value={form.ten_san_pham}
                            onChange={onChange}
                            onBlur={onNameBlur}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>

                    <Field
                        label="Slug (đường dẫn SEO)"
                        error={errors.duong_dan_ten_seo}
                    >
                        <input
                            name="duong_dan_ten_seo"
                            value={form.duong_dan_ten_seo}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>

                    <Field label="Mô tả">
                        <textarea
                            name="mo_ta"
                            value={form.mo_ta}
                            onChange={onChange}
                            rows={4}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>

                    <Field label="Thông số (JSON)">
                        <textarea
                            name="thong_so"
                            value={form.thong_so}
                            onChange={onChange}
                            rows={8}
                            className="w-full font-mono text-sm px-3 py-2 border rounded-lg"
                        />
                    </Field>
                </div>

                <div className="space-y-3">
                    <Field label="Thương hiệu">
                        <select
                            name="thuong_hieu_id"
                            value={form.thuong_hieu_id}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        >
                            <option value="">— Chọn thương hiệu —</option>
                            {brands.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.ten_thuong_hieu}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Danh mục">
                        <select
                            name="danh_muc_id"
                            value={form.danh_muc_id}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        >
                            <option value="">— Chọn danh mục —</option>
                            {cats.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.ten_danh_muc}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Giá gốc">
                            <input
                                name="gia_goc"
                                value={form.gia_goc}
                                onChange={onChange}
                                type="number"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </Field>
                        <Field label="Giá KM">
                            <input
                                name="gia_khuyen_mai"
                                value={form.gia_khuyen_mai}
                                onChange={onChange}
                                type="number"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Bảo hành (tháng)">
                            <input
                                name="bao_hanh_thang"
                                value={form.bao_hanh_thang}
                                onChange={onChange}
                                type="number"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </Field>

                        <Field label="Trạng thái">
                            <select
                                name="trang_thai"
                                value={form.trang_thai}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="hien">hien</option>
                                <option value="an">an</option>
                            </select>
                        </Field>
                    </div>

                    <Field label="Ảnh đại diện (URL)">
                        <input
                            name="anh_dai_dien"
                            value={form.anh_dai_dien}
                            onChange={onChange}
                            placeholder="https://..."
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>
                    <Field label="hoặc Upload ảnh">
                        <input
                            name="upfileImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setFile(e.target.files[0] ?? null);
                                console.log("file name:", e.target.files[0]);
                            }}
                        />
                        {file && (
                            <div className="text-xs text-slate-500 mt-1">
                                {file.name}
                            </div>
                        )}
                    </Field>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-60"
                        >
                            {saving
                                ? "Đang lưu..."
                                : isEdit
                                ? "Cập nhật"
                                : "Tạo mới"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default ProductForm;

function Field({ label, error, children }) {
    return (
        <label className="block">
            <div className="mb-1 text-sm text-slate-600">{label}</div>
            {children}
            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
        </label>
    );
}

function slugify(s) {
    return String(s)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

function validate(f) {
    const e = {};
    if (!f.ten_san_pham) e.ten_san_pham = "Bắt buộc.";
    if (!f.duong_dan_ten_seo) e.duong_dan_ten_seo = "Bắt buộc.";
    return e;
}
