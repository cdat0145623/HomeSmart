import React from "react";
import './css/Home.css'
import HeroSection from "./components/HeroSection";
import IntroBrandValue from "./components/IntroBrandValue";
import ProductCatalog from "./components/ProductCatalog";
import TopSellingProducts from "./components/TopSellingProducts";
import SmartLockPage from "./components/SmartLockPage";
import CompositeDoorPage from "./components/CompositeDoorPage";
import CameraPage from "./components/CameraPage";
import AccessoryPage from "./components/AccessoryPage";
import ServiceHighlights from "./components/ServiceHighlights";
import PartnerLogos from "./components/PartnerLogos";
function Home() {
return (
    <div className="Container-home">
        <div className="Container-home_banner">
            <HeroSection />
        </div>
        <div className="Container-home_main">
            <IntroBrandValue />
            <ProductCatalog/>
            <TopSellingProducts/>
            <SmartLockPage/>
            <CompositeDoorPage/>
            <CameraPage/>
            <AccessoryPage/>
            <ServiceHighlights/>
            <PartnerLogos/>
        </div>        
    </div>
);
}
    
export default Home;
