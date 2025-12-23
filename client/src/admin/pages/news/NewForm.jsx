import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import httpRequest from "../../../utils/httpRequest";
import { DOMAIN } from "../../../helper/helper";

const empty = {
    tieu_de: "",
    duong_dan_ten_seo: "",
    tom_tat: "",
    noi_dung: "",
    trang_thai: "hien",
    anh_dai_dien: "",
};

function NewsForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState(empty);
    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isEdit) return;
        console.log("client id bai viet:::", id);
        const fetchNews = async () => {
            const res = await httpRequest.get(`/admin/news/${id}`, {
                withCredentials: true,
            });
            setForm(res.data?.news ?? empty);
            console.log("res api fetchNews s ss ::", res);
        };
        fetchNews();
        // (async () => {
        //     const res = await api(`/admin/news/${id}`, {
        //         withCredentials: true,
        //     });
        //     setForm(res ?? empty);
        // })();
    }, [id, isEdit]);

    const errors = useMemo(() => {
        const e = {};
        if (!form.tieu_de) e.tieu_de = "Bắt buộc";
        if (!form.duong_dan_ten_seo) e.duong_dan_ten_seo = "Bắt buộc";
        return e;
    }, [form]);

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function onTitleBlur() {
        if (!form.duong_dan_ten_seo && form.tieu_de) {
            setForm((s) => ({ ...s, duong_dan_ten_seo: slugify(s.tieu_de) }));
        }
    }
    //   function onNameBlur() {
    //   if (!form.duong_dan_ten_seo && form.ten_san_pham) {
    //     setForm((s) => ({ ...s, duong_dan_ten_seo: slugify(s.ten_san_pham) }));
    //   }
    // }

    async function onSubmit(e) {
        e.preventDefault();

        if (Object.keys(errors).length) {
            toast.error("Vui lòng nhập đủ dữ liệu");
            return;
        }

        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ""));
            if (file) fd.append("anh_dai_dien_file", file);

            if (isEdit) {
                await api(`/admin/news/${id}`, {
                    method: "PUT",
                    data: fd,
                    withCredentials: true,
                });
                toast.success("Đã cập nhật bài viết");
            } else {
                await api("/admin/news", {
                    method: "POST",
                    data: fd,
                    withCredentials: true,
                });
                toast.success("Đã thêm bài viết");
            }

            navigate("/admin/dashboard/news");
        } finally {
            setSaving(false);
        }
    }

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">
                {isEdit ? "Cập nhật bài viết" : "Thêm bài viết"}
            </h2>

            <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                    <Field label="Tiêu đề" error={errors.tieu_de}>
                        <input
                            name="tieu_de"
                            value={form.tieu_de}
                            onChange={onChange}
                            onBlur={onTitleBlur}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>

                    <Field label="Slug" error={errors.duong_dan_ten_seo}>
                        <input
                            name="duong_dan_ten_seo"
                            value={form.duong_dan_ten_seo}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>

                    <Field label="Mô tả ngắn">
                        <textarea
                            name="tom_tat"
                            value={form.tom_tat}
                            onChange={onChange}
                            rows={3}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>

                    <Field label="Nội dung">
                        <Editor
                            apiKey="2bziolpdo8q3fpzww8spaucx8449sg0svzgfept580cgxyf2"
                            value={form.noi_dung}
                            init={{
                                height: 400,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | bold italic underline | " +
                                    "alignleft aligncenter alignright alignjustify | " +
                                    "bullist numlist outdent indent | link image | removeformat",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                            onEditorChange={(content) =>
                                setForm((s) => ({ ...s, noi_dung: content }))
                            }
                        />
                    </Field>
                    {/* <Field label="Nội dung">
            <Editor
              apiKey="2bziolpdo8q3fpzww8spaucx8449sg0svzgfept580cgxyf2"
              value={form.noi_dung}
              init={{
                height: 450,
                menubar: false,
                plugins: "lists link table code",
                toolbar:
                  "undo redo | bold italic underline | h2 h3 | " +
                  "bullist numlist | link table | removeformat",

                content_style: `
                  body {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    line-height: 1.8;
                    padding: 12px;
                  }

                  h2 { margin-top: 24px; }
                  h3 { margin-top: 20px; }
                  p  { margin: 16px 0; }
                `,
              }}
              onEditorChange={(content) =>
                setForm((s) => ({ ...s, noi_dung: content }))
              }
            />
          </Field> */}

                    {/* <Field label="Nội dung">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_KEY}
              value={form.noi_dung}
              init={{
                height: 500,
                menubar: true,
                plugins:
                  "advlist autolink lists link image charmap preview anchor " +
                  "searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                toolbar:
                  "undo redo | blocks | bold italic underline | " +
                  "alignleft aligncenter alignright | " +
                  "bullist numlist | link image media | code",

                images_upload_handler: (blobInfo) =>
                  new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://localhost:5000/admin/news/upload-image");
                    xhr.withCredentials = true;

                    xhr.onload = () => {
                      const json = JSON.parse(xhr.responseText);
                      if (!json.location) return reject("Upload failed");
                      resolve(json.location);
                    };

                    const fd = new FormData();
                    fd.append("file", blobInfo.blob(), blobInfo.filename());
                    xhr.send(fd);
                  }),
              }}
              onEditorChange={(content) =>
                setForm((s) => ({ ...s, noi_dung: content }))
              }
            />

          </Field> */}
                </div>

                <div className="space-y-3">
                    <Field label="Trạng thái">
                        <select
                            name="trang_thai"
                            value={form.trang_thai}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        >
                            <option value="hien">Hiện</option>
                            <option value="an">Ẩn</option>
                        </select>
                    </Field>

                    <Field label="Ảnh đại diện (URL)">
                        <input
                            name="anh_dai_dien"
                            value={form.anh_dai_dien}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </Field>

                    <Field label="Hoặc upload ảnh">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0])}
                        />
                    </Field>
                    {(file || form.anh_dai_dien) && (
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : form.anh_dai_dien.startsWith("http")
                                    ? form.anh_dai_dien
                                    : `${DOMAIN + form.anh_dai_dien}`
                            }
                            alt="preview"
                            className="mt-2 w-full max-h-60 object-cover rounded"
                        />
                    )}

                    <button
                        disabled={saving}
                        className="w-full px-4 py-2 rounded-lg bg-orange-600 text-white"
                    >
                        {saving ? "Đang lưu..." : "Lưu bài viết"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default NewsForm;

function Field({ label, error, children }) {
    return (
        <label className="block">
            <div className="mb-1 text-sm text-slate-600">{label}</div>
            {children}
            {error && <div className="text-xs text-red-600">{error}</div>}
        </label>
    );
}

function slugify(s) {
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}
