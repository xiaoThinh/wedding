// ============================================================
// Wedding Configuration
// Tất cả thông tin lễ cưới config tại đây
// ============================================================

export type WeddingSide = "nha-trai" | "nha-gai";

export interface VenueInfo {
  name: string;
  address: string;
  time: string;
  /** Ngày tiệc (nếu khác ngày cưới chính) */
  date?: string;
    timeLunar?: string;
  /** Mô tả lời mời (vd: "Trân trọng kính mời đến dự bữa cơm thân mật") */
  description?: string;
  mapUrl: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  icon: string;
}

export interface QRInfo {
  accountName: string;
  bankName: string;
  accountNumber: string;
  imageUrl: string;
}

export interface SideConfig {
  slug: WeddingSide;
  label: string;
  /** Tiêu đề hiển thị trên hero */
  heroTitle: string;
  /** Ảnh hero riêng cho mỗi bên */
  heroImage: string;
  /** Địa điểm tổ chức */
  venue: VenueInfo;
  /** Lịch trình riêng */
  timeline: TimelineItem[];
  /** Thông tin QR chuyển khoản */
  qrInfo: QRInfo;
}

export interface CoupleInfo {
  name: string;
  fullName: string;
  parent1: string;
  parent2: string;  
  phone: string;
}

export interface WeddingConfig {
  /** Thông tin cô dâu */
  bride: CoupleInfo;
  /** Thông tin chú rể */
  groom: CoupleInfo;

  /** Ngày cưới */
  date: {
    full: string;
    day: string;
    month: string;
    year: string;
    dayOfWeek: string;
    lunarDate: string;
    iso: string;
  };

  /** Config cho 2 bên: nhà trai & nhà gái */
  sides: Record<WeddingSide, SideConfig>;

  /** Ảnh cưới – dùng chung cho cả 2 bên */
  gallery: string[];

  /** Loading screen */
  loadingBg: string;

  /** Footer */
  footer: {
    thanks: string;
    quote: string;
    hashtag: string;
  };
}

// ============================================================
// CẤU HÌNH — Sửa thông tin tại đây
// ============================================================

const weddingConfig: WeddingConfig = {
  groom: {
    name: "Ngọc Tuấn",
    fullName: "Nguyễn Ngọc Tuấn",
    parent1: "Ông Nguyễn Văn Tình",
    parent2: "Bà Nguyễn Thị Sáu",
    phone: "0971411197",
  },
  bride: {
    name: "Nguyễn Nga",
    fullName: "Nguyễn Thị Nga",
    parent1: "Ông Nguyễn Văn Huy ",
    parent2: "Bà Nguyễn Thị Hồng",
    phone: "0968361891",
  },

  date: {
    full: "05 tháng 04, 2026",
    day: "05",
    month: "04",
    year: "2026",
    dayOfWeek: "Chủ Nhật",
    lunarDate: "18 tháng 02",
    iso: "2026-04-05T10:00:00+07:00",
  },

  // ---- Nhà Trai & Nhà Gái ----
  sides: {
    "nha-trai": {
      slug: "nha-trai",
      label: "Nhà Trai",
      heroTitle: "Lễ Thành Hôn",
      heroImage: "/images/hero.jpg",
      venue: {
        name: "Tư gia nhà trai",
        address: "Thôn Thụy Trang, Trung Hưng, Yên Mỹ, Hưng Yên",
        time: "2026-04-04T17:30:00+07:00",
        timeLunar: "2026-02-17",
        description: "Trân trọng kính mời đến dự bữa cơm thân mật",
        mapUrl: "https://maps.app.goo.gl/ZEz3qRMXVt7SWm5f7",
      },
      timeline: [
        { time: "13:05", title: "Nhà trai xuất phát", icon: "🚗" },
        { time: "13:25", title: "Đến nhà gái – Lễ xin dâu", icon: "💐" },
        { time: "13:45", title: "Rước dâu về nhà trai", icon: "🎊" },
        { time: "14:00", title: "Làm lễ gia tiên", icon: "🙏" },
      ],
      qrInfo: {
        accountName: "Nguyễn Ngọc Tuấn",
        bankName: "VPBank",
        accountNumber: "111997228866",
        imageUrl: "/images/qr-nha-trai.png",
      },
    },
    "nha-gai": {
      slug: "nha-gai",
      label: "Nhà Gái",
      heroTitle: "Lễ Vu Quy",
      heroImage: "/images/hero.jpg",
      venue: {
        name: "Tư gia nhà gái",
        address: "Xóm 2, Thôn Trung Đạo, Trung Hưng, Yên Mỹ, Hưng Yên",
        time: "2026-04-04T17:30:00+07:00",
        timeLunar: "2026-02-17",
        mapUrl: "https://maps.app.goo.gl/6Kf2PgoRq9qhctJS8",
      },
      timeline: [
        { time: "07:00", title: "Chuẩn bị tại nhà gái", icon: "🏠" },
        { time: "08:30", title: "Đón khách", icon: "🎊" },
        { time: "09:00", title: "Nhà trai đến – Lễ xin dâu", icon: "💐" },
        { time: "09:30", title: "Làm lễ gia tiên", icon: "🙏" },
        { time: "10:00", title: "Lễ xong – Rước dâu", icon: "👰" },
        { time: "10:30", title: "Tiệc mừng tại nhà gái", icon: "🍽️" },
        { time: "12:00", title: "Tiệc kết thúc", icon: "💕" },
      ],
      qrInfo: {
        accountName: "Nguyễn Thị Nga",
        bankName: "MB Bank",
        accountNumber: "3610130537563",
        imageUrl: "/images/qr-nha-gai.png",
      },
    },
  },

  gallery: [
    "/images/gallery/str (1).jpg",
    "/images/gallery/str (2).jpg",
    "/images/gallery/str (3).jpg",
    "/images/gallery/str (4).jpg",
    "/images/gallery/str (5).jpg",
    "/images/gallery/str (6).jpg",
    "/images/gallery/str (7).jpg",
    "/images/gallery/str (8).jpg",
    "/images/gallery/str (9).jpg",
  ],

  loadingBg: "/images/loading-bg.jpg",

  footer: {
    thanks: "Cảm ơn bạn đã đến chung vui cùng chúng mình",
    quote: "Yêu là khi hai trái tim cùng đập một nhịp",
    hashtag: "#NgocTuanNguyenNga2026",
  },
};

export default weddingConfig;

/**
 * Helper – lấy config theo side
 */
export function getSideConfig(side: WeddingSide): SideConfig {
  return weddingConfig.sides[side];
}
