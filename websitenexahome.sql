-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2025 at 06:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `websitenexahome`
--

-- --------------------------------------------------------

--
-- Table structure for table `bai_viet`
--

CREATE TABLE `bai_viet` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tieu_de` varchar(255) NOT NULL,
  `duong_dan_ten_seo` varchar(255) DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `tom_tat` varchar(500) DEFAULT NULL,
  `noi_dung` text DEFAULT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED DEFAULT NULL,
  `danh_muc` varchar(100) DEFAULT 'Tin tức',
  `trang_thai` enum('hien','an') DEFAULT 'hien',
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bien_the`
--

CREATE TABLE `bien_the` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ma_bien_the` varchar(64) DEFAULT NULL,
  `san_pham_id` bigint(20) UNSIGNED NOT NULL,
  `ten_bien_the` varchar(200) DEFAULT NULL,
  `thuoc_tinh` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`thuoc_tinh`)),
  `gia` decimal(15,2) DEFAULT NULL,
  `gia_khuyen_mai` decimal(15,2) DEFAULT NULL,
  `trang_thai` enum('hien','an') NOT NULL DEFAULT 'hien',
  `la_mac_dinh` tinyint(1) NOT NULL DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
) ;

-- --------------------------------------------------------

--
-- Table structure for table `danh_gia`
--

CREATE TABLE `danh_gia` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED NOT NULL,
  `san_pham_id` bigint(20) UNSIGNED NOT NULL,
  `don_hang_id` bigint(20) UNSIGNED NOT NULL,
  `so_sao` tinyint(4) NOT NULL CHECK (`so_sao` between 1 and 5),
  `noi_dung` text DEFAULT NULL,
  `ngay_tao` datetime DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `huu_ich` int(11) NOT NULL DEFAULT 0,
  `bi_bao_cao` int(11) NOT NULL DEFAULT 0,
  `trang_thai` enum('cho_duyet','hien','an') NOT NULL DEFAULT 'hien'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `danh_gia`
--
DELIMITER $$
CREATE TRIGGER `trg_danh_gia_chi_khi_hoan_thanh` BEFORE INSERT ON `danh_gia` FOR EACH ROW BEGIN
  DECLARE trang_thai_don ENUM('cho_xu_ly','da_xac_nhan','dang_giao','hoan_thanh','huy');
  SELECT trang_thai INTO trang_thai_don
  FROM don_hang
  WHERE id = NEW.don_hang_id;

  IF trang_thai_don <> 'hoan_thanh' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Chỉ được đánh giá khi đơn hàng đã giao thành công (trạng thái = hoan_thanh).';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `danh_muc`
--

CREATE TABLE `danh_muc` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `danh_muc_cha_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ten_danh_muc` varchar(200) NOT NULL,
  `duong_dan_ten_seo` varchar(255) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `cho_phep_so_sanh` tinyint(1) NOT NULL DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danh_muc`
--

