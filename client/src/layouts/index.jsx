import { useMediaQuery } from "react-responsive";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Layout() {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                theme="colored"
                newestOnTop
                pauseOnFocusLoss={false}
                closeOnClick
                draggable
            />
            {isMobile && <HeaderMobile />}
            {isTabletOrDesktop && <Header />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;
