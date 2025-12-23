import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./css/Header.css";
import TabletHeader from "./TabletHeader";
import PCHeader from "./PCHeader";
import { useAuth } from "../context/AuthContext";
import httpRequest from "../utils/httpRequest";
import { useCart } from "../context/CartContext";
import Search from "./Search";

function Header() {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const [showSearch, setShowSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDrop1, setOpenDrop1] = useState(false);
    const [openDrop2, setOpenDrop2] = useState(false);
    const [openDrop3, setOpenDrop3] = useState(false);
    const [openDrop4, setOpenDrop4] = useState(false);

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { cartCount, updatedCartCount } = useCart();
    const { user } = useAuth();

    const closeAllTablet = () => {
        setMenuOpen(false);
        setOpenDrop1(false);
        setOpenDrop2(false);
        setOpenDrop3(false);
        setOpenDrop4(false);
    };

    useEffect(() => {
        if (!user) return;
        // console.log("Header dang goi");
        try {
            const fetchCart = async () => {
                const cart = await httpRequest.get("/api/cart", {
                    withCredentials: true,
                });
                updatedCartCount(cart?.data?.total_quantity);
            };
            fetchCart();
        } catch (error) {
            console.log("Error at HEADER:", error);
        }
    }, [user, cartCount]);

    useEffect(() => {
        document.body.classList.add("has-fixed-header");
        return () => document.body.classList.remove("has-fixed-header");
    }, []);

    return (
        <div className="ConTaiNer-Header w-full fixed top-0 left-0 z-50">
            <div className="header-navbar mx-auto px-4 py-3">
                {isTablet ? (
                    <TabletHeader
                        userMenuOpen={userMenuOpen}
                        setUserMenuOpen={setUserMenuOpen}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        closeAllTablet={closeAllTablet}
                        setShowSearch={setShowSearch}
                        openDrop1={openDrop1}
                        openDrop2={openDrop2}
                        openDrop3={openDrop3}
                        openDrop4={openDrop4}
                        setOpenDrop1={setOpenDrop1}
                        setOpenDrop2={setOpenDrop2}
                        setOpenDrop3={setOpenDrop3}
                        setOpenDrop4={setOpenDrop4}
                    />
                ) : (
                    <PCHeader
                        userMenuOpen={userMenuOpen}
                        setUserMenuOpen={setUserMenuOpen}
                        setShowSearch={setShowSearch}
                    />
                )}
            </div>

            <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        </div>
    );
}

export default Header;
