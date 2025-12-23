// import React, { Suspense, lazy } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Layout from "./layouts";
// import Home from "./pages/home/Home";
// import News from "./pages/news/News";
// import About from "./pages/about/About";
// import ProductSmartLock from "./pages/products/ProductSmartLock";
// import BrandAll from "./pages/products/BrandAll";
// import Contact from "./pages/contact/Contact";
// import AuthPage from "./pages/auth/auth";
// import Taikhoan from "./pages/account/TaiKhoan";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CartPage from "./pages/cart/CartPage";
// import OrderHistoryPage from "./pages/cart/OrderHistoryPage";
// import Checkout from "./pages/cart/Checkout";
// import OrderDetailPage from "./pages/cart/OrderDetailPage";
// import OrderSuccess from "./pages/cart/OrderSuccess";
// import NewsDetail from "./pages/news/controller/NewsDetail";
// import ProductDetail from "./pages/products/ProductDetail";
// import BoschFingerprintLock from "./pages/products/bosch/BoschFingerprintLock";
// import HyundaiDoorLock from "./pages/products/hyundai/HyundaiDoorLock";
// import HafeleDoorLock from "./pages/products/hafele/HafeleDoorLock";
// import HubertDoorLock from "./pages/products/hubert/HubertDoorLock";
// import EzvizDoorLock from "./pages/products/ezviz/EzvizDoorLock";
// import Kassler from "./pages/products/kassler/Kassler";
// import Kaadas from "./pages/products/kaadas/Kaadas";
// import CuaPhang from "./pages/products/cuaphang/CuaPhang";
// import CuaNepKimLoai from "./pages/products/cuanepkimloai/CuaNepKimLoai";
// import CuaOKinh from "./pages/products/cuaokinh/CuaOKinh";
// import CuaChiNoi from "./pages/products/cuachinoi/CuaChiNoi";
// import CuaHutHuynh from "./pages/products/cuahuthuynh/CuaHutHuynh";
// import CuaVOM from "./pages/products/cuavom/CuaVOM";
// import CameraIMOU from "./pages/products/cameraimou/CameraIMOU";
// import CameraEZVIZ from "./pages/products/cameraezviz/CameraEZVIZ";
// import CameraDAHUA from "./pages/products/cameradahua/CameraDAHUA";
// import CameraHikvision from "./pages/products/camerahikivison/CameraHikvision";
// import CameraTapoTPLink from "./pages/products/cameratapotplink/CameraTapoTPLink";
// import CameraHanhTrinh from "./pages/products/camerahanhtrinh/CameraHanhTrinh";
// import FingerprintAccessories from "./pages/products/phukienkhoavantay/PhuKienKhoaVanTay";
// import CameraAccessories from "./pages/products/phukiencamera/PhuKienCamera";
// import ProductDoor from "./pages/products/ProductDoor";
// import ProductCamera from "./pages/products/ProductCamera";
// import ProductAccessory from "./pages/products/ProductAccessory";
// import SmartLock from "./pages/products/lock/SmartLock";
// const AdminLayout = lazy(() => import("./admin/adminlayout/AdminLayout"));
// const RequireAdmin = lazy(() => import("./admin/components/RequireAdmin"));
// const AdminDashboard = lazy(() => import("./admin/pages/Dashboard"));
// const AdminUsers = lazy(() => import("./admin/pages/users/UsersList"));
// const AdminProducts = lazy(() => import("./admin/pages/products/ProductsList"));
// const AdminProductForm = lazy(() =>
//     import("./admin/pages/products/ProductForm")
// );
// const AdminBrands = lazy(() => import("./admin/pages/brands/BrandsList"));
// const AdminBrandForm = lazy(() => import("./admin/pages/brands/BrandForm"));
// const AdminOrdersList = lazy(() =>
//     import("./admin/pages/orders/AdminOrdersList")
// );
// const AdminOrderDetail = lazy(() =>
//     import("./admin/pages/orders/AdminOrderDetail")
// );

// function App() {
//     const location = useLocation();
//     const isAdminRoute =
//         location.pathname === "/admin" ||
//         location.pathname.startsWith("/admin/");

