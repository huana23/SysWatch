import type {
  DashboardActivityItem,
  DashboardAlertItem,
  DashboardModuleMetrics,
  DashboardOverviewStats,
} from "@/types/overview";

export const dashboardOverviewStats: DashboardOverviewStats = {
  users: {
    value: "1,245,890",
    change: "+12%",
    changeType: "up",
  },
  orders: {
    value: "45,120",
    change: "+8%",
    changeType: "up",
  },
  partners: {
    value: "1,542",
    change: "0%",
    changeType: "neutral",
  },
  revenue: {
    value: "$125,430",
    change: "+5%",
    changeType: "up",
  },
};

export const dashboardAlerts: DashboardAlertItem[] = [
  {
    message: "Sử dụng CPU cao trên Node-1 (vượt quá 95%)",
    time: "2 phút trước",
    type: "danger",
  },
  {
    message: "Vi phạm SLA trên Phiếu hỗ trợ #123 (Quá hạn)",
    time: "15 phút trước",
    type: "warning",
  },
  {
    message: "Bảo trì cơ sở dữ liệu dự kiến trong 6 giờ tới.",
    time: "1 giờ trước",
    type: "info",
  },
];

export const dashboardActivities: DashboardActivityItem[] = [
  {
    title: "Đã thêm người dùng quản trị mới",
    description: "Sarah Jenkins đã được hệ thống cấp quyền quản trị.",
    time: "12:45 PM",
    isActive: true
  },
  {
    title: "Hoàn tất sao lưu hệ thống",
    description: "Bản sao lưu hàng đêm của DB sản xuất US-East-1 thành công.",
    time: "10:00 AM",
  isActive: false
  },
  {
    title: "Khóa API đã được thay đổi",
    description: "Khóa API nền tảng tiếp thị đã được tự động làm mới.",
    time: "Hôm qua",
     isActive: false
  },
];

export const dashboardModuleMetrics: DashboardModuleMetrics = {
  systemHealth: {
    value: 90,
    status: "OPTIMAL",
  },
  partners: {
    value: 75,
    status: "ACTIVE",
  },
  customerSupport: {
    value: 40,
    status: "BUSY",
  },
  marketing: {
    value: 85,
    status: "HIGH ROI",
  },
  accessControl: {
    value: 100,
    status: "SECURE",
  },
};