INSERT INTO `danh_muc` (`id`, `danh_muc_cha_id`, `ten_danh_muc`, `duong_dan_ten_seo`, `mo_ta`, `cho_phep_so_sanh`, `ngay_tao`, `ngay_cap_nhat`) VALUES
(1, NULL, 'Khóa cửa thông minh', 'khoa-cua-thong-minh', NULL, 1, '2025-10-14 19:15:57', '2025-10-14 19:16:09'),
(2, NULL, 'Cửa nhựa Composite', 'cua-nhua-composite', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(3, NULL, 'Camera giám sát', 'camera-giam-sat', NULL, 1, '2025-10-14 19:15:57', '2025-10-14 19:16:09'),
(4, NULL, 'Phụ kiện', 'phu-kien', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(5, 1, 'Khóa vân tay BOSCH', 'khoa-van-tay-bosch', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(6, 1, 'Khóa cửa HYUNDAI', 'khoa-cua-hyundai', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(7, 1, 'Khóa cửa HAFELE', 'khoa-cua-hafele', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(8, 1, 'Khóa cửa HUBERT', 'khoa-cua-hubert', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(9, 1, 'Khóa cửa EZVIZ', 'khoa-cua-ezviz', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(10, 1, 'Khóa cửa KASSLER', 'khoa-cua-kassler', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(11, 1, 'Khóa cửa KAADAS', 'khoa-cua-kaadas', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(12, 2, 'Cửa phẳng', 'cua-phang', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(13, 2, 'Cửa nẹp kim loại', 'cua-nep-kim-loai', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(14, 2, 'Cửa ô kính', 'cua-o-kinh', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(15, 2, 'Cửa chỉ nổi', 'cua-chi-noi', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(16, 2, 'Cửa hút huỳnh', 'cua-hut-huynh', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(17, 2, 'Cửa vòm', 'cua-vom', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(18, 3, 'Camera Wifi Imou', 'camera-wifi-imou', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(19, 3, 'Camera Wifi Ezviz', 'camera-wifi-ezviz', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(20, 3, 'Camera Dahua', 'camera-dahua', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(21, 3, 'Camera Hikvision', 'camera-hikvision', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(22, 3, 'Camera Tapo-TP-Link', 'camera-tapo-tp-link', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(23, 3, 'Camera hành trình', 'camera-hanh-trinh', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(24, 4, 'Phụ kiện khóa vân tay', 'phu-kien-khoa-van-tay', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57'),
(25, 4, 'Phụ kiện camera', 'phu-kien-camera', NULL, 0, '2025-10-14 19:15:57', '2025-10-14 19:15:57');

-- --------------------------------------------------------

--
-- Table structure for table `dia_chi`
--

CREATE TABLE `dia_chi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED NOT NULL,
  `ho_ten` varchar(200) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `tinh_thanh` varchar(100) NOT NULL,
  `quan_huyen` varchar(100) NOT NULL,
  `phuong_xa` varchar(100) NOT NULL,
  `dia_chi` varchar(255) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `mac_dinh` tinyint(1) NOT NULL DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `don_hang`
--

CREATE TABLE `don_hang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ma_don` varchar(20) NOT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED DEFAULT NULL,
  `dia_chi_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ma_giam_gia_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tong_tien` decimal(15,2) NOT NULL DEFAULT 0.00,
  `giam_gia` decimal(15,2) NOT NULL DEFAULT 0.00,
  `trang_thai` enum('cho_xu_ly','da_xac_nhan','dang_giao','hoan_thanh','huy') DEFAULT 'cho_xu_ly',
  `ngay_tao` datetime DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `don_hang`
--
DELIMITER $$
CREATE TRIGGER `trg_donhang_gen_ma` AFTER INSERT ON `don_hang` FOR EACH ROW BEGIN
  IF NEW.ma_don IS NULL OR NEW.ma_don = '' THEN
    UPDATE don_hang
    SET ma_don = CONCAT(
      'DH',
      DATE_FORMAT(COALESCE(NEW.ngay_tao, NOW()), '%y%m%d'),
      LPAD(NEW.id, 6, '0')
    )
    WHERE id = NEW.id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `don_hang_chi_tiet`
--

CREATE TABLE `don_hang_chi_tiet` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `don_hang_id` bigint(20) UNSIGNED NOT NULL,
  `bien_the_id` bigint(20) UNSIGNED NOT NULL,
  `so_luong` int(11) NOT NULL,
  `don_gia` decimal(15,2) NOT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `gio_hang`
--

CREATE TABLE `gio_hang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED NOT NULL,
  `bien_the_id` bigint(20) UNSIGNED NOT NULL,
  `so_luong` int(11) NOT NULL DEFAULT 1,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `hinh_anh_bai_viet`
--

CREATE TABLE `hinh_anh_bai_viet` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bai_viet_id` bigint(20) UNSIGNED NOT NULL,
  `duong_dan_anh` varchar(500) NOT NULL,
  `thu_tu` int(11) DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hinh_anh_san_pham`
--

CREATE TABLE `hinh_anh_san_pham` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `san_pham_id` bigint(20) UNSIGNED NOT NULL,   
  `duong_dan_anh` varchar(500) NOT NULL,
  `thu_tu` int(11) DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lich_su_don_hang`
--

CREATE TABLE `lich_su_don_hang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `don_hang_id` bigint(20) UNSIGNED NOT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED DEFAULT NULL,
  `hanh_dong` enum('dat_hang','xac_nhan','dang_giao','hoan_thanh','huy') DEFAULT 'dat_hang',
  `ghi_chu` varchar(255) DEFAULT NULL,
  `thoi_gian` datetime DEFAULT current_timestamp(),
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ma_giam_gia`
--

CREATE TABLE `ma_giam_gia` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ma` varchar(50) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `loai` enum('phan_tram','tien_mat') DEFAULT 'phan_tram',
  `gia_tri` decimal(10,2) DEFAULT NULL,
  `dieu_kien_toi_thieu` decimal(15,2) DEFAULT 0.00,
  `doi_tuong_ap_dung` enum('tat_ca','khach_moi','vip') DEFAULT 'tat_ca',
  `ngay_bat_dau` datetime DEFAULT NULL,
  `ngay_ket_thuc` datetime DEFAULT NULL,
  `so_lan_su_dung_toi_da` int(11) DEFAULT 100,
  `trang_thai` enum('hoat_dong','het_han','ngung') DEFAULT 'hoat_dong',
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `vai_tro` enum('admin','nhan_vien','customer') NOT NULL DEFAULT 'customer',
  `ho_ten` varchar(200) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_da_xac_minh` tinyint(1) NOT NULL DEFAULT 0,
  `email_token` varchar(64) DEFAULT NULL,
  `email_token_het_han` datetime DEFAULT NULL,
  `email_xac_minh_luc` datetime DEFAULT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `gioi_tinh` enum('nam','nu','khac') DEFAULT NULL COMMENT 'Giới tính người dùng',
  `ngay_sinh` date DEFAULT NULL COMMENT 'YYYY-MM-DD',
  `avatar_url` varchar(500) DEFAULT NULL,
  `mat_khau_hash` varchar(255) DEFAULT NULL COMMENT 'BCrypt/Argon2 hash; NULL nếu Google-only',
  `trang_thai` enum('active','pending','disabled') NOT NULL DEFAULT 'active',
  `google_sub` varchar(64) DEFAULT NULL COMMENT 'Google user ID (sub)',
  `google_avatar_url` varchar(500) DEFAULT NULL,
  `lan_dang_nhap_cuoi` datetime DEFAULT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`id`, `vai_tro`, `ho_ten`, `email`, `email_da_xac_minh`, `email_token`, `email_token_het_han`, `email_xac_minh_luc`, `sdt`, `gioi_tinh`, `ngay_sinh`, `avatar_url`, `mat_khau_hash`, `trang_thai`, `google_sub`, `google_avatar_url`, `lan_dang_nhap_cuoi`, `ngay_tao`, `ngay_cap_nhat`) VALUES
(19, 'customer', 'Le Quoc Tinh (FPL HCM)', 'tinhlqps26364@fpt.edu.vn', 1, NULL, NULL, '2025-10-17 20:59:05', NULL, NULL, NULL, NULL, NULL, 'active', '100732645658506166742', 'https://lh3.googleusercontent.com/a/ACg8ocIsW14keQ6xSmHQ-3pPmi-bUCb5SgdOjGRy1XPtYA0zQsfcXg=s96-c', NULL, '2025-10-17 20:58:53', '2025-10-17 20:59:05'),
(20, 'admin', 'Super Admin', 'service.nexahome@gmail.com', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$wNuWQvizq8FQrS8z4zV.OOL0SKLNsLvgaCTFLrRF0dg/QdQFfArhW', 'active', NULL, NULL, '2025-11-04 21:50:12', '2025-10-22 18:01:12', '2025-11-04 21:50:12'),
(21, 'nhan_vien', 'nhân viên 1', 'tiktoktdev1999@gmail.com', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$oxb89qIPzE6o2h5pRVUsD.sPjmbQiTi3yIC8ojyGj6LobF7HmrpaG', 'active', NULL, NULL, '2025-11-04 20:29:03', '2025-10-22 20:30:00', '2025-11-04 20:29:03'),
(22, 'customer', 'tĩnh lê', 'tinhle2512fpt@gmail.com', 1, NULL, NULL, '2025-10-22 20:36:38', NULL, NULL, NULL, NULL, NULL, 'active', '103076403439155838333', 'https://lh3.googleusercontent.com/a/ACg8ocJ4hI-sT8qykq9aFnUnhVZq-rNLxiBwtTIjAR_neB_E3oelRw=s96-c', NULL, '2025-10-22 20:35:59', '2025-10-22 20:36:38');

-- --------------------------------------------------------

--
-- Table structure for table `san_pham`
--

  CREATE TABLE `san_pham` (
    `id` bigint(20) UNSIGNED NOT NULL,
    `ten_san_pham` varchar(255) NOT NULL,
    `duong_dan_ten_seo` varchar(255) NOT NULL,
    `anh_dai_dien` varchar(255) DEFAULT NULL,
    `gia_goc` decimal(15,2) DEFAULT NULL,
    `gia_khuyen_mai` decimal(15,2) DEFAULT NULL,
    `thuong_hieu_id` bigint(20) UNSIGNED DEFAULT NULL,
    `danh_muc_id` bigint(20) UNSIGNED DEFAULT NULL,
    `nhom_so_sanh_id` bigint(20) UNSIGNED DEFAULT NULL,
    `mo_ta` text DEFAULT NULL,
    `thong_so` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`thong_so`)),
    `bao_hanh_thang` int(11) DEFAULT 12,
    `trang_thai` enum('hien','an') DEFAULT 'hien',
    `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
    `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
  ) ;

--
-- Dumping data for table `san_pham`
--

INSERT INTO `san_pham` (`id`, `ten_san_pham`, `duong_dan_ten_seo`, `anh_dai_dien`, `gia_goc`, `gia_khuyen_mai`, `thuong_hieu_id`, `danh_muc_id`, `nhom_so_sanh_id`, `mo_ta`, `thong_so`, `bao_hanh_thang`, `trang_thai`, `ngay_tao`, `ngay_cap_nhat`) VALUES
(1, 'Khóa Vân Tay Bocsh ID60', 'khoa-van-tay-bocsh-id60', '/uploads/products/1762265305720-bosh_ms01.jpg', 5900000.00, 5250000.00, 6, 5, 1, 'Khóa Vân Tay Bocsh ID60 là dòng khóa tay gạt cao cấp của hãng khóa Bosch Đức. Sản phẩm khóa điện tử được phân phối bởi Lion Lock. Sản có 4 chức năng mở cửa: Vân tay, thẻ từ, mật khẩu, chìa cơ. có thiết kế vân tay và tay cầm liền mạch, rất nhạy và dễ sử dụng. Vẻ ngoài của sản phẩm rất hiện đại  thời trang.', '{\"Model\":\"ID60\",\"Chất liệu\":\"Hợp kim nhôm\",\"Màu hoàn thiện\":\"Đồng, đen\",\"Phương pháp mở khóa\":\"Vân tay, thẻ, mật khẩu, chìa cơ\",\"Công nghệ vân tay\":\"Bán dẫn\",\"Kích thước mặt ngoài (DxRxC)\":\"25 x 75 x 370 mm\",\"Kích thước mặt trong (DxRxC)\":\"25 x 75 x 370 mm\",\"Hướng dẫn giọng nói\":\"Có\",\"Bàn phím\":\"3 cột, 4 hàng, 12 ký tự\",\"Độ dài mật khẩu\":\"6–12 ký tự\",\"Nguồn điện\":\"4.5–6V\",\"Loại thân khóa\":\"Loại thân C\",\"Loại cửa phù hợp\":\"Thép, gỗ, khung\",\"Độ dày cửa phù hợp\":\"40–100 mm\",\"Độ đố cửa\":\"100 mm\",\"Phân phối\":\"Lion Lock\",\"Bảo hành\":\"12 tháng\"}', 12, 'hien', '2025-11-01 13:17:41', '2025-11-04 21:24:43');

--
-- Triggers `san_pham`
--
DELIMITER $$
CREATE TRIGGER `trg_sp_set_nhomss_ins` BEFORE INSERT ON `san_pham` FOR EACH ROW BEGIN
  DECLARE cur_id BIGINT UNSIGNED;
  DECLARE parent_id BIGINT UNSIGNED;
  DECLARE is_cmp TINYINT(1);

  SET cur_id = NEW.danh_muc_id;
  SET NEW.nhom_so_sanh_id = NULL;

  WHILE cur_id IS NOT NULL DO
    SELECT danh_muc_cha_id, cho_phep_so_sanh INTO parent_id, is_cmp
    FROM danh_muc WHERE id = cur_id;

    IF is_cmp = 1 THEN
      SET NEW.nhom_so_sanh_id = cur_id;
      SET cur_id = NULL; -- thoát vòng
    ELSE
      SET cur_id = parent_id;
    END IF;
  END WHILE;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `thanh_toan`
--

CREATE TABLE `thanh_toan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `don_hang_id` bigint(20) UNSIGNED DEFAULT NULL,
  `phuong_thuc` enum('cod','vnpay','momo') DEFAULT 'cod',
  `trang_thai` enum('chua_thanh_toan','da_thanh_toan') DEFAULT 'chua_thanh_toan',
  `ngay_thanh_toan` datetime DEFAULT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuong_hieu`
--

CREATE TABLE `thuong_hieu` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ten_thuong_hieu` varchar(200) NOT NULL,
  `duong_dan_ten_seo` varchar(255) DEFAULT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `logo_thuong_hieu` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thuong_hieu`
--

INSERT INTO `thuong_hieu` (`id`, `ten_thuong_hieu`, `duong_dan_ten_seo`, `ngay_tao`, `ngay_cap_nhat`, `logo_thuong_hieu`) VALUES
(5, 'HYUNDAI', 'hyundai', '2025-11-04 13:25:06', '2025-11-04 13:28:16', '/uploads/brands/1762237506089-logo_hyundai.png'),
(6, 'BOSCH', 'bosch', '2025-11-04 13:28:12', '2025-11-04 13:28:12', '/uploads/brands/1762237692354-logo_bosh.jpg'),
(7, 'HAFELE', 'hafele', '2025-11-04 13:28:32', '2025-11-04 13:28:32', '/uploads/brands/1762237712335-logo_hafele.jpg'),
(8, 'HUBERT', 'hubert', '2025-11-04 13:28:56', '2025-11-04 13:28:56', '/uploads/brands/1762237736507-logo_hubert.jpg'),
(9, 'IMOU', 'imou', '2025-11-04 13:29:14', '2025-11-04 13:29:14', '/uploads/brands/1762237754855-logo_imou.png'),
(10, 'EZVIZ', 'ezviz', '2025-11-04 13:29:55', '2025-11-04 13:29:55', '/uploads/brands/1762237795765-logo_ezviz.jpg'),
(11, 'DAHUA', 'dahua', '2025-11-04 13:30:23', '2025-11-04 13:30:23', '/uploads/brands/1762237823658-logo_dahua.jpg'),
(12, 'KAADAS', 'kaadas', '2025-11-04 13:30:43', '2025-11-04 13:30:43', '/uploads/brands/1762237843766-logo_kaadas.jpg'),
(13, 'HIKVISION', 'hikvision', '2025-11-04 13:31:05', '2025-11-04 13:31:05', '/uploads/brands/1762237865761-logo_hikvision.jpg'),
(14, 'KASSLER', 'kassler', '2025-11-04 13:31:32', '2025-11-04 13:31:32', '/uploads/brands/1762237892319-logo_kassler.jpg'),
(15, 'PIMADOOR', 'pimadoor', '2025-11-04 13:32:11', '2025-11-04 13:32:11', '/uploads/brands/1762237931636-logo_pimadoor.png'),
(16, 'TAPO', 'tapo', '2025-11-04 13:32:28', '2025-11-04 13:32:28', '/uploads/brands/1762237948144-logo_tapo.jpg');
  
-- --------------------------------------------------------

--
-- Table structure for table `ton_kho`
--

CREATE TABLE `ton_kho` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bien_the_id` bigint(20) UNSIGNED NOT NULL,
  `so_luong_hien_tai` int(11) DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `van_chuyen`
--

CREATE TABLE `van_chuyen` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `don_hang_id` bigint(20) UNSIGNED NOT NULL,
  `don_vi_van_chuyen` varchar(100) DEFAULT 'NexaShip',
  `ma_van_don` varchar(100) DEFAULT NULL,
  `trang_thai` enum('dang_xu_ly','dang_giao','da_giao','tra_hang') DEFAULT 'dang_xu_ly',
  `ngay_cap_nhat` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_top_doanh_thu_thang`
-- (See below for the actual view)
--
CREATE TABLE `v_top_doanh_thu_thang` (
`thang` varchar(7)
,`so_don_hoan_thanh` bigint(21)
,`doanh_thu` decimal(38,2)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_top_khach_hang`
-- (See below for the actual view)
--
CREATE TABLE `v_top_khach_hang` (
`nguoi_dung_id` bigint(20) unsigned
,`ho_ten` varchar(200)
,`email` varchar(255)
,`so_don_hoan_thanh` bigint(21)
,`tong_chi_tieu` decimal(38,2)
,`lan_mua_gan_nhat` datetime
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_top_san_pham`
-- (See below for the actual view)
--
CREATE TABLE `v_top_san_pham` (
`san_pham_id` bigint(20) unsigned
,`ten_san_pham` varchar(255)
,`tong_so_luong_ban` decimal(32,0)
,`tong_doanh_thu` decimal(47,2)
,`lan_ban_dau` datetime
,`lan_ban_gan_nhat` datetime
);

-- --------------------------------------------------------

--
-- Structure for view `v_top_doanh_thu_thang`
--
DROP TABLE IF EXISTS `v_top_doanh_thu_thang`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_top_doanh_thu_thang`  AS SELECT date_format(`dh`.`ngay_tao`,'%Y-%m') AS `thang`, count(`dh`.`id`) AS `so_don_hoan_thanh`, coalesce(sum(`dh`.`tong_tien` - `dh`.`giam_gia`),0) AS `doanh_thu` FROM `don_hang` AS `dh` WHERE `dh`.`trang_thai` = 'hoan_thanh' GROUP BY date_format(`dh`.`ngay_tao`,'%Y-%m') ORDER BY date_format(`dh`.`ngay_tao`,'%Y-%m') ASC ;

-- --------------------------------------------------------

--
-- Structure for view `v_top_khach_hang`
--
DROP TABLE IF EXISTS `v_top_khach_hang`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_top_khach_hang`  AS SELECT `nd`.`id` AS `nguoi_dung_id`, `nd`.`ho_ten` AS `ho_ten`, `nd`.`email` AS `email`, count(`dh`.`id`) AS `so_don_hoan_thanh`, coalesce(sum(`dh`.`tong_tien` - `dh`.`giam_gia`),0) AS `tong_chi_tieu`, max(`dh`.`ngay_tao`) AS `lan_mua_gan_nhat` FROM (`don_hang` `dh` join `nguoi_dung` `nd` on(`dh`.`nguoi_dung_id` = `nd`.`id`)) WHERE `dh`.`trang_thai` = 'hoan_thanh' GROUP BY `nd`.`id`, `nd`.`ho_ten`, `nd`.`email` ;

-- --------------------------------------------------------

--
-- Structure for view `v_top_san_pham`
--
DROP TABLE IF EXISTS `v_top_san_pham`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_top_san_pham`  AS SELECT `sp`.`id` AS `san_pham_id`, `sp`.`ten_san_pham` AS `ten_san_pham`, sum(`dhct`.`so_luong`) AS `tong_so_luong_ban`, sum(`dhct`.`so_luong` * `dhct`.`don_gia`) AS `tong_doanh_thu`, min(`dh`.`ngay_tao`) AS `lan_ban_dau`, max(`dh`.`ngay_tao`) AS `lan_ban_gan_nhat` FROM (((`don_hang_chi_tiet` `dhct` join `don_hang` `dh` on(`dhct`.`don_hang_id` = `dh`.`id`)) join `bien_the` `bt` on(`dhct`.`bien_the_id` = `bt`.`id`)) join `san_pham` `sp` on(`bt`.`san_pham_id` = `sp`.`id`)) WHERE `dh`.`trang_thai` = 'hoan_thanh' GROUP BY `sp`.`id`, `sp`.`ten_san_pham` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bai_viet`
--
ALTER TABLE `bai_viet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `bien_the`
--
ALTER TABLE `bien_the`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`ma_bien_the`),
  ADD UNIQUE KEY `uq_bt_sp_ten` (`san_pham_id`,`ten_bien_the`),
  ADD KEY `idx_bt_sp` (`san_pham_id`);

--
-- Indexes for table `danh_gia`
--
ALTER TABLE `danh_gia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_review_once` (`nguoi_dung_id`,`san_pham_id`,`don_hang_id`),
  ADD KEY `san_pham_id` (`san_pham_id`),
  ADD KEY `don_hang_id` (`don_hang_id`);

--
-- Indexes for table `danh_muc`
--
ALTER TABLE `danh_muc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_dm_slug` (`duong_dan_ten_seo`),
  ADD KEY `idx_dm_cha` (`danh_muc_cha_id`);

--
-- Indexes for table `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_nguoi_dung` (`nguoi_dung_id`);

--
-- Indexes for table `don_hang`
--
ALTER TABLE `don_hang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_donhang_ma_don` (`ma_don`),
  ADD KEY `dia_chi_id` (`dia_chi_id`),
  ADD KEY `ma_giam_gia_id` (`ma_giam_gia_id`),
  ADD KEY `idx_dh_trangthai_ngay` (`trang_thai`,`ngay_tao`),
  ADD KEY `fk_donhang_nguoidung` (`nguoi_dung_id`);

--
-- Indexes for table `don_hang_chi_tiet`
--
ALTER TABLE `don_hang_chi_tiet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bien_the_id` (`bien_the_id`),
  ADD KEY `idx_dhct_dh_bt` (`don_hang_id`,`bien_the_id`);

--
-- Indexes for table `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_gio_hang` (`nguoi_dung_id`,`bien_the_id`),
  ADD KEY `bien_the_id` (`bien_the_id`);

--
-- Indexes for table `hinh_anh_bai_viet`
--
ALTER TABLE `hinh_anh_bai_viet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bai_viet_id` (`bai_viet_id`);

--
-- Indexes for table `hinh_anh_san_pham`
--
ALTER TABLE `hinh_anh_san_pham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `san_pham_id` (`san_pham_id`);

--
-- Indexes for table `lich_su_don_hang`
--
ALTER TABLE `lich_su_don_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`),
  ADD KEY `idx_ls_don_thoigian` (`don_hang_id`,`thoi_gian`);

--
-- Indexes for table `ma_giam_gia`
--
ALTER TABLE `ma_giam_gia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ma` (`ma`);

--
-- Indexes for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_email` (`email`),
  ADD UNIQUE KEY `uq_google_sub` (`google_sub`),
  ADD UNIQUE KEY `uq_email_token` (`email_token`),
  ADD KEY `idx_vai_tro` (`vai_tro`),
  ADD KEY `idx_trang_thai` (`trang_thai`);

--
-- Indexes for table `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_sp_slug` (`duong_dan_ten_seo`),
  ADD KEY `thuong_hieu_id` (`thuong_hieu_id`),
  ADD KEY `danh_muc_id` (`danh_muc_id`),
  ADD KEY `idx_nhom_so_sanh` (`nhom_so_sanh_id`);

--
-- Indexes for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `don_hang_id` (`don_hang_id`);

--
-- Indexes for table `thuong_hieu`
--
ALTER TABLE `thuong_hieu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_th_slug` (`duong_dan_ten_seo`);

--
-- Indexes for table `ton_kho`
--
ALTER TABLE `ton_kho`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_tonkho_bt` (`bien_the_id`);

--
-- Indexes for table `van_chuyen`
--
ALTER TABLE `van_chuyen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_vanchuyen_don` (`don_hang_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bai_viet`
--
ALTER TABLE `bai_viet`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bien_the`
--
ALTER TABLE `bien_the`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `danh_gia`
--
ALTER TABLE `danh_gia`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `danh_muc`
--
ALTER TABLE `danh_muc`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `dia_chi`
--
ALTER TABLE `dia_chi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `don_hang`
--
ALTER TABLE `don_hang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `don_hang_chi_tiet`
--
ALTER TABLE `don_hang_chi_tiet`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gio_hang`
--
ALTER TABLE `gio_hang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hinh_anh_bai_viet`
--
ALTER TABLE `hinh_anh_bai_viet`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hinh_anh_san_pham`
--
ALTER TABLE `hinh_anh_san_pham`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lich_su_don_hang`
--
ALTER TABLE `lich_su_don_hang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ma_giam_gia`
--
ALTER TABLE `ma_giam_gia`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thuong_hieu`
--
ALTER TABLE `thuong_hieu`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `ton_kho`
--
ALTER TABLE `ton_kho`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `van_chuyen`
--
ALTER TABLE `van_chuyen`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bai_viet`
--
ALTER TABLE `bai_viet`
  ADD CONSTRAINT `bai_viet_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `bien_the`
--
ALTER TABLE `bien_the`
  ADD CONSTRAINT `bien_the_ibfk_1` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bienthe_sanpham` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Constraints for table `danh_gia`
--
ALTER TABLE `danh_gia`
  ADD CONSTRAINT `danh_gia_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `danh_gia_ibfk_2` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `danh_gia_ibfk_3` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `danh_muc`
--
ALTER TABLE `danh_muc`
  ADD CONSTRAINT `fk_dm_cha` FOREIGN KEY (`danh_muc_cha_id`) REFERENCES `danh_muc` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD CONSTRAINT `fk_dia_chi_nguoi_dung` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `don_hang`
--
ALTER TABLE `don_hang`
  ADD CONSTRAINT `don_hang_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`),
  ADD CONSTRAINT `don_hang_ibfk_2` FOREIGN KEY (`dia_chi_id`) REFERENCES `dia_chi` (`id`),
  ADD CONSTRAINT `don_hang_ibfk_3` FOREIGN KEY (`ma_giam_gia_id`) REFERENCES `ma_giam_gia` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_donhang_nguoidung` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`);

--
-- Constraints for table `don_hang_chi_tiet`
--
ALTER TABLE `don_hang_chi_tiet`
  ADD CONSTRAINT `don_hang_chi_tiet_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `don_hang_chi_tiet_ibfk_2` FOREIGN KEY (`bien_the_id`) REFERENCES `bien_the` (`id`);

--
-- Constraints for table `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD CONSTRAINT `gio_hang_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gio_hang_ibfk_2` FOREIGN KEY (`bien_the_id`) REFERENCES `bien_the` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hinh_anh_bai_viet`
--
ALTER TABLE `hinh_anh_bai_viet`
  ADD CONSTRAINT `hinh_anh_bai_viet_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hinh_anh_san_pham`
--
ALTER TABLE `hinh_anh_san_pham`
  ADD CONSTRAINT `hinh_anh_san_pham_ibfk_1` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lich_su_don_hang`
--
ALTER TABLE `lich_su_don_hang`
  ADD CONSTRAINT `lich_su_don_hang_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lich_su_don_hang_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `fk_sp_nhomss` FOREIGN KEY (`nhom_so_sanh_id`) REFERENCES `danh_muc` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `san_pham_ibfk_1` FOREIGN KEY (`thuong_hieu_id`) REFERENCES `thuong_hieu` (`id`),
  ADD CONSTRAINT `san_pham_ibfk_2` FOREIGN KEY (`danh_muc_id`) REFERENCES `danh_muc` (`id`);

--
-- Constraints for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD CONSTRAINT `thanh_toan_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ton_kho`
--
ALTER TABLE `ton_kho`
  ADD CONSTRAINT `ton_kho_ibfk_1` FOREIGN KEY (`bien_the_id`) REFERENCES `bien_the` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `van_chuyen`
--
ALTER TABLE `van_chuyen`
  ADD CONSTRAINT `van_chuyen_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
