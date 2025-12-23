
-- Chot bang + data
CREATE TABLE `danh_muc` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `danh_muc_cha_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ten_danh_muc` varchar(200) NOT NULL,
  `duong_dan_ten_seo` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `cho_phep_so_sanh` tinyint(1) NOT NULL DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  INDEX (`danh_muc_cha_id`),
  FOREIGN KEY (`danh_muc_cha_id`) REFERENCES `danh_muc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `danh_muc` (`ten_danh_muc`, `danh_muc_cha_id`, `duong_dan_ten_seo`)
VALUES 
('Khoá cửa thông minh', NULL, 'khoa-cua-thong-minh'),
('Cửa nhựa Composite', NULL,'cua-nhua-composite'),
('Camera giám sát', NULL,'camera-giam-sat'),
('Phụ kiện', NULL, 'phu-kien');

('Khóa vân tay BOSCH', 1, 'khoa-van-tay-bosch'),
('Khóa cửa HYUNDAI', 1, 'khoa-cua-hyundai'),
('Khóa cửa HAFELE', 1, 'khoa-cua-hafele'),
('Khóa cửa HUBERT', 1, 'khoa-cua-hubert'),
('Khóa cửa EZVIZ', 1, 'khoa-cua-ezviz'),
('Khóa cửa KASSLER', 1, 'khoa-cua-kassler'),
('Khóa cửa KAADAS', 1, 'khoa-cua-kaadas'),
('Cửa phẳng', 2, 'cua-phang'),
('Cửa nẹp kim loại', 2, 'cua-nep-kim-loai'),
('Cửa ô kính', 2 , 'cua-o-kinh'),
('Cửa chỉ nổi', 2 , 'cua-chi-noi'),
('Cửa hút huỳnh', 2 , 'cua-hut-huynh'),
('Cửa vòm', 2,'cua-vom'),
('Camera Wifi Imou', 3, 'camera-wifi-imou'),
('Camera Wifi Ezviz', 3, 'camera-wifi-ezviz'),
('Camera Dahua', 3, 'camera-dahua'),
('Camera Hikvision', 3, 'camera-hikvision'),
('Camera Tapo-TP-Link',3, 'camera-tapo-tp-link'),
('Camera hành trình', 3, 'camera-hanh-trinh'),
('Phụ kiện khóa vân tay', 4, 'phu-kien-khoa-van-tay'),
('Phụ kiện camera', 4, 'phu-kien-camera');


('Khoá cửa EZVIZ', 'ezviz', 1),
('Khoá cửa BOSCH', 'bosch', 1),
('Khoá cửa HUYNHDAI', 'huynhdai', 1),
('Khoá cửa HAFELE', 'hafele', 1),
('Khoá cửa HUBERT', 'hubert', 1),
('Cửa nhựa Composite', 'cua-nhua-composite', NULL),
('Cửa chỉ nổi', 'cua-chi-noi', 7)


CREATE TABLE `thuong_hieu` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ten_thuong_hieu` varchar(200) NOT NULL,
  `duong_dan_ten_seo` varchar(255) DEFAULT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `logo_thuong_hieu` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `thuong_hieu` (`ten_thuong_hieu`, `duong_dan_ten_seo`) VALUES
('HYUNDAI', 'hyundai'),
('BOSCH', 'bosch'),
('HAFELE', 'hafele'),
('HUBERT', 'hubert'),
('IMOU', 'imou'),
('EZVIZ', 'ezviz'),
('DAHUA', 'dahua'),
('KAADAS', 'kaadas'),
('HIKVISION', 'hikvision'),
('KASSLER', 'kassler'),
('PIMADOOR', 'pimadoor'),
('TAPO', 'tapo');

