import React from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import Footer from "./Footer";

function Layout({ children }) {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <>
        {isMobile && <HeaderMobile />}
        {isTabletOrDesktop && <Header />}
        <main>{children}</main>
        <Footer />
        </>
    );
}

export default Layout;
