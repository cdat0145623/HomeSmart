import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faMagnifyingGlass,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { DOMAIN } from "../helper/helper";
function TabletHeader({
    menuOpen,
    setMenuOpen,
    closeAllTablet,
    setShowSearch,
    openDrop1,
    openDrop2,
    openDrop3,
    openDrop4,
    setOpenDrop1,
    setOpenDrop2,
    setOpenDrop3,
    setOpenDrop4,
    userMenuOpen,
    setUserMenuOpen,
}) {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    console.log("TabletHeader User:", user);
    return (
        <>
            <div className="header-navbar_top flex justify-between items-center mb-2">
                <div className="header-navbar_logo">
                    <Link to="/" onClick={closeAllTablet}>
                        <img src="/nexahome.png" alt="Logo" className="h-14" />
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
                                <img
                                    src={`${DOMAIN + user?.avatar_url}`}
                                    alt={user.ho_ten}
                                    className="h-8 w-8 rounded-full object-cover border border-white/30"
                                    referrerPolicy="no-referrer"
                                />
                            </Link>

                            {userMenuOpen && (
                                <div className="absolute right-0  w-56 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                    <div className="px-4 py-3 flex items-center gap-3 border-b">
                                        <img
                                            src={`${DOMAIN + user?.avatar_url}`}
                                            alt={user.ho_ten}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
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
                                        {/* <li><Link className="block px-4 py-2 hover:bg-gray-100" to="/tai-khoan">Lịch sử đơn hàng</Link></li> */}
                                        <li>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={logout}
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
                    <button
                        type="button"
                        className="tablet-menuToggle ml-2 px-3 py-2 rounded border border-white/30 text-white"
                        onClick={() => setMenuOpen((open) => !open)}
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
                            <Link to="/ve-chung-toi" onClick={closeAllTablet}>
                                Về chúng tôi
                            </Link>
                        </li>
                        <li>
                            <Link to="/tin-tuc" onClick={closeAllTablet}>
                                Tin Tức
                            </Link>
                        </li>
                        <li className="tablet-dd">
                            <button
                                type="button"
                                className="tablet-dd-toggle"
                                onClick={() => setOpenDrop1((v) => !v)}
                                aria-expanded={openDrop1}
                            >
                                Khóa cửa thông minh
                                <span
                                    className={`chev ${openDrop1 ? "rot" : ""}`}
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
                                onClick={() => setOpenDrop2((v) => !v)}
                                aria-expanded={openDrop2}
                            >
                                Cửa nhựa Composite{" "}
                                <span
                                    className={`chev ${openDrop2 ? "rot" : ""}`}
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
                                onClick={() => setOpenDrop3((v) => !v)}
                                aria-expanded={openDrop3}
                            >
                                Camera giám sát{" "}
                                <span
                                    className={`chev ${openDrop3 ? "rot" : ""}`}
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
                                onClick={() => setOpenDrop4((v) => !v)}
                                aria-expanded={openDrop4}
                            >
                                Phụ kiện{" "}
                                <span
                                    className={`chev ${openDrop4 ? "rot" : ""}`}
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
                            <Link to="/lien-he" onClick={closeAllTablet}>
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}

export default TabletHeader;
