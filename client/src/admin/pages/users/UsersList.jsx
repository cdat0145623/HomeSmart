import React, { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";
import CreateUserDialog from "./CreateUserDialog";

function UsersList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [openCreate, setOpenCreate] = useState(false);

    async function fetchList(p = 1, kw = "") {
        try {
            setLoading(true);
            const qs = new URLSearchParams({
                page: String(p),
                pageSize: "10",
                keyword: kw,
            }).toString();
            const r = await api(`/users/admin/users?${qs}`, {
                method: "GET",
                withCred: true,
            });
            const items = r?.data?.items || [];
            setRows(items);
            setPage(r?.data?.page || 1);
            setTotalPages(r?.data?.totalPages || 1);
        } catch (e) {
            toast.error(e.message || "Không tải được dữ liệu");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchList(1, "");
    }, []);

    const onSearch = (e) => {
        e.preventDefault();
        fetchList(1, keyword.trim());
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                <h2 className="text-xl font-semibold">Người dùng</h2>

                <form onSubmit={onSearch} className="flex items-center gap-2">
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="form-input px-3 py-2 rounded border"
                        placeholder="Tìm theo email, họ tên…"
                    />
                    <button
                        className="btn btn-primary text-white px-4 py-2 rounded"
                        type="submit"
                    >
                        Tìm kiếm
                    </button>
                </form>

                <button
                    className="btn btn-primary text-white px-4 py-2 rounded"
                    onClick={() => setOpenCreate(true)}
                >
                    + Tạo tài khoản
                </button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
                <table className="min-w-[640px] w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-600 border-b">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Họ tên</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Vai trò</th>
                            <th className="px-4 py-3">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    className="px-4 py-6 text-center"
                                    colSpan={5}
                                >
                                    Đang tải…
                                </td>
                            </tr>
                        ) : rows.length ? (
                            rows.map((u) => (
                                <tr
                                    key={u.id}
                                    className="border-b last:border-b-0"
                                >
                                    <td className="px-4 py-3">{u.id}</td>
                                    <td className="px-4 py-3">
                                        {u.ho_ten || "—"}
                                    </td>
                                    <td className="px-4 py-3">{u.email}</td>
                                    <td className="px-4 py-3">{u.vai_tro}</td>
                                    <td className="px-4 py-3">
                                        {u.trang_thai}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="px-4 py-6 text-center"
                                    colSpan={5}
                                >
                                    Chưa có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center gap-2 justify-end mt-4">
                <button
                    className="px-3 py-1 rounded border disabled:opacity-60"
                    disabled={page <= 1}
                    onClick={() => fetchList(page - 1, keyword)}
                >
                    ← Trước
                </button>
                <span className="text-sm text-gray-600">
                    Trang {page}/{totalPages}
                </span>
                <button
                    className="px-3 py-1 rounded border disabled:opacity-60"
                    disabled={page >= totalPages}
                    onClick={() => fetchList(page + 1, keyword)}
                >
                    Sau →
                </button>
            </div>

            <CreateUserDialog
                open={openCreate}
                setOpenCreate={setOpenCreate}
                onCreated={() => fetchList(page, keyword)}
            />
        </section>
    );
}
export default UsersList;
