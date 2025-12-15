import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faMagnifyingGlass,
    faUser,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import "./css/Header.css";
import { useAuth } from "../context/AuthContext";
function Header() {
    const navigate = useNavigate();
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const [showSearch, setShowSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDrop1, setOpenDrop1] = useState(false);
    const [openDrop2, setOpenDrop2] = useState(false);
    const [openDrop3, setOpenDrop3] = useState(false);
    const [openDrop4, setOpenDrop4] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const { me, logout, loading } = useAuth();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const avatarSrc =
        me?.google_avatar_url || me?.avatar_url || "/avatar-default.png";
    const displayName =
        me?.ho_ten || (me?.email ? me.email.split("@")[0] : "Tài khoản");
    const closeAllTablet = () => {
        setMenuOpen(false);
        setOpenDrop1(false);
        setOpenDrop2(false);
        setOpenDrop3(false);
        setOpenDrop4(false);
    };

    useEffect(() => {
        document.body.classList.add("has-fixed-header");
        return () => document.body.classList.remove("has-fixed-header");
    }, []);
    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const total = cart.reduce(
                (sum, item) => sum + (item.quantity || 0),
                0
            );
            setCartCount(total);
        };

        updateCartCount();
        window.addEventListener("cart-updated", updateCartCount);

        return () =>
            window.removeEventListener("cart-updated", updateCartCount);
    }, []);

    return (
        <div className="ConTaiNer-Header w-full fixed top-0 left-0 z-50">
            <div className="header-navbar mx-auto px-4 py-3">
                {isTablet ? (
                    <>
                        <div className="header-navbar_top flex justify-between items-center mb-2">
                            <div className="header-navbar_logo">
                                <Link to="/" onClick={closeAllTablet}>
                                    <img
                                        src="/nexahome.png"
                                        alt="Logo"
                                        className="h-14"
                                    />
                                </Link>
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
                                {loading ? (
                                    <div className="item-users">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                ) : me ? (
                                    <div
                                        className="relative"
                                        onMouseEnter={() =>
                                            setUserMenuOpen(true)
                                        }
                                        onMouseLeave={() =>
                                            setUserMenuOpen(false)
                                        }
                                    >
                                        <Link
                                            to="/tai-khoan"
                                            className="item-users"
                                            aria-label="Tài khoản"
                                            title="Tài khoản"
                                        >
                                            <img
                                                src={avatarSrc}
                                                alt="avatar"
                                                className="h-8 w-8 rounded-full object-cover border border-white/30"
                                                referrerPolicy="no-referrer"
                                            />
                                        </Link>

                                        {userMenuOpen && (
                                            <div className="absolute right-0  w-56 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                                <div className="px-4 py-3 flex items-center gap-3 border-b">
                                                    <img
                                                        src={avatarSrc}
                                                        alt="avatar"
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                    <div className="min-w-0">
                                                        <div className="font-semibold truncate">
                                                            {displayName}
                                                        </div>
                                                        <div className="text-sm text-gray-600 truncate">
                                                            {me.email}
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
                                                            to="/don-hang"
                                                        >
                                                            Lịch sử đơn hàng
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                            onClick={async () => {
                                                                try {
                                                                    await logout();
                                                                    toast.success(
                                                                        "Bạn đã đăng xuất!",
                                                                        {
                                                                            autoClose: 1200,
                                                                            onClose:
                                                                                () =>
                                                                                    navigate(
                                                                                        0
                                                                                    ),
                                                                        }
                                                                    );
                                                                    navigate(
                                                                        "/auth-page",
                                                                        {
                                                                            replace: true,
                                                                        }
                                                                    );
                                                                } catch (err) {
                                                                    toast.error(
                                                                        "Đăng xuất thất bại, vui lòng thử lại."
                                                                    );
                                                                    console.error(
                                                                        "LOGOUT ERROR:",
                                                                        err?.message ||
                                                                            err
                                                                    );
                                                                }
                                                            }}
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
                                        to="/auth-page"
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

                                <button
                                    type="button"
                                    className="tablet-menuToggle ml-2 px-3 py-2 rounded border border-white/30 text-white"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    aria-expanded={menuOpen}
                                    aria-label="Mở menu"
                                >
                                    ☰
                                </button>
                            </div>
                        </div>

                        {menuOpen && (
                            <nav className="tabletMenu px-2 pb-2">
                                <ul className="tabletMenu-list space-y-2">
                                    <li>
                                        <Link
                                            to="/ve-chung-toi"
                                            onClick={closeAllTablet}
                                        >
                                            Về chúng tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/tin-tuc"
                                            onClick={closeAllTablet}
                                        >
                                            Tin Tức
                                        </Link>
                                    </li>
                                    <li className="tablet-dd">
                                        <button
                                            type="button"
                                            className="tablet-dd-toggle"
                                            onClick={() =>
                                                setOpenDrop1((v) => !v)
                                            }
                                            aria-expanded={openDrop1}
                                        >
                                            Khóa cửa thông minh
                                            <span
                                                className={`chev ${
                                                    openDrop1 ? "rot" : ""
                                                }`}
                                            >
                                                &#9662;
                                            </span>
                                        </button>
                                        {openDrop1 && (
                                            <ul className="tablet-dd-sub">
                                                <li>
                                                    <Link
                                                        to="/khoa-van-tay-bosch"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Khóa vân tay BOSCH
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/khoa-cua-huyndai"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Khóa cửa HUYNDAI
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/khoa-cua-hafele"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Khóa cửa HAFELE
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/khoa-cua-hubert"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Khóa cửa HUBERT
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/khoa-cua-ezviz"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Khóa cửa EZVIZ
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/khoa-cua-kassler"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Khóa cửa KASSLER
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/khoa-cua-kaadas"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Khóa cửa KAADAS
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="tablet-dd">
                                        <button
                                            type="button"
                                            className="tablet-dd-toggle"
                                            onClick={() =>
                                                setOpenDrop2((v) => !v)
                                            }
                                            aria-expanded={openDrop2}
                                        >
                                            Cửa nhựa Composite{" "}
                                            <span
                                                className={`chev ${
                                                    openDrop2 ? "rot" : ""
                                                }`}
                                            >
                                                &#9662;
                                            </span>
                                        </button>
                                        {openDrop2 && (
                                            <ul className="tablet-dd-sub">
                                                <li>
                                                    <Link
                                                        to="/cua-phang"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Cửa phẳng
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/cua-nep-kim-loai"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Cửa nẹp kim loại
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/cua-o-kinh"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Cửa ô kính
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/cua-chi-noi"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Cửa chỉ nổi
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/cua-hut-huynh"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Cửa hút huỳnh
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/cua-vom"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Cửa vòm
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="tablet-dd">
                                        <button
                                            type="button"
                                            className="tablet-dd-toggle"
                                            onClick={() =>
                                                setOpenDrop3((v) => !v)
                                            }
                                            aria-expanded={openDrop3}
                                        >
                                            Camera giám sát{" "}
                                            <span
                                                className={`chev ${
                                                    openDrop3 ? "rot" : ""
                                                }`}
                                            >
                                                &#9662;
                                            </span>
                                        </button>
                                        {openDrop3 && (
                                            <ul className="tablet-dd-sub">
                                                <li>
                                                    <Link
                                                        to="/camera-wifi-imou"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Camera Wifi Imou
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/camera-wifi-ezviz"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Camera Wifi Ezviz
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/camera-dahua"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Camera Dahua
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/camera-hikvision"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Camera Hikvision
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/camera-tapo-tp-link"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Camera Tapo-TP-Link
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/camera-hanh-trinh"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Camera hành trình
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="tablet-dd">
                                        <button
                                            type="button"
                                            className="tablet-dd-toggle"
                                            onClick={() =>
                                                setOpenDrop4((v) => !v)
                                            }
                                            aria-expanded={openDrop4}
                                        >
                                            Phụ kiện{" "}
                                            <span
                                                className={`chev ${
                                                    openDrop4 ? "rot" : ""
                                                }`}
                                            >
                                                &#9662;
                                            </span>
                                        </button>
                                        {openDrop4 && (
                                            <ul className="tablet-dd-sub">
                                                <li>
                                                    <Link
                                                        to="/phu-kien-khoa-van-tay"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Phụ kiện khóa vân tay
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/phu-kien-camera"
                                                        onClick={closeAllTablet}
                                                    >
                                                        Phụ kiện camera
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li>
                                        <Link
                                            to="/lien-he"
                                            onClick={closeAllTablet}
                                        >
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </>
                ) : (
                    <>
                        <div className="header-navbar_logo">
                            <Link to="/">
                                <img
                                    src="/nexahome.png"
                                    alt="Logo"
                                    className="h-14"
                                />
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
                            {loading ? (
                                <div className="item-users">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            ) : me ? (
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
                                        <img
                                            src={avatarSrc}
                                            alt="avatar"
                                            className="h-8 w-8 rounded-full object-cover border border-white/30"
                                            referrerPolicy="no-referrer"
                                        />
                                    </Link>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 w-56 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                            <div className="px-4 py-3 flex items-center gap-3 border-b">
                                                <img
                                                    src={avatarSrc}
                                                    alt="avatar"
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                                <div className="min-w-0">
                                                    <div className="font-semibold truncate">
                                                        {displayName}
                                                    </div>
                                                    <div className="text-sm text-gray-600 truncate">
                                                        {me.email}
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="py-1">
                                                <li>
                                                    <Link
                                                        className="block w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                                                        to="/tai-khoan"
                                                    >
                                                        Hồ sơ cá nhân
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="block w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                                                        to="/don-hang"
                                                    >
                                                        Lịch sử đơn hàng
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                                                        onClick={async () => {
                                                            try {
                                                                await logout();
                                                                toast.success(
                                                                    "Bạn đã đăng xuất!",
                                                                    {
                                                                        autoClose: 1200,
                                                                        onClose:
                                                                            () =>
                                                                                navigate(
                                                                                    0
                                                                                ),
                                                                    }
                                                                );
                                                                navigate(
                                                                    "/auth-page",
                                                                    {
                                                                        replace: true,
                                                                    }
                                                                );
                                                            } catch (err) {
                                                                toast.error(
                                                                    "Đăng xuất thất bại, vui lòng thử lại."
                                                                );
                                                                console.error(
                                                                    "LOGOUT ERROR:",
                                                                    err?.message ||
                                                                        err
                                                                );
                                                            }
                                                        }}
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
                                    to="/auth-page"
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
                )}
            </div>

            <div className={`search-overlay ${showSearch ? "is-open" : ""}`}>
                <div
                    className="search-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search"
                >
                    <form
                        className="search-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm…"
                            autoFocus
                        />
                        <button className="search-overlay-submit" type="submit">
                            Tìm kiếm
                        </button>
                        <button
                            type="button"
                            className="search-close-inline"
                            onClick={() => setShowSearch(false)}
                        >
                            Đóng
                        </button>
                    </form>
                </div>
            </div>
        </div>
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

export default Header;