//     return (
//         <>
//             <Suspense fallback={<div className="p-6">Đang tải admin…</div>}>
//                 <Routes>
//                     <Route
//                         path="/admin/"
//                         element={
//                             <RequireAdmin>
//                                 <AdminLayout />
//                             </RequireAdmin>
//                         }
//                     >
//                         <Route index element={<AdminDashboard />} />
//                         <Route path="users" element={<AdminUsers />} />
//                         <Route path="products" element={<AdminProducts />} />
//                         <Route
//                             path="products/new"
//                             element={<AdminProductForm />}
//                         />
//                         <Route
//                             path="products/:id"
//                             element={<AdminProductForm />}
//                         />
//                         <Route path="brands" element={<AdminBrands />} />
//                         <Route path="brands/new" element={<AdminBrandForm />} />
//                         <Route path="brands/:id" element={<AdminBrandForm />} />
//                         <Route path="orders" element={<AdminOrdersList />} />
//                         <Route
//                             path="orders/:id"
//                             element={<AdminOrderDetail />}
//                         />
//                     </Route>
//                 </Routes>
//             </Suspense>

//             {!isAdminRoute && (
//                 <Layout>
//                     <ToastContainer
//                         position="top-center"
//                         autoClose={2200}
//                         theme="colored"
//                         newestOnTop
//                         pauseOnFocusLoss={false}
//                         closeOnClick
//                         draggable
//                     />
//                     <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route
//                             path="/san-pham/:slug"
//                             element={<ProductDetail />}
//                         />

//                         <Route path="/tin-tuc" element={<News />} />
//                         <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
//                         <Route path="/ve-chung-toi" element={<About />} />
//                         <Route
//                             path="/khoa-cua-thong-minh"
//                             element={<SmartLock />}
//                         />
//                         <Route
//                             path="/cua-nhua-composite"
//                             element={<ProductDoor />}
//                         />
//                         <Route
//                             path="/thuong-hieu/:slug"
//                             element={<BrandAll />}
//                         />
//                         <Route path="/lien-he" element={<Contact />} />
//                         <Route path="/auth-page" element={<AuthPage />} />
//                         <Route path="/dang-nhap" element={<AuthPage />} />
//                         <Route path="/dang-ky" element={<AuthPage />} />
//                         <Route path="/tai-khoan" element={<Taikhoan />} />
//                         <Route path="/cart" element={<CartPage />} />
//                         <Route
//                             path="/order-history"
//                             element={<OrderHistoryPage />}
//                         />
//                         <Route path="/checkout" element={<Checkout />} />
//                         <Route
//                             path="/order/:id"
//                             element={<OrderDetailPage />}
//                         />
//                         <Route
//                             path="/order-success"
//                             element={<OrderSuccess />}
//                         />
//                         <Route
//                             path="/khoa-van-tay-bosch"
//                             element={<BoschFingerprintLock />}
//                         />
//                         <Route
//                             path="/khoa-cua-huyndai"
//                             element={<HyundaiDoorLock />}
//                         />
//                         <Route
//                             path="/khoa-cua-hafele"
//                             element={<HafeleDoorLock />}
//                         />
//                         <Route
//                             path="/khoa-cua-hubert"
//                             element={<HubertDoorLock />}
//                         />
//                         <Route
//                             path="/khoa-cua-ezviz"
//                             element={<EzvizDoorLock />}
//                         />
//                         <Route path="/khoa-cua-kassler" element={<Kassler />} />
//                         <Route path="/khoa-cua-kaadas" element={<Kaadas />} />
//                         <Route path="/cua-phang" element={<CuaPhang />} />
//                         <Route
//                             path="/cua-nep-kim-loai"
//                             element={<CuaNepKimLoai />}
//                         />
//                         <Route path="/cua-o-kinh" element={<CuaOKinh />} />
//                         <Route path="/cua-chi-noi" element={<CuaChiNoi />} />
//                         <Route
//                             path="/cua-hut-huynh"
//                             element={<CuaHutHuynh />}
//                         />
//                         <Route path="/cua-vom" element={<CuaVOM />} />
//                         <Route path="/camera" element={<ProductCamera />} />
//                         <Route
//                             path="/camera-wifi-imou"
//                             element={<CameraIMOU />}
//                         />
//                         <Route
//                             path="/camera-wifi-ezviz"
//                             element={<CameraEZVIZ />}
//                         />
//                         <Route path="/camera-dahua" element={<CameraDAHUA />} />
//                         <Route
//                             path="/camera-hikvision"
//                             element={<CameraHikvision />}
//                         />
//                         <Route
//                             path="/camera-tapo-tp-link"
//                             element={<CameraTapoTPLink />}
//                         />
//                         <Route
//                             path="/camera-hanh-trinh"
//                             element={<CameraHanhTrinh />}
//                         />
//                         <Route
//                             path="/phu-kien"
//                             element={<ProductAccessory />}
//                         />
//                         <Route
//                             path="/phu-kien-khoa-van-tay"
//                             element={<FingerprintAccessories />}
//                         />
//                         <Route
//                             path="/phu-kien-camera"
//                             element={<CameraAccessories />}
//                         />
//                     </Routes>
//                 </Layout>
//             )}
//         </>
//     );
// }

