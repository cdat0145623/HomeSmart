import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faMagnifyingGlass,
    faUser,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import httpRequest from "../utils/httpRequest";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { DOMAIN } from "../helper/helper";
function PCHeader({ setShowSearch, userMenuOpen, setUserMenuOpen }) {
    const { user, logout } = useAuth();
    const { cartCount, updatedCartCount } = useCart();

    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await httpRequest.delete("/auth/logout", {
            withCredentials: true,
        });
        if (res.data?.ok) {
            updatedCartCount(0);
            logout();
        }
        toast.success("Bạn đã đăng xuất!", {
            autoClose: 1200,
        });
        navigate("/login", { replace: true });
    };

    return (
        <>
            <div className="header-navbar_logo">
                <Link to="/">
                    <img src="/nexahome.png" alt="Logo" className="h-14" />
                </Link>
            </div>
            <div className="header-navbar_menu">
                <ul className="list-menu flex space-x-6 items-center text-[15px] font-medium">
                    {renderMenu()}
                </ul>
            </div>
            <div className="header-navbar_item flex items-center gap-4 text-lg">
                <button
                    type="button"
                    className="item-search"
                    onClick={() => setShowSearch(true)}
                    aria-label="Mở tìm kiếm"
                    title="Tìm kiếm"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                {user ? (
                    <div
                        className="relative"
                        onMouseEnter={() => setUserMenuOpen(true)}
                        onMouseLeave={() => setUserMenuOpen(false)}
                    >
                        <Link
                            to="/tai-khoan"
                            className="item-users"
                            aria-label="Tài khoản"
                            title="Tài khoản"
                        >
                            {user?.avatar_url ? (
                                <img
                                    src={`${DOMAIN + user?.avatar_url}`}
                                    alt={user?.ho_ten}
                                    className="h-10 w-10 rounded-full object-cover border border-white/30"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-[9999px] text-center border bg-slate-50 grid place-items-center text-xs text-slate-400">
                                    No img
                                </div>
                            )}
                        </Link>

                        {userMenuOpen && (
                            <div className="absolute right-0  w-56 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                <div className="px-4 py-3 flex items-center gap-3 border-b">
                                    {user?.avatar_url ? (
                                        <img
                                            src={`${DOMAIN + user?.avatar_url}`}
                                            alt={user?.ho_ten}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-[9999px] text-center border bg-slate-50 grid place-items-center text-xs text-slate-400">
                                            No img
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <div className="font-semibold truncate">
                                            {user.ho_ten}
                                        </div>
                                        <div className="text-sm text-gray-600 truncate">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <ul className="py-1">
                                    <li>
                                        <Link
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            to="/tai-khoan"
                                        >
                                            Hồ sơ cá nhân
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            to="/order/order-history"
                                        >
                                            Lịch sử đơn hàng
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="item-users"
                        aria-label="Tài khoản"
                        title="Tài khoản"
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                )}
                <Link to="/cart" className="item-cart relative">
                    <FontAwesomeIcon icon={faShoppingCart} />

                    {cartCount > 0 && (
                        <span
                            className="
                           absolute -top-2 -right-2
                           bg-red-500 text-white text-xs rounded-full
                           px-1.5 py-0.5
                      "
                        >
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </>
    );
}
const renderMenu = () => (
    <>
        <li className="relative group">
            <Link to="/khoa-cua-thong-minh">
                Khóa cửa thông minh <FontAwesomeIcon icon={faAngleDown} />
            </Link>
            <ul className="list-menu_secure absolute hidden group-hover:block">
                <li>
                    <Link to="/khoa-van-tay-bosch">Khóa vân tay BOSCH</Link>
                </li>
                <li>
                    <Link to="/khoa-cua-huyndai">Khóa cửa HUYNDAI</Link>
                </li>
                <li>
                    <Link to="/khoa-cua-hafele">Khóa cửa HAFELE</Link>
                </li>
                <li>
                    <Link to="/khoa-cua-hubert">Khóa cửa HUBERT</Link>
                </li>
                <li>
                    <Link to="/khoa-cua-ezviz">Khóa cửa EZVIZ</Link>
                </li>
                <li>
                    <Link to="/khoa-cua-kassler">Khóa cửa KASSLER</Link>
                </li>
                <li>
                    <Link to="/khoa-cua-kaadas">Khóa cửa KAADAS</Link>
                </li>
            </ul>
        </li>
        <li className="relative group">
            <Link to="/cua-nhua-composite">
                Cửa nhựa Composite <FontAwesomeIcon icon={faAngleDown} />
            </Link>
            <ul className="list-menu_secure absolute hidden group-hover:block">
                <li>
                    <Link to="/cua-phang">Cửa phẳng</Link>
                </li>
                <li>
                    <Link to="/cua-nep-kim-loai">Cửa nẹp kim loại</Link>
                </li>
                <li>
                    <Link to="/cua-o-kinh">Cửa ô kính</Link>
                </li>
                <li>
                    <Link to="/cua-chi-noi">Cửa chỉ nổi</Link>
                </li>
                <li>
                    <Link to="/cua-hut-huynh">Cửa hút huỳnh</Link>
                </li>
                <li>
                    <Link to="/cua-vom">Cửa vòm</Link>
                </li>
            </ul>
        </li>
        <li className="relative group">
            <Link to="/camera">
                Camera giám sát <FontAwesomeIcon icon={faAngleDown} />
            </Link>
            <ul className="list-menu_secure absolute hidden group-hover:block">
                <li>
                    <Link to="/camera-wifi-imou">Camera Wifi Imou</Link>
                </li>
                <li>
                    <Link to="/camera-wifi-ezviz">Camera Wifi Ezviz</Link>
                </li>
                <li>
                    <Link to="/camera-dahua">Camera Dahua</Link>
                </li>
                <li>
                    <Link to="/camera-hikvision">Camera Hikvision</Link>
                </li>
                <li>
                    <Link to="/camera-tapo-tp-link">Camera Tapo-TP-Link</Link>
                </li>
                <li>
                    <Link to="/camera-hanh-trinh">Camera hành trình</Link>
                </li>
            </ul>
        </li>
        <li className="relative group">
            <Link to="/phu-kien">
                Phụ kiện <FontAwesomeIcon icon={faAngleDown} />
            </Link>
            <ul className="list-menu_secure absolute hidden group-hover:block">
                <li>
                    <Link to="/phu-kien-khoa-van-tay">
                        Phụ kiện khóa vân tay
                    </Link>
                </li>
                <li>
                    <Link to="/phu-kien-camera">Phụ kiện camera</Link>
                </li>
            </ul>
        </li>
        <li>
            <Link to="/ve-chung-toi">Về chúng tôi</Link>
        </li>
        <li>
            <Link to="/tin-tuc">Tin tức</Link>
        </li>
        <li>
            <Link to="/lien-he">Liên hệ</Link>
        </li>
    </>
);

export default PCHeader;
