export const ROLE_DATA = [
  {
    id: "admin",
    title: "Quản trị viên (Admin)",
    description: "Toàn quyền hệ thống",
    memberCount: 4,
    tone: "admin" as const,
    icon: "admin_panel_settings",
    detailUrl: "#",
  },
  {
    id: "opt",
    title: "Vận hành (OPT)",
    description: "Quản lý nghiệp vụ hàng ngày",
    memberCount: 12,
    tone: "opt" as const,
    icon: "settings_account_box",
    detailUrl: "#",
  },
  {
    id: "viewer",
    title: "Người xem (Viewer)",
    description: "Chỉ được phép xem dữ liệu",
    memberCount: 45,
    tone: "viewer" as const,
    icon: "visibility",
    detailUrl: "#",
  },
];

export const SECURITY_SETTINGS = [
  {
    id: "two-factor",
    title: "Xác thực 2 yếu tố (2FA)",
    description: "Bắt buộc cho Admin & OPT",
    icon: "mobile_vibrate",
    defaultChecked: true,
  },
  {
    id: "sso",
    title: "Single Sign-On (SSO)",
    description: "Đăng nhập qua Google/Azure",
    icon: "vpn_key",
    defaultChecked: false,
  },
  {
    id: "session-timeout",
    title: "Hết hạn phiên làm việc",
    description: "Tự động đăng xuất sau 30p",
    icon: "timer",
    defaultChecked: true,
  },
] as const;

export const ACTIVITY_LOG_DATA = [
  {
    id: "1",
    user: {
      name: "Nguyễn An",
      initials: "NA",
      color: "bg-blue-100 text-blue-600",
    },
    action: "Đổi mật khẩu",
    at: "2023-10-12T14:20:00Z",
    status: "success",
  },
  {
    id: "2",
    user: {
      name: "Trần Minh",
      initials: "TM",
      color: "bg-purple-100 text-purple-600",
    },
    action: "Truy cập Admin Panel",
    at: "2023-10-12T11:05:00Z",
    status: "denied",
  },
  {
    id: "3",
    user: {
      name: "Lê Hoa",
      initials: "LH",
      color: "bg-orange-100 text-orange-600",
    },
    action: "Tạo vai trò mới",
    at: "2023-10-12T09:15:00Z",
    status: "success",
  },
  {
    id: "4",
    user: {
      name: "Phạm Văn",
      initials: "PV",
      color: "bg-indigo-100 text-indigo-600",
    },
    action: "Xóa người dùng",
    at: "2023-10-12T08:45:00Z",
    status: "success",
  },
  {
    id: "5",
    user: {
      name: "Quốc Trung",
      initials: "QT",
      color: "bg-rose-100 text-rose-600",
    },
    action: "Sai mật khẩu (3 lần)",
    at: "2023-10-12T07:30:00Z",
    status: "warning",
  },
  {
    id: "6",
    user: {
      name: "Hồ Hoàng",
      initials: "HH",
      color: "bg-green-100 text-green-600",
    },
    action: "Cập nhật chính sách bảo mật",
    at: "2023-10-11T16:45:00Z",
    status: "success",
  },
  {
    id: "7",
    user: {
      name: "Minh Thu",
      initials: "MT",
      color: "bg-pink-100 text-pink-600",
    },
    action: "Xuất báo cáo hệ thống",
    at: "2023-10-11T15:20:00Z",
    status: "success",
  },
  {
    id: "8",
    user: {
      name: "Anh Tuấn",
      initials: "AT",
      color: "bg-cyan-100 text-cyan-600",
    },
    action: "Khóa tài khoản vi phạm",
    at: "2023-10-11T14:10:00Z",
    status: "warning",
  },
  {
    id: "9",
    user: {
      name: "Ngọc Lan",
      initials: "NL",
      color: "bg-yellow-100 text-yellow-600",
    },
    action: "Thay đổi phân quyền Admin",
    at: "2023-10-11T10:30:00Z",
    status: "denied",
  },
  {
    id: "10",
    user: {
      name: "Sơn Tùng",
      initials: "ST",
      color: "bg-emerald-100 text-emerald-600",
    },
    action: "Đăng nhập hệ thống",
    at: "2023-10-11T08:00:00Z",
    status: "success",
  },
];

export const PENDING_APPROVALS_DATA = [
  {
    id: "app-1",
    label: "NÂNG CẤP QUYỀN",
    createdAgo: "10 phút trước",
    requesterName: "Nguyễn Văn A",
    details: "Yêu cầu: Viewer → Operator",
  },
  {
    id: "app-2",
    label: "TRUY CẬP TẠM THỜI",
    createdAgo: "2 giờ trước",
    requesterName: "Lê Thị B",
    details: "Truy cập báo cáo tài chính (24h)",
  },
];