// export default App;

import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/home/Home";
import AuthPage from "./pages/auth/auth";
import RequireAuth from "./components/RequireAuth";
import TaiKhoan from "./pages/account/TaiKhoan.jsx";
import RequireRole from "./components/RequireRole.jsx";
import AdminLayout from "./admin/adminlayout/AdminLayout.jsx";
import AdminDashboard from "./admin/pages/Dashboard.jsx";
import UsersList from "./admin/pages/users/UsersList.jsx";
import ProductsList from "./admin/pages/products/ProductsList.jsx";
import ProductForm from "./admin/pages/products/ProductForm.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import OrderHistoryPage from "./pages/cart/OrderHistoryPage.jsx";
import Checkout from "./pages/cart/Checkout.jsx";
import OrderSuccess from "./pages/cart/OrderSuccess.jsx";
import OrderDetailPage from "./pages/cart/OrderDetailPage.jsx";
import AdminLogin from "./admin/pages/Auth/AdminLogin.jsx";
import AdminWrapper from "./admin/adminlayout/AdminWrapper.jsx";
import BrandsList from "./admin/pages/brands/BrandsList.jsx";
import BrandForm from "./admin/pages/brands/BrandForm.jsx";
import AdminOrdersList from "./admin/pages/orders/AdminOrdersList.jsx";
import AdminOrderDetail from "./admin/pages/orders/AdminOrderDetail.jsx";
import News from "./pages/news/news.jsx";
import NewsDetail from "./pages/news/controller/NewsDetail.jsx";
import NewsList from "./admin/pages/news/NewList.jsx";
import NewsForm from "./admin/pages/news/NewForm.jsx";
import SearchPage from "./admin/pages/SearchPage.jsx";
import BoschFingerprintLock from "./pages/products/bosch/BoschFingerprintLock.jsx";
import SmartLock from "./pages/products/lock/SmartLock.jsx";
import ForgotPassword from "./pages/auth/components/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/components/ResetPassword.jsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" index element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/:slug" element={<ProductDetail />} />
                <Route path="/tin-tuc" element={<News />} />
                <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
                <Route path="/tim-kiem" element={<SearchPage />} />
                <Route
                    path="/khoa-van-tay-bosch"
                    element={<BoschFingerprintLock />}
                />
                <Route path="/khoa-cua-thong-minh" element={<SmartLock />} />
                <Route path="/quen-mat-khau" element={<ForgotPassword />} />
                <Route path="/dat-lai-mat-khau" element={<ResetPassword />} />

                <Route element={<RequireAuth to="/login" />}>
                    <Route path="/tai-khoan" element={<TaiKhoan />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/cart/checkout" element={<Checkout />} />

                    <Route
                        path="/cart/checkout/order-success"
                        element={<OrderSuccess />}
                    />
                    <Route
                        path="/order/:order_code"
                        element={<OrderDetailPage />}
                    />
                    <Route
                        path="/order/order-history"
                        element={<OrderHistoryPage />}
                    />
                </Route>
            </Route>

            {/* ADMIN */}

            <Route element={<AdminWrapper />}>
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                    path="/admin/dashboard"
                    element={<RequireAuth to="/admin" />}
                >
                    <Route element={<RequireRole role="admin" />}>
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route
                                path="/admin/dashboard/users"
                                element={<UsersList />}
                            />
                            <Route
                                path="/admin/dashboard/products"
                                element={<ProductsList />}
                            />
                            <Route
                                path="/admin/dashboard/products/:id"
                                element={<ProductForm />}
                            />
                            <Route
                                path="/admin/dashboard/brands"
                                element={<BrandsList />}
                            />
                            <Route
                                path="/admin/dashboard/brands/:id"
                                element={<BrandForm />}
                            />
                            <Route
                                path="/admin/dashboard/brands/new"
                                element={<BrandForm />}
                            />
                            <Route
                                path="/admin/dashboard/orders"
                                element={<AdminOrdersList />}
                            />
                            <Route
                                path="/admin/dashboard/orders/:order_code"
                                element={<AdminOrderDetail />}
                            />
                            <Route
                                path="/admin/dashboard/news"
                                element={<NewsList />}
                            />
                            <Route path="news/new" element={<NewsForm />} />
                            <Route path="news/:id" element={<NewsForm />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;

{
    /* <Route
                path="/admin/*"
                element={
                    <RequireAuth>
                        <RequireRole role="admin">
                            <Outlet />
                        </RequireRole>
                    </RequireAuth>
                }
            >
                <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                </Route>
            </Route> */
}
