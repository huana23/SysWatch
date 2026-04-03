import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AccessActivityStatus } from "@/types/access-control";

type AccessActivityLogRow = {
  id: string;
  userInitials: string;
  userName: string;
  action: string;
  time: string;
  date: string;
  status: AccessActivityStatus;
};

type AccessActivityLogTableProps = {
  title: string;
  filterLabel: string;
  userLabel: string;
  actionLabel: string;
  timeLabel: string;
  statusLabel: string;
  footerLabel: string;
  rows: readonly AccessActivityLogRow[];
};

function getStatusBadge(status: AccessActivityStatus) {
  if (status === "success") {
    return {
      label: "Thành công",
      className: "bg-emerald-500/10 text-emerald-600",
    };
  }

  if (status === "rejected") {
    return {
      label: "Bị từ chối",
      className: "bg-rose-500/10 text-rose-600",
    };
  }

  return {
    label: "Cảnh báo",
    className: "bg-amber-500/10 text-amber-600",
  };
}

function getInitialBadgeClass(initials: string) {
  const colorMap: Record<string, string> = {
    NA: "bg-blue-500/10 text-blue-600",
    TM: "bg-violet-500/10 text-violet-600",
    LH: "bg-amber-500/10 text-amber-600",
    PV: "bg-indigo-500/10 text-indigo-600",
    QT: "bg-rose-500/10 text-rose-600",
  };

  return colorMap[initials] ?? "bg-slate-500/10 text-slate-600";
}

export default function AccessActivityLogTable({
  title,
  filterLabel,
  userLabel,
  actionLabel,
  timeLabel,
  statusLabel,
  footerLabel,
  rows,
}: AccessActivityLogTableProps) {
  return (
    <Card className="min-w-0 rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 py-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>

        <Button
          variant="ghost"
          className="h-auto gap-1 p-0 text-sm font-medium text-muted-foreground"
        >
          {filterLabel}
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-4 font-semibold">{userLabel}</th>
                <th className="px-5 py-4 font-semibold">{actionLabel}</th>
                <th className="px-5 py-4 font-semibold">{timeLabel}</th>
                <th className="px-5 py-4 font-semibold">{statusLabel}</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const badge = getStatusBadge(row.status);

                return (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${getInitialBadgeClass(
                            row.userInitials,
                          )}`}
                        >
                          {row.userInitials}
                        </div>

                        <span className="text-sm text-foreground">
                          {row.userName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-foreground">
                      {row.action}
                    </td>

                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      <div>{row.time}</div>
                      <div>{row.date}</div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <span>{footerLabel}</span>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}