import {
  Eye,
} from "lucide-react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";


import AccessActivityLogTable from "@/components/access-control/access-activity-log-table";
import AccessRoleCards from "@/components/access-control/access-role-cards";
import AccessSecurityPanel from "@/components/access-control/access-security-panel";
import {
  accessActivityLogs,
  approvalRequests,
  securitySettings,
} from "@/data/access-control";

export default function AccessControlPage() {
  const roleItems = [
  {
    title: "Quản trị viên (Admin)",
    subtitle: "Toàn quyền hệ thống",
    usersLabel: "Người dùng",
    actionLabel: "Chi tiết →",
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 45 }} />,
    gradientClassName: "bg-gradient-to-br from-sky-500 to-blue-600",
    userCount: 4,
  },
  {
    title: "Vận hành (OPT)",
    subtitle: "Quản lý nghiệp vụ hằng ngày",
    usersLabel: "Người dùng",
    actionLabel: "Chi tiết →",
    icon: <SettingsSuggestIcon sx={{ fontSize: 45 }} />,
    gradientClassName: "bg-gradient-to-br from-emerald-500 to-teal-600",
    userCount: 12,
  },
  {
    title: "Người xem (Viewer)",
    subtitle: "Chỉ được phép xem dữ liệu",
    usersLabel: "Người dùng",
    actionLabel: "Chi tiết →",
    icon: <Eye className="h-10 w-10" />,
    gradientClassName: "bg-gradient-to-br from-slate-400 to-slate-600",
    userCount: 45,
  },
] as const;

  const securitySettingItems = [
  {
    key: "2fa",
    title: "Xác thực 2 yếu tố (2FA)",
    description: "Bắt buộc cho Admin & OPT",
    iconKey: "2fa" as const,
    iconClassName: "bg-blue-500/10 text-blue-500",
    enabled: securitySettings.find((item) => item.key === "2fa")?.enabled ?? false,
  },
  {
    key: "sso",
    title: "Single Sign-On (SSO)",
    description: "Đăng nhập qua Google/Azure",
    iconKey: "sso" as const,
    iconClassName: "bg-slate-500/10 text-slate-500",
    enabled: securitySettings.find((item) => item.key === "sso")?.enabled ?? false,
  },
  {
    key: "sessionTimeout",
    title: "Hết hạn phiên làm việc",
    description: "Tự động đăng xuất sau 30p",
    iconKey: "sessionTimeout" as const,
    iconClassName: "bg-blue-500/10 text-blue-500",
    enabled:
      securitySettings.find((item) => item.key === "sessionTimeout")?.enabled ?? false,
  },
  ] as const;

  const approvalItems = approvalRequests.map((item) => ({
    id: item.id,
    type: item.type,
    requester: item.requester,
    description: item.description,
    requestedAgo: item.requestedAgo,
  }));

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full">
        <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
          Cấu Hình Quyền & Phê Duyệt
        </h1>
        <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
          Quản lí các cấp độ truy cập, cấu hình bảo mật hệ thống và duyệt yêu cầu thay đổi
        </p>
      </div>

      <AccessRoleCards
        sectionTitle="Vai trò người dùng"
        addRoleLabel="+ Thêm vai trò mới"
        items={roleItems}
      />

      <section className="grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_2fr]">
        <div className="min-w-0">
          <AccessSecurityPanel
            settingsTitle="Thiết lập bảo mật"
            approvalsTitle="Luồng phê duyệt (Pending)"
            settings={securitySettingItems}
            approvals={approvalItems}
            approveLabel="Phê duyệt"
            rejectLabel="Từ chối"
          />
        </div>

        <div className="min-w-0">
          <AccessActivityLogTable
            title="Nhật ký hoạt động"
            filterLabel="Lọc dữ liệu"
            userLabel="Người dùng"
            actionLabel="Hành động"
            timeLabel="Thời gian"
            statusLabel="Trạng thái"
            footerLabel="Hiển thị 5 trên 1,240 hoạt động"
            rows={accessActivityLogs}
          />
        </div>
      </section>
    </div>
  );
}