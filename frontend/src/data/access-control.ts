import type {
  AccessActivityLog,
  AccessRoleSummary,
  ApprovalRequest,
  SecuritySetting,
} from "@/types/access-control";

export const accessRoleSummaries: AccessRoleSummary[] = [
  {
    key: "admin",
    userCount: 4,
  },
  {
    key: "operator",
    userCount: 12,
  },
  {
    key: "viewer",
    userCount: 45,
  },
];

export const securitySettings: SecuritySetting[] = [
  {
    key: "2fa",
    enabled: true,
  },
  {
    key: "sso",
    enabled: false,
  },
  {
    key: "sessionTimeout",
    enabled: true,
  },
];

export const approvalRequests: ApprovalRequest[] = [
  {
    id: "REQ-001",
    type: "Nâng cấp quyền",
    requester: "Nguyễn Văn A",
    description: "Yêu cầu: Viewer → Operator",
    requestedAgo: "10 phút trước",
  },
  {
    id: "REQ-002",
    type: "Truy cập tạm thời",
    requester: "Lê Thị B",
    description: "Truy cập báo cáo tài chính (24h)",
    requestedAgo: "1 giờ trước",
  },
];

export const accessActivityLogs: AccessActivityLog[] = [
  {
    id: "LOG-001",
    userInitials: "NA",
    userName: "Nguyễn An",
    action: "Đổi mật khẩu",
    time: "14:20",
    date: "12/10/2023",
    status: "success",
  },
  {
    id: "LOG-002",
    userInitials: "TM",
    userName: "Trần Minh",
    action: "Truy cập Admin Panel",
    time: "11:05",
    date: "12/10/2023",
    status: "rejected",
  },
  {
    id: "LOG-003",
    userInitials: "LH",
    userName: "Lê Hoa",
    action: "Tạo vai trò mới",
    time: "09:15",
    date: "12/10/2023",
    status: "success",
  },
  {
    id: "LOG-004",
    userInitials: "PV",
    userName: "Phạm Văn",
    action: "Xóa người dùng",
    time: "08:45",
    date: "12/10/2023",
    status: "success",
  },
  {
    id: "LOG-005",
    userInitials: "QT",
    userName: "Quốc Trung",
    action: "Sai mật khẩu (3 lần)",
    time: "07:30",
    date: "12/10/2023",
    status: "warning",
  },
];