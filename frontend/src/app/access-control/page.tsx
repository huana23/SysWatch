"use client";

import { useState } from "react";
import Link from "next/link";

import AccessControlRoleCard from "@/components/access-control/role-card";
import PendingApprovalCard from "@/components/access-control/pending-approval-card";
import SecuritySettingItem from "@/components/access-control/security-setting-item";
import ActivityLogTable from "@/components/access-control/activity-log-table";
import {
  PENDING_APPROVALS_DATA,
  ROLE_DATA,
  SECURITY_SETTINGS,
} from "@/data/access-control";

export default function AccessControlPage() {
  const [securityState, setSecurityState] = useState<Record<string, boolean>>(
    Object.fromEntries(SECURITY_SETTINGS.map((s) => [s.id, s.defaultChecked])),
  );

  const handleSecurityChange = (id: string, checked: boolean) => {
    setSecurityState((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full">
        <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
          Cấu Hình Quyền & Phê Duyệt
        </h1>
        <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
          Quản lí các cấp độ truy cập , cấu hình bảo mật hệ thống và duyệt yêu
          cầu thay đổi
        </p>
      </div>

      <section className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Vai trò người dùng
          </h2>
          <Link
            href="#"
            className="text-sm font-semibold text-primary hover:underline"
          >
            + Thêm vai trò mới
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ROLE_DATA.map((role) => (
            <AccessControlRoleCard
              key={role.id}
              title={role.title}
              description={role.description}
              memberCount={role.memberCount}
              tone={role.tone}
              icon={role.icon}
              detailUrl={role.detailUrl}
            />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="font-bold text-heading-lg text-lg text-foreground">
              Thiết lập bảo mật
            </h2>
            <div className="flex flex-col gap-4">
              {SECURITY_SETTINGS.map((setting) => (
                <SecuritySettingItem
                  key={setting.id}
                  id={setting.id}
                  icon={setting.icon}
                  title={setting.title}
                  description={setting.description}
                  checked={securityState[setting.id]}
                  onCheckedChange={(checked) =>
                    handleSecurityChange(setting.id, checked)
                  }
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold text-heading-lg text-lg text-foreground">
              Luồng phê duyệt (Pending)
            </h2>
            <div className="flex flex-col gap-4">
              {PENDING_APPROVALS_DATA.map((item) => (
                <PendingApprovalCard
                  key={`${item.label}-${item.requesterName}-${item.createdAgo}`}
                  label={item.label}
                  requesterName={item.requesterName}
                  createdAgo={item.createdAgo}
                  details={item.details}
                  onApprove={() => console.log("Approve:", item.id)}
                  onReject={() => console.log("Reject:", item.id)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-heading-lg text-lg text-foreground">
              Nhật ký hoạt động
            </h2>
            <button className="text-sm font-medium text-[#64748B]">
              ≡ Lọc dữ liệu
            </button>
          </div>
          <ActivityLogTable />
        </div>
      </div>
    </div>
  );
}
