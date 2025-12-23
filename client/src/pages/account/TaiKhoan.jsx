import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./css/Taikhoan.css";
import {
    User,
    FileText,
    Settings,
    LogOut,
    Camera,
    Save,
    Truck,
    Search,
    Trash2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import httpRequest from "../../utils/httpRequest";
import { DOMAIN } from "../../helper/helper";

const TaiKhoan = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { user } = useAuth();
    // const { me, logout } = useAuth();

    // State lưu danh sách đơn hàng lấy từ DB
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    // State form Profile
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [formData, setFormData] = useState({
        ho_ten: user?.ho_ten || "",
        sdt: user?.sdt || "",
        ngay_sinh: user?.ngay_sinh || "",
        gioi_tinh: user?.gioi_tinh || "",
    });
    const { update } = useAuth();

    // Hàm gọi API lấy đơn hàng thật
    const fetchMyOrders = async () => {
        setIsLoadingOrders(true);
        try {
            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("accessToken");

            if (!token) {
                setIsLoadingOrders(false);
                return;
            }

            // Gọi API lấy danh sách đơn hàng
            const res = await axios.get(
                "http://localhost:5000/api/orders/my-orders",
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            if (res.data.ok) {
                setOrders(res.data.data);
            }
        } catch (error) {
            console.error("Lỗi tải đơn hàng:", error);
            // Nếu lỗi 500 do sai tên cột ở backend, nó sẽ log ra đây
        } finally {
            setIsLoadingOrders(false);
        }
    };

    // --- 2. HÀM HỦY ĐƠN HÀNG ---
    const handleCancelOrder = async (orderId) => {
        if (
            !window.confirm(
                "Bạn có chắc chắn muốn hủy đơn hàng này? Dữ liệu đơn hàng sẽ bị xóa vĩnh viễn."
            )
        ) {
            return;
        }

        try {
            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("accessToken");
            // Gọi API DELETE (Cần đảm bảo Backend đã có route delete này)
            const res = await axios.delete(
                `http://localhost:5000/api/orders/${orderId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.ok) {
                toast.success("Đã hủy đơn hàng thành công!");
                // Load lại danh sách đơn hàng ngay lập tức
                fetchMyOrders();
            } else {
                toast.error(res.data.message || "Không thể hủy đơn hàng");
            }
        } catch (error) {
            console.error("Lỗi khi hủy đơn:", error);
            toast.error(
                "Lỗi kết nối server (Kiểm tra lại Backend đã có hàm deleteOrder chưa)"
            );
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        setFile(selectedFile);
        console.log("file name:", selectedFile);
        if (selectedFile) {
            // Tạo URL tạm thời cho file hình ảnh
            const url = URL.createObjectURL(selectedFile);
            setImageUrl(url); // Cập nhật imageUrl để hiển thị ảnh
        }
    };

    // --- 3. CÁC HÀM XỬ LÝ KHÁC ---
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoadingProfile(true);
        try {
            console.log("user storage:::", user);
            console.log("formData::", formData);
            let res;
            if (file) {
                console.log("have avatar:", file);
                const newUser = { ...formData, avatar: file };
                const formDataToSend = new FormData();

                // Thêm các dữ liệu vào FormData
                for (let key in newUser) {
                    formDataToSend.append(key, newUser[key]);
                }
                res = await httpRequest.put(
                    "users/uploadAvatar/me",
                    formDataToSend,
                    {
                        withCredentials: true,
                    }
                );
            } else {
                res = await httpRequest.put("/users/me", formData, {
                    withCredentials: true,
                });
                console.log("res::", res);
            }

            if (res.data.ok) {
                update(res?.data?.user);
                toast.success("Cập nhật thành công!");
            } else toast.error(res.data.message);
        } catch (error) {
            console.log("error", error);
            toast.error(error?.response?.data?.message);
            // toast.error("Lỗi server khi cập nhật hồ sơ");
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- 4. FORMATTERS & HELPERS ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    /// Cập nhật trạng thái hiển thị
    const getStatusBadge = (status) => {
        // Nếu không có status hoặc status là null -> gán giá trị mặc định
        if (!status)
            return (
                <span
                    className="order-status"
                    style={{ background: "#eee", color: "#666" }}
                >
                    ⚠️ Chưa có trạng thái
                </span>
            );

        const s = String(status).toLowerCase();
        switch (s) {
            case "hoan_thanh":
            case "completed":
                return (
                    <span className="order-status status-success">
                        ✅ Hoàn thành
                    </span>
                );
            case "dang_giao":
            case "shipping":
                return (
                    <span className="order-status status-shipping">
                        <Truck size={14} /> Đang vận chuyển
                    </span>
                );
            case "dang_xu_ly":
                return (
                    <span
                        className="order-status"
                        style={{
                            background: "#e6f7ff",
                            color: "#1890ff",
                            border: "1px solid #91d5ff",
                        }}
                    >
                        ⚙️ Đang xử lý
                    </span>
                );
            case "cho_xac_nhan":
                return (
                    <span
                        className="order-status"
                        style={{ background: "#fff7e6", color: "#d48806" }}
                    >
                        ⏳ Chờ xác nhận
                    </span>
                );
            case "da_huy":
            case "cancelled":
                return (
                    <span className="order-status status-cancel">
                        ❌ Đã hủy
                    </span>
                );
            default:
                return <span className="order-status">{status}</span>;
        }
    };

    // Danh sách Menu
    const menuItems = [
        { id: "profile", label: "Hồ sơ của tôi", icon: <User size={18} /> },
        {
            id: "orders",
            label: "Danh sách đơn hàng",
            icon: <FileText size={18} />,
        },
        { id: "settings", label: "Cài đặt", icon: <Settings size={18} /> },
    ];

    return (
        <div className="account-page">
            <div className="breadcrumb-section">
                <div className="container">
                    <h1 className="page-title">Tài khoản</h1>
                    <div className="breadcrumb-path">
                        <span>🏠 Trang chủ</span> &gt; <span>Tài khoản</span>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="account-layout">
                    {/* SIDEBAR */}
                    <aside className="sidebar">
                        <div className="profile-summary">
                            <div className="avatar-container">
                                <img
                                    src={
                                        imageUrl ||
                                        `${DOMAIN + user?.avatar_url}` ||
                                        ""
                                    }
                                    alt="Avatar"
                                    className="avatar-image"
                                    referrerPolicy="no-referrer"
                                />

                                <button
                                    className="camera-btn"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <Camera size={12} />
                                </button>
                            </div>
                            <h3 className="user-fullname">
                                {user?.ho_ten || formData?.ho_ten}
                            </h3>
                            <p className="user-email">{user?.email}</p>
                        </div>
                        <nav className="menu-list">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    className={`menu-item ${
                                        activeTab === item.id ? "active" : ""
                                    }`}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    <div className="menu-label">
                                        {item.icon} <span>{item.label}</span>
                                    </div>
                                </button>
                            ))}
                            <button
                                className="menu-item logout-btn"
                                // onClick={handleLogoutClick}
                            >
                                <div className="menu-label">
                                    <LogOut size={18} /> <span>Đăng xuất</span>
                                </div>
                            </button>
                        </nav>
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="main-content">
                        {/* --- TAB HỒ SƠ --- */}
                        {activeTab === "profile" && (
                            <div className="profile-content fade-in">
                                <h2 className="section-title">Hồ sơ của tôi</h2>
                                <form
                                    className="profile-form"
                                    onSubmit={handleUpdateProfile}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        ref={fileInputRef}
                                        className="hidden"
                                        name="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Họ tên</label>
                                            <input
                                                className="form-input"
                                                name="ho_ten"
                                                value={formData.ho_ten}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input
                                                className="form-input"
                                                name="sdt"
                                                value={formData.sdt}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                className="form-input disabled"
                                                value={user?.email}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Ngày sinh</label>
                                            <input
                                                type="date"
                                                className="form-input"
                                                name="ngay_sinh"
                                                value={formData.ngay_sinh}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="save-btn"
                                        disabled={isLoadingProfile}
                                    >
                                        <Save size={18} /> Lưu thay đổi
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* --- TAB DANH SÁCH ĐƠN HÀNG --- */}
                        {activeTab === "orders" && (
                            <div className="orders-content fade-in">
                                <h2 className="section-title">
                                    Lịch sử đơn hàng
                                </h2>

                                <div className="order-search-bar">
                                    <Search
                                        size={18}
                                        style={{
                                            color: "#888",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm đơn hàng..."
                                    />
                                </div>

                                {isLoadingOrders ? (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        Đang tải danh sách đơn hàng...
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            padding: "40px",
                                            color: "#666",
                                        }}
                                    >
                                        <p>Bạn chưa có đơn hàng nào.</p>
                                    </div>
                                ) : (
                                    <div className="order-list">
                                        {orders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="order-card"
                                            >
                                                {/* Header: Mã đơn + Trạng thái */}
                                                <div className="order-header">
                                                    <div className="order-id-date">
                                                        <span className="order-id">
                                                            Mã:{" "}
                                                            {order.order_code}
                                                        </span>
                                                        <span className="order-date">
                                                            {" "}
                                                            |{" "}
                                                            {formatDate(
                                                                order.date
                                                            )}
                                                        </span>
                                                    </div>
                                                    {getStatusBadge(
                                                        order.status
                                                    )}
                                                </div>

                                                {/* Items */}
                                                <div className="order-items">
                                                    {order.items.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className="order-item"
                                                            >
                                                                <div className="item-image">
                                                                    <img
                                                                        src={
                                                                            item.image
                                                                        }
                                                                        alt={
                                                                            item.name
                                                                        }
                                                                        onError={(
                                                                            e
                                                                        ) => {
                                                                            e.target.src =
                                                                                "https://via.placeholder.com/80?text=No+Img";
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="item-info">
                                                                    <h4 className="item-name">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </h4>
                                                                    <p className="item-variant">
                                                                        Phân
                                                                        loại:{" "}
                                                                        {
                                                                            item.variant
                                                                        }
                                                                    </p>
                                                                    <div className="item-price-qty">
                                                                        <span className="item-qty">
                                                                            x
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                        </span>
                                                                        <span className="item-price">
                                                                            {formatCurrency(
                                                                                item.price
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>

                                                {/* Footer: Tổng tiền + Nút Hủy */}
                                                <div
                                                    className="order-footer"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "flex-end",
                                                        alignItems: "center",
                                                        marginTop: "15px",
                                                        paddingTop: "15px",
                                                        borderTop:
                                                            "1px dashed #eee",
                                                    }}
                                                >
                                                    <div
                                                        className="order-total"
                                                        style={{
                                                            marginRight: "auto",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#666",
                                                            }}
                                                        >
                                                            Thành tiền:{" "}
                                                        </span>
                                                        <span
                                                            className="total-amount"
                                                            style={{
                                                                fontSize:
                                                                    "18px",
                                                                fontWeight:
                                                                    "bold",
                                                                color: "#d0011b",
                                                            }}
                                                        >
                                                            {formatCurrency(
                                                                order.total
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* 👇 BUTTON HỦY ĐƠN HÀNG 👇 */}
                                                    {/* ĐÃ SỬA: Hiện nút hủy cho cả 'dang_xu_ly' VÀ 'cho_xac_nhan' để bạn test được với đơn cũ */}
                                                    {[
                                                        "dang_xu_ly",
                                                        "cho_xac_nhan",
                                                    ].includes(
                                                        order.status
                                                    ) && (
                                                        <button
                                                            onClick={() =>
                                                                handleCancelOrder(
                                                                    order.id
                                                                )
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "#ff4d4f",
                                                                color: "white",
                                                                border: "none",
                                                                padding:
                                                                    "8px 16px",
                                                                borderRadius:
                                                                    "4px",
                                                                cursor: "pointer",
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "6px",
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight:
                                                                    "500",
                                                                transition:
                                                                    "background 0.2s",
                                                            }}
                                                            onMouseOver={(e) =>
                                                                (e.target.style.background =
                                                                    "#d9363e")
                                                            }
                                                            onMouseOut={(e) =>
                                                                (e.target.style.background =
                                                                    "#ff4d4f")
                                                            }
                                                        >
                                                            <Trash2 size={16} />{" "}
                                                            Hủy đơn hàng
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div>Chức năng đang cập nhật...</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TaiKhoan;