CREATE TABLE `san_pham` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
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
    `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`danh_muc_id`) REFERENCES `danh_muc`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`thuong_hieu_id`) REFERENCES `thuong_hieu`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `san_pham` (`ten_san_pham`, `anh_dai_dien`, `duong_dan_ten_seo`, `gia_goc`, `gia_khuyen_mai`, `thuong_hieu_id`, `danh_muc_id`) VALUES
('Khóa Cửa Vân Tay Ezviz LT70', NULL, 'khoa-cua-van-tay-ezviz-lt70', '5500000','3490000', 6,9),
('Khóa Thông Minh Ezviz DL06', NULL, 'khoa-thong-minh-ezviz-lt70', '4500000', '2490000', 6,9),
('Khóa Cửa Vân Tay 2 Mặt Ezviz DL06 Pro', NULL, 'khoa-cua-van-tay-2-mat-ezviz-dl06-pro','6500000', '4490000', 6,9),
('Khóa Cửa Thông Minh Ezviz DL04 Pro', NULL, 'khoa-cua-thong-minh-ezviz-dl04-pro', '3500000', '2490000', 6,9),
('Khóa Cửa Vân Tay Ezviz DL03 Pro', NULL, 'khoa-cua-van-tay-ezviz-dl03-pro', '3400000', '2390000', 6,9);

('Khóa vân tay Bosch ID60C (Đức)', NULL, 'khoa-van-tay-bosch-id60C','12800000', '7500000', 2, 5),
('Khóa cửa vân tay Bosch ID30 (Đức)', NULL, 'khoa-cua-van-tay-bosch-id30', '8800000', '5500000', 2, 5),
('Khóa nhận diện khuôn mặt Bosch EL600F (Đức)', NULL, 'khoa-nhan-dien-khuon-mat-bosch-el60f', '22500000', '17500000',2, 5),
('Khóa cửa vân tay Bosch EL600 (Đức) - màu đen', NULL, 'khoa-cua-van-tay-bosch-el600', '13800000', '8800000', 2, 5),
('Khóa cửa vân tay Bosch ID30/ID30B (Đức)', NULL, 'khoa-cua-van-tay-bosch-id30id30b', '8200000', '5500000', 2, 5),
('Cửa nhựa composite chỉ nổi pfs1', NULL, 'cua-nhua-composite-chi-noi-pfs1', 4953000, 3714000, 11, 15),
('Cửa nhựa composite chỉ nổi pfs2', NULL, 'cua-nhua-composite-chi-noi-pfs2', 5088000, 3816000, 11, 15),
('Cửa nhựa composite chỉ nổi pfs3', NULL, 'cua-nhua-composite-chi-noi-pfs3', 5088000, 3816000, 11, 15),
('Cửa nhựa composite chỉ nổi pfs4', NULL, 'cua-nhua-composite-chi-noi-pfs4', 5088000, 3816000, 11, 15),
('Cửa nhựa composite chỉ nổi pfs5', NULL, 'cua-nhua-composite-chi-noi-pfs5', 5088000, 3816000, 11, 15);

CREATE TABLE `nguoi_dung` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
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
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `nguoi_dung`
INSERT INTO `nguoi_dung` (`vai_tro`, `ho_ten`, `email`, `email_da_xac_minh`, `email_token`, `email_token_het_han`, `email_xac_minh_luc`, `sdt`, `gioi_tinh`, `ngay_sinh`, `avatar_url`, `mat_khau_hash`, `trang_thai`, `google_sub`, `google_avatar_url`, `lan_dang_nhap_cuoi`, `ngay_tao`, `ngay_cap_nhat`) VALUES
('customer', 'Le Quoc Tinh (FPL HCM)', 'tinhlqps26364@fpt.edu.vn', 1, NULL, NULL, '2025-10-17 20:59:05', NULL, NULL, NULL, NULL, NULL, 'active', '100732645658506166742', 'https://lh3.googleusercontent.com/a/ACg8ocIsW14keQ6xSmHQ-3pPmi-bUCb5SgdOjGRy1XPtYA0zQsfcXg=s96-c', NULL, '2025-10-17 20:58:53', '2025-10-17 20:59:05'),
('admin', 'Super Admin', 'service.nexahome@gmail.com', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$wNuWQvizq8FQrS8z4zV.OOL0SKLNsLvgaCTFLrRF0dg/QdQFfArhW', 'active', NULL, NULL, '2025-11-04 21:50:12', '2025-10-22 18:01:12', '2025-11-04 21:50:12'),
('nhan_vien', 'nhân viên 1', 'tiktoktdev1999@gmail.com', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$oxb89qIPzE6o2h5pRVUsD.sPjmbQiTi3yIC8ojyGj6LobF7HmrpaG', 'active', NULL, NULL, '2025-11-04 20:29:03', '2025-10-22 20:30:00', '2025-11-04 20:29:03'),
('customer', 'tĩnh lê', 'tinhle2512fpt@gmail.com', 1, NULL, NULL, '2025-10-22 20:36:38', NULL, NULL, NULL, NULL, NULL, 'active', '103076403439155838333', 'https://lh3.googleusercontent.com/a/ACg8ocJ4hI-sT8qykq9aFnUnhVZq-rNLxiBwtTIjAR_neB_E3oelRw=s96-c', NULL, '2025-10-22 20:35:59', '2025-10-22 20:36:38');


INSERT INTO `danh_muc` (`ten_danh_muc`, `slug`, `danh_muc_cha_id`)
VALUES 
('Khoá cửa thông minh', 'khoa-cua-thong-minh', NULL),
('Khoá cửa EZVIZ', 'ezviz', 1),
('Khoá cửa BOSCH', 'bosch', 1),
('Khoá cửa HUYNHDAI', 'huynhdai', 1),
('Khoá cửa HAFELE', 'hafele', 1),
('Khoá cửa HUBERT', 'hubert', 1),
('Cửa nhựa Composite', 'cua-nhua-composite', NULL),
('Cửa chỉ nổi', 'cua-chi-noi', 7)

CREATE TABLE `gio_hang` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` bigint(20) UNSIGNED NOT NULL,
  `san_pham_id` bigint(20) UNSIGNED NOT NULL,
  `so_luong` int(11) NOT NULL DEFAULT 1,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_ma_bien_the` (`ma_bien_the`),
  FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `dia_chi` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` bigint(20) UNSIGNED NOT NULL,
  `ho_ten` varchar(200) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `tinh_thanh` varchar(100) NOT NULL,
  `quan_huyen` varchar(100) NOT NULL,
  `phuong_xa` varchar(100) NOT NULL,
  `dia_chi` varchar(255) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `mac_dinh` tinyint(1) NOT NULL DEFAULT 0,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `don_hang` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ma_don` varchar(20) NOT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED DEFAULT NULL,
  `dia_chi_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ma_giam_gia_id` bigint(20) UNSIGNED DEFAULT NULL,
  `phi_ship` decimal(15,2) NOT NULL DEFAULT 0,
  `tong_tien` decimal(15,2) NOT NULL DEFAULT 0.00,
  `giam_gia` decimal(15,2) NOT NULL DEFAULT 0.00,
  `payment_method` enum('VNPAY','MOMO','COD') DEFAULT 'COD',
  `trang_thai_thanh_toan` TINYINT(1) DEFAULT 0,
  `trang_thai` enum('cho_xu_ly','da_xac_nhan','dang_giao','hoan_thanh','huy') DEFAULT 'cho_xu_ly',
  `ngay_tao` datetime DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`dia_chi_id`) REFERENCES `dia_chi`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE don_hang 
ADD COLUMN is_archived TINYINT(1) DEFAULT 0;


CREATE TABLE `chi_tiet_don_hang` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `don_hang_id` bigint(20) UNSIGNED NOT NULL,
  `san_pham_id` bigint(20) UNSIGNED NOT NULL,
  `so_luong` int(11) NOT NULL,
  `gia_tien_san_pham` decimal(11,2) NOT NULL,
  `tong_gia_tung_san_pham` decimal(15,2) NOT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `lich_su_don_hang` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `don_hang_id` bigint(20) UNSIGNED NOT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED DEFAULT NULL,
  `hanh_dong` enum('cho_xu_ly','da_xac_nhan','dang_giao','hoan_thanh','huy'),
  `ghi_chu` varchar(255) DEFAULT NULL,
  `thoi_gian` datetime DEFAULT current_timestamp(),
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `bai_viet` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tieu_de` varchar(255) NOT NULL,
  `duong_dan_ten_seo` varchar(255) DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `tom_tat` varchar(500) DEFAULT NULL,
  `noi_dung` text DEFAULT NULL,
  `nguoi_dung_id` bigint(20) UNSIGNED DEFAULT NULL,
  `danh_muc` varchar(100) DEFAULT 'Tin tức',
  `trang_thai` enum('hien','an') DEFAULT 'hien',
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `bai_viet` (`tieu_de`)
VALUES 
('THUÊ XE THEO NGÀY ĐI CAFE PERSIMMON VÀ CÁC ĐIỂM GẦN ĐÓ'),
('THUÊ XE ĐI THE FLOREST HOA TRONG RỪNG GIÁ RẺ'),
('THUÊ XE ĐI THỊ TRẤN IYASHI TỪ TRUNG TÂM ĐÀ LẠT');

