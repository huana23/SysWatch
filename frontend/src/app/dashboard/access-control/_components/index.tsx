import roleAdminIcon from "@/assets/images/role-admin.svg";
import roleOptIcon from "@/assets/images/role-opt.svg";
import roleViewerIcon from "@/assets/images/role-viewer.svg";

import AccessControlActivityLogView from "./access-control-activity-log-view.client";
import AccessControlPageHeader from "./access-control-page-header";
import AccessControlPendingApprovalSection from "./access-control-pending-approval-section";
import { AccessControlRoleCardSection } from "./access-control-role-card-section";
import AccessControlSecuritySection from "./access-control-security-section";

const AccessControlView = () => {
  return (
    <div className="space-y-8">
      <AccessControlPageHeader
        title="Cấu Hình Quyền & Phê Duyệt"
        description="Quản lý các cấp độ truy cập, cấu hình bảo mật hệ thống và duyệt yêu cầu thay đổi."
      />
      <AccessControlRoleCardSection
        roles={[
          {
            iconSrc: roleAdminIcon,
            title: "Quản trị viên (Admin)",
            description: "Toàn quyền hệ thống",
            memberCount: 100,
            tone: "admin",
            detailUrl: "/users",
          },
          {
            iconSrc: roleOptIcon,
            title: "Vận hành (OPT)",
            description: "Quản lý nghiệp vụ hàng ngày",
            memberCount: 100,
            tone: "opt",
            detailUrl: "/users",
          },
          {
            iconSrc: roleViewerIcon,
            title: "Người xem (Viewer)",
            description: "Chỉ được phép xem dữ liệu",
            memberCount: 100,
            tone: "viewer",
            detailUrl: "/users",
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <AccessControlSecuritySection />

          <AccessControlPendingApprovalSection
            items={[
              {
                label: "Vai trò người dùng",
                requesterName: "Nguyễn Văn A",
                createdAgo: "1 giờ trước",
                summary: "Yêu cầu thay đổi vai trò người dùng",
              },
              {
                label: "Vai trò người dùng",
                requesterName: "Nguyễn Văn A",
                createdAgo: "1 giờ trước",
                summary: "Yêu cầu thay đổi vai trò người dùng",
              },
            ]}
          />
        </div>

        <div className="lg:col-span-8">
          <AccessControlActivityLogView />
        </div>
      </div>
    </div>
  );
};

export default AccessControlView;
