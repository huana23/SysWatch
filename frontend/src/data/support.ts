import type {
  SupportChannelItem,
  SupportHourlyPoint,
  SupportRecentTicket,
  SupportSlaSummary,
  SupportSummary,
} from "@/types/support";

export const supportSummary: SupportSummary = {
  totalTickets: "1,284",
  totalTicketsChange: "+12.5%",
  resolvedTickets: "856",
  resolvedTicketsChange: "+8.2%",
  inProgressTickets: "328",
  inProgressTicketsChange: "~4.2h",
  overdueSlaTickets: "100",
  overdueSlaTicketsChange: "-2.1%",
};

export const supportChannels: SupportChannelItem[] = [
  { key: "email", count: 642, percentage: 50 },
  { key: "phone", count: 513, percentage: 40 },
  { key: "social", count: 129, percentage: 10 },
];

export const supportHourlyData: SupportHourlyPoint[] = [
  { hour: "08h", today: 18, yesterday: 12 },
  { hour: "10h", today: 32, yesterday: 24 },
  { hour: "12h", today: 38, yesterday: 28 },
  { hour: "14h", today: 34, yesterday: 30 },
  { hour: "16h", today: 41, yesterday: 33 },
  { hour: "18h", today: 36, yesterday: 26 },
  { hour: "20h", today: 28, yesterday: 20 },
  { hour: "22h", today: 16, yesterday: 11 },
];

export const supportRecentTickets: SupportRecentTicket[] = [
  {
    id: "#TK-9821",
    customer: "Nguyễn Văn",
    issue: "Lỗi thanh toán đơn hàng #123",
    channel: "email",
    status: "in_progress",
    sla: "15m còn lại",
  },
  {
    id: "#TK-9818",
    customer: "Trần Thị B",
    issue: "Tư vấn sản phẩm mới",
    channel: "phone",
    status: "resolved",
    sla: "---",
  },
  {
    id: "#TK-9815",
    customer: "Lê Hoàng C",
    issue: "Yêu cầu hoàn tiền",
    channel: "social",
    status: "overdue",
    sla: "Trễ 2h",
  },
];

export const supportSlaSummary: SupportSlaSummary = {
  firstResponseRate: 92,
  resolutionRate: 85,
  criticalBreachCount: 12,
  criticalBreachProgress: 22,
};