('Vẻ đẹp Suối Bình Yên Đà Lạt mùa cắm trại và săn mây'),
('Review Vườn Địa Đàng Đà Lạt'),
('Top Lý Do Bạn Nên Săn Mây Ở Đồi Đa Phú Khi Du Lịch Đà Lạt');

('Trải Nghiệm Săn Mây Tại Cầu Gỗ Bình Minh - Đà Lạt: Kỳ Quan Thiên Nhiên Đẹp Bậc Nhất'),
('Mùa Đẹp Nhất Tại Đà Lạt Có Gì? – Khi Trời Xanh, Mây Trắng Và Nắng Vàng Cùng Hòa Điệu');

ALTER TABLE lich_su_don_hang
MODIFY hanh_dong ENUM(
  'cho_xu_ly',
  'da_xac_nhan',
  'dang_giao',
  'hoan_thanh',
  'huy'
) DEFAULT 'cho_xu_ly';

CREATE TABLE `danh_gia` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` bigint(20) UNSIGNED NOT NULL,
  `san_pham_id` bigint(20) UNSIGNED NOT NULL,
  `don_hang_id` bigint(20) UNSIGNED NOT NULL,
  `so_sao` tinyint(4) NOT NULL CHECK (`so_sao` between 1 and 5),
  `noi_dung` text DEFAULT NULL,
  `ngay_tao` datetime DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `huu_ich` int(11) NOT NULL DEFAULT 0,
  `bi_bao_cao` int(11) NOT NULL DEFAULT 0,
  `trang_thai` enum('cho_duyet','hien','an') NOT NULL DEFAULT 'hien',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;