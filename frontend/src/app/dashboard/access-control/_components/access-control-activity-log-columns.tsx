"use client";

import type { Column } from "@/types/table";
import type { AccessControlActivityLog } from "@/types/access-control/activity-log";
import { AccessControlActivityLogStatus } from "@/types/access-control/activity-log";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils/format-date";
import { getInitials } from "@/lib/utils/get-initial";

function initialsTone(initials: string) {
  const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  const tones = [
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-amber-100 text-amber-700",
    "bg-indigo-100 text-indigo-700",
    "bg-rose-100 text-rose-700",
  ];
  return tones[code % tones.length];
}

function statusView(status: AccessControlActivityLog["status"]) {
  switch (status) {
    case AccessControlActivityLogStatus.SUCCESS:
      return {
        label: "Thành công",
        className: "border-0 bg-success text-success-foreground font-bold",
      };
    case AccessControlActivityLogStatus.FAILED:
      return {
        label: "Bị từ chối",
        className: "border-0 bg-error text-error-foreground font-bold",
      };
    case AccessControlActivityLogStatus.PENDING:
    default:
      return {
        label: "Cảnh báo",
        className: "border-0 bg-warning text-warning-foreground font-bold",
      };
  }
}

export const accessControlActivityLogColumns: Column<AccessControlActivityLog>[] =
  [
    {
      header: "Người dùng",
      cell: (row) => {
        const initials = getInitials(row.userName);
        return (
          <div className="flex items-center gap-4">
            <div
              className={`flex size-10 items-center justify-center rounded-full font-semibold text-sm ${initialsTone(
                initials,
              )}`}
            >
              {initials}
            </div>
            <span className="font-normal text-heading-lg">{row.userName}</span>
          </div>
        );
      },
    },
    {
      header: "Hành động",
      cell: (row) => (
        <span className="text-heading-lg font-normal leading-relaxed">
          {row.action}
        </span>
      ),
    },
    {
      header: "Thời gian",
      cell: (row) => {
        const { time, date } = formatDateTime(row.createdAt ?? "");
        return (
          <div className="flex flex-col gap-0.5 text-heading-md">
            <span>{time}</span>
            {date ? <span>{date}</span> : null}
          </div>
        );
      },
    },
    {
      header: "Trạng thái",
      align: "right",
      cell: (row) => {
        const s = statusView(row.status);
        return <Badge className={`h-7 px-4 ${s.className}`}>{s.label}</Badge>;
      },
    },
  ];
