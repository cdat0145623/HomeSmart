const formatPrice = (price) =>
    Number(price).toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

const DOMAIN = "http://localhost:5001";

const statusOrder = {
    cho_xu_ly: "Chờ xử lý",
    da_xac_nhan: "Đã xác nhận",
    dang_giao: "Đang giao",
    hoan_thanh: "Hoàn thành",
    huy: "Huy",
};

const logos = [
    {
        slug: "ezviz",
        title: "Khóa cửa Ezviz",
        src: "/homepage/PartnerLogos/logo_ezviz.jpg",
        alt: "EZVIZ",
        link: "/thuong-hieu/ezviz",
    },
    {
        slug: "bosch",
        title: "Khóa vân tay Bosch",
        src: "/homepage/PartnerLogos/logo_bosh.jpg",
        alt: "Bosch",
        link: "/thuong-hieu/bosch",
    },
    {
        slug: "hafele",
        title: "Khóa cửa Hafele",
        src: "/homepage/PartnerLogos/logo_hafele.jpg",
        alt: "Hafele",
        link: "/thuong-hieu/hafele",
    },
    {
        slug: "hubert",
        title: "Khóa cửa Hubert",
        src: "/homepage/PartnerLogos/logo_hubert.jpg",
        alt: "Hubert",
        link: "/thuong-hieu/hubert",
    },
    {
        slug: "hyundai",
        title: "Khóa cửa Hyundai",
        src: "/homepage/PartnerLogos/logo_hyundai.png",
        alt: "Hyundai",
        link: "/thuong-hieu/hyundai",
    },
    {
        slug: "kaadas",
        title: "Khóa cửa Kaadas",
        src: "/homepage/PartnerLogos/logo_kaadas.jpg",
        alt: "Kaadas",
        link: "/thuong-hieu/kaadas",
    },
    {
        slug: "kassler",
        title: "Khóa cửa Kassler",
        src: "/homepage/PartnerLogos/logo_kassler.jpg",
        alt: "Kassler",
        link: "/thuong-hieu/kassler",
    },
];

const statsAdmin = {
    tong_doanh_thu: "Doanh thu tháng",
    so_khach_hang: "Khách hàng mới",
    don_hoan_thanh: "Đơn hoàn thành",
};

export { formatPrice, DOMAIN, statusOrder, logos, statsAdmin };
