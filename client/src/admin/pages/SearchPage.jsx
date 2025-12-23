import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faAngleRight,
    faChevronDown,
    faFilter,
} from "@fortawesome/free-solid-svg-icons";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // ========= PHÂN TRANG =========
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);

    // ----- format tiền -----
    const formatPrice = (price) => {
        if (!price) return "Liên hệ";
        return Number(price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    // ========= GỌI API SEARCH =========
    //   useEffect(() => {
    //     const fetchSearchResults = async () => {
    //       if (!query) return;

    //       setLoading(true);
    //       try {
    //         const BACKEND_URL = "http://localhost:5000";

    //         const res = await axios.get(`${BACKEND_URL}/products/search`, {
    //           params: { q: query, page, pageSize: 20 },
    //         });

    //         console.log("API:", res.data);

    //         const data = res.data;

    //         setProducts(Array.isArray(data.data) ? data.data : []);
    //         setTotalPages(data.totalPages || 1);
    //       } catch (error) {
    //         console.error("Lỗi API:", error);
    //         setProducts([]);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchSearchResults();
    //   }, [query, page]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const BACKEND_URL = "http://localhost:5001";

                const res = await axios.get(`${BACKEND_URL}/products/search`, {
                    params: { q: query, page, pageSize: 20 },
                });

                setProducts(res.data.data || []);
                setCategories(res.data.categories || []);
                setTotalPages(res.data.totalPages || 1);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, page]);

    // ========= CHUYỂN TRANG =========
    const handlePageChange = (p) => {
        if (p < 1 || p > totalPages) return;

        setPage(p);

        // cập nhật URL
        setSearchParams({ q: query, page: p });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-[#F9F9F9] min-h-screen pb-10">
            <div className="container mx-auto ">
                <div className="ProductSmartLock-BannerPage">
                    <img
                        src="/productpage/banner-page/banner-pages.png"
                        alt=""
                    />
                </div>

                {/* === PHẦN 2: THANH BREADCRUMB NỔI (Code của bạn) === */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="w-6xl flex justify-center mt-[-40px] mb-10">
                        <div className="bg-white w-5/6 shadow-lg rounded-2xl px-8 py-4 flex items-center gap-3 text-gray-700 text-base border border-gray-100">
                            <Link
                                to="/"
                                className="hover:text-[#C9AC68] font-medium transition-colors"
                            >
                                Trang Chủ
                            </Link>

                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="text-gray-400 text-xs"
                            />

                            <span className="text-[#C9AC68] font-semibold">
                                Kết quả tìm kiếm: "{query}"
                            </span>
                        </div>
                    </div>
                </div>

                <div className="container py-8 px-20 ">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">
                                Kết quả tìm kiếm: “{query}”
                            </h2>
                            <p className="text-gray-500 mt-2 text-sm">
                                Hiển thị {products.length} kết quả phù hợp
                            </p>
                        </div>

                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className="relative group">
                                <select className="appearance-none border border-gray-300 rounded-md px-4 py-2 pr-8 bg-white text-gray-700 text-sm">
                                    <option value="relevance">
                                        Độ liên quan
                                    </option>
                                    <option value="price-asc">
                                        Giá tăng dần
                                    </option>
                                    <option value="price-desc">
                                        Giá giảm dần
                                    </option>
                                </select>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* SIDEBAR GIỮ NGUYÊN */}
                        <div className="hidden lg:block lg:w-1/5 space-y-6">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-100">
                                    <FontAwesomeIcon
                                        icon={faFilter}
                                        className="text-[#C9AC68]"
                                    />
                                    <span>Bộ lọc tìm kiếm</span>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                                        Danh mục
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {categories.map((cat) => (
                                            <li
                                                key={cat.id}
                                                className="flex items-center gap-2 cursor-pointer hover:text-[#C9AC68]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="rounded"
                                                />
                                                <span>
                                                    {cat.ten_danh_muc} (
                                                    {cat.so_luong})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                                        Khoảng giá
                                    </h4>
                                    <div className="flex gap-2 items-center text-sm text-gray-500">
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            0đ
                                        </span>
                                        <span>-</span>
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            50tr
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DANH SÁCH SẢN PHẨM */}
                        <div className="flex-1">
                            {loading && (
                                <div className="text-center py-20 text-gray-500">
                                    Đang tải dữ liệu...
                                </div>
                            )}

                            {!loading && products.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                    <p className="text-gray-500">
                                        Không tìm thấy sản phẩm nào.
                                    </p>
                                </div>
                            )}

                            {!loading && products.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {products.map((item, index) => {
                                        const price = Number(
                                            item.price ||
                                                item.gia ||
                                                item.gia_khuyen_mai ||
                                                0
                                        );
                                        const oldPrice = item.gia_goc
                                            ? Number(item.gia_goc)
                                            : null;

                                        return (
                                            <div
                                                key={item.id || index}
                                                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:border-[#C9AC68]/50 transition-all duration-300 relative"
                                            >
                                                {/* Logo hãng */}
                                                <div className="absolute top-4 left-4 z-10">
                                                    {item.brand_logo_full ? (
                                                        <img
                                                            src={
                                                                item.brand_logo_full
                                                            }
                                                            alt="Brand"
                                                            className="h-4 opacity-80"
                                                        />
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-gray-400">
                                                            {item.brand_name ||
                                                                "NEXAHOME"}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Ảnh */}
                                                <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                                                    <Link
                                                        to={`/san-pham/${item.duong_dan_ten_seo}`}
                                                    >
                                                        <img
                                                            src={
                                                                item.image ||
                                                                item.hinh_anh ||
                                                                item.anh_dai_dien_full
                                                            }
                                                            alt={
                                                                item.ten_san_pham
                                                            }
                                                            className="w-auto h-[80%] group-hover:scale-110 transition-transform duration-500"
                                                            onError={(e) => {
                                                                e.target.src =
                                                                    "https://via.placeholder.com/300?text=No+Image";
                                                            }}
                                                        />
                                                    </Link>
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col flex-grow">
                                                    <Link
                                                        to={`/san-pham/${item.id}`}
                                                    >
                                                        <h3 className="text-gray-800 font-semibold line-clamp-2 min-h-[40px] mb-2 hover:text-[#C9AC68]">
                                                            {item.name ||
                                                                item.ten_san_pham}
                                                        </h3>
                                                    </Link>

                                                    <div className="mt-auto pt-2">
                                                        {oldPrice &&
                                                            oldPrice >
                                                                price && (
                                                                <div className="text-gray-400 text-xs line-through mb-1">
                                                                    {formatPrice(
                                                                        oldPrice
                                                                    )}
                                                                </div>
                                                            )}
                                                        <div className="text-[#D32F2F] font-bold text-lg">
                                                            {formatPrice(price)}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
                                                    <button className="flex-1 border border-[#C9AC68] text-[#C9AC68] text-sm py-2 rounded-lg hover:bg-[#C9AC68] hover:text-white transition-all">
                                                        So sánh
                                                    </button>

                                                    <button
                                                        className="w-10 h-10 flex items-center justify-center bg-[#C9AC68] text-white rounded-lg hover:bg-[#b09456]"
                                                        onClick={() =>
                                                            toast.success(
                                                                "Đã thêm vào giỏ hàng"
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faShoppingCart
                                                            }
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ========= PHÂN TRANG THẬT ========= */}
                            {!loading && products.length > 0 && (
                                <div className="flex justify-center mt-10 gap-2">
                                    <button
                                        onClick={() =>
                                            handlePageChange(page - 1)
                                        }
                                        className="px-4 py-2 border rounded bg-white hover:bg-gray-50"
                                        disabled={page === 1}
                                    >
                                        Trước
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1
                                    ).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => handlePageChange(p)}
                                            className={`px-4 py-2 border rounded ${
                                                p === page
                                                    ? "bg-[#C9AC68] text-white"
                                                    : "bg-white hover:bg-gray-50"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() =>
                                            handlePageChange(page + 1)
                                        }
                                        className="px-4 py-2 border rounded bg-white hover:bg-gray-50"
                                        disabled={page === totalPages}
                                    >
                                        Sau
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
