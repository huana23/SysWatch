"use client";

import {
  AlertCircle,
  CircleCheckBig,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  Ticket,
  TriangleAlert,
  CircleEllipsis,
} from "lucide-react";

import Stats from "@/components/common/stats";
import SupportChannelsCard from "@/components/support/support-channels-card";
import SupportHourChart from "@/components/support/support-hour-chart";
import SupportRecentTicketsTable from "@/components/support/support-recent-tickets-table";
import SupportSlaCard from "@/components/support/support-sla-card";
import { useSupportRealtime } from "@/hooks/use-support-realtime";
import { getChangeType } from "@/lib/change-trend";

function SupportStatSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="h-9 w-9 animate-pulse rounded-xl bg-muted" />
      </div>

      <div className="flex items-end gap-2">
        <div className="h-9 w-24 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

function SupportPanelSkeleton({ height = "h-[320px]" }: { height?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card shadow-sm animate-pulse ${height}`}
    />
  );
}

export default function SupportPage() {
  const { isReady, summary, channels, hourlyData, recentTickets, slaSummary } =
    useSupportRealtime();

  const supportStatItems = [
    {
      title: "Tổng ticket",
      value: summary.totalTickets,
      change: summary.totalTicketsChange,
      changeType: getChangeType(summary.totalTicketsChange),
      changeSuffix: "so với chu kỳ trước",
      icon: Ticket,
      iconWrapClass: "bg-blue-500/10 text-blue-500",
      changeClassName: "text-emerald-500",
    },
    {
      title: "Đã giải quyết",
      value: summary.resolvedTickets,
      change: summary.resolvedTicketsChange,
      changeType: getChangeType(summary.resolvedTicketsChange),
      changeSuffix: "tỉ lệ hoàn thành",
      icon: CircleCheckBig,
      iconWrapClass: "bg-emerald-500/10 text-emerald-500",
      changeClassName: "text-emerald-500",
    },
    {
      title: "Đang xử lý",
      value: summary.inProgressTickets,
      change: summary.inProgressTicketsChange,
      changeType: getChangeType(summary.inProgressTicketsChange),
      changeSuffix: "thời gian chờ TB",
      icon: CircleEllipsis,
      iconWrapClass: "bg-amber-500/10 text-amber-500",
      changeClassName: "text-amber-500",
      changeIcon: Clock3,
    },
    {
      title: "Quá hạn (SLA)",
      value: summary.overdueSlaTickets,
      change: summary.overdueSlaTicketsChange,
      changeType: getChangeType(summary.overdueSlaTicketsChange),
      changeIcon: TriangleAlert,
      changeSuffix: "cần xử lý gấp",
      icon: AlertCircle,
      iconWrapClass: "bg-rose-500/10 text-rose-500",
      changeClassName: "text-rose-500",
    },
  ] as const;

  const channelItems = channels.map((item) => {
    if (item.key === "email") {
      return {
        label: "Email",
        count: item.count,
        percentage: item.percentage,
        icon: Mail,
        iconClassName: "text-blue-500",
        barClassName: "bg-blue-500",
      };
    }

    if (item.key === "phone") {
      return {
        label: "Điện thoại",
        count: item.count,
        percentage: item.percentage,
        icon: Phone,
        iconClassName: "text-emerald-500",
        barClassName: "bg-emerald-500",
      };
    }

    return {
      label: "Mạng xã hội",
      count: item.count,
      percentage: item.percentage,
      icon: MessageCircle,
      iconClassName: "text-violet-500",
      barClassName: "bg-violet-500",
    };
  });

  const recentTicketRows = recentTickets.map((item) => {
    const channelMap = {
      email: {
        channelIcon: Mail,
        channelIconClassName: "text-slate-400",
      },
      phone: {
        channelIcon: Phone,
        channelIconClassName: "text-slate-400",
      },
      social: {
        channelIcon: MessageCircle,
        channelIconClassName: "text-slate-400",
      },
    } as const;

    const statusMap = {
      in_progress: {
        statusLabel: "Đang xử lý",
        statusClassName: "bg-amber-500/10 text-amber-500",
      },
      resolved: {
        statusLabel: "Hoàn Thành",
        statusClassName: "bg-emerald-500/10 text-emerald-500",
      },
      overdue: {
        statusLabel: "Quá hạn",
        statusClassName: "bg-rose-500/10 text-rose-500",
      },
    } as const;

    const slaClassName =
      item.status === "overdue"
        ? "text-rose-500"
        : item.status === "in_progress"
          ? "text-amber-500"
          : "text-muted-foreground";

    return {
      id: item.id,
      customer: item.customer,
      issue: item.issue,
      channelIcon: channelMap[item.channel].channelIcon,
      channelIconClassName: channelMap[item.channel].channelIconClassName,
      statusLabel: statusMap[item.status].statusLabel,
      statusClassName: statusMap[item.status].statusClassName,
      sla: item.sla,
      slaClassName,
    };
  });

  const slaItems = [
    {
      label: "Thời gian phản hồi đầu",
      valueLabel: `${slaSummary.firstResponseRate}% Đạt`,
      progress: slaSummary.firstResponseRate,
      barClassName: "bg-blue-500",
      valueClassName: "text-blue-500",
    },
    {
      label: "Thời gian giải quyết",
      valueLabel: `${slaSummary.resolutionRate}% Đạt`,
      progress: slaSummary.resolutionRate,
      barClassName: "bg-emerald-500",
      valueClassName: "text-emerald-500",
    },
    {
      label: "Vi phạm nghiêm trọng",
      valueLabel: `${slaSummary.criticalBreachCount} Ticket`,
      progress: slaSummary.criticalBreachProgress,
      barClassName: "bg-rose-500",
      valueClassName: "text-rose-500",
    },
  ];

  if (!isReady) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="w-full">
          <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
            Chăm Sóc Khách Hàng
          </h1>
          <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
            Báo cáo hiệu suất chăm sóc khách hàng cụ thể
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SupportStatSkeleton />
          <SupportStatSkeleton />
          <SupportStatSkeleton />
          <SupportStatSkeleton />
        </div>

        <section className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[1fr_2fr]">
          <SupportPanelSkeleton height="h-[290px]" />
          <SupportPanelSkeleton height="h-[290px]" />
        </section>

        <section className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[2fr_1fr]">
          <SupportPanelSkeleton height="h-[360px]" />
          <SupportPanelSkeleton height="h-[360px]" />
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
              Chăm Sóc Khách Hàng
            </h1>
            <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
              Báo cáo hiệu suất chăm sóc khách hàng cụ thể
            </p>
          </div>
        </div>
      </div>

      <Stats items={supportStatItems} />

      <section className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[1fr_2fr]">
        <div className="min-w-0">
          <SupportChannelsCard
            title="Kênh hỗ trợ"
            filterLabel="7 ngày qua"
            items={channelItems}
          />
        </div>

        <div className="min-w-0">
          <SupportHourChart
            title="Phân bổ Ticket theo giờ"
            subtitle="Thời gian cao điểm nhận yêu cầu hỗ trợ"
            todayLabel="Hôm nay"
            yesterdayLabel="Hôm qua"
            data={hourlyData}
          />
        </div>
      </section>

      <section className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="min-w-0 h-full">
          <SupportRecentTicketsTable
            title="Danh sách Ticket mới nhất"
            viewAllLabel="Xem tất cả"
            rows={recentTicketRows}
          />
        </div>

        <div className="min-w-0 h-full">
          <SupportSlaCard
            title="Theo dõi Vi phạm SLA"
            items={slaItems}
            note="SLA được tính dựa trên thời gian làm việc chính thức (8h-18h). Các ticket nhận ngoài giờ sẽ được tính vào sáng hôm sau."
          />
        </div>
      </section>
    </div>
  );
}