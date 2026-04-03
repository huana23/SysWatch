"use client";

import { useMemo, useState } from "react";

import { Handshake, ShieldCheck, UserPlus } from "lucide-react";
import { MdOutlineQueryStats } from "react-icons/md";

import PartnerGrowthChart from "@/components/partners/partner-growth-chart";
import PartnerRegionCard from "@/components/partners/partner-region-card";
import PartnerRoleChart from "@/components/partners/partner-role-chart";
import PartnerSlaTable from "@/components/partners/partner-sla-table";
import PartnerStats from "@/components/partners/partner-stats";
import { usePartnerRealtime } from "@/hooks/use-partner-realtime";

function PartnerStatSkeleton() {
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

function PartnerPanelSkeleton({ height = "h-[380px]" }: { height?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card shadow-sm animate-pulse ${height}`}
    />
  );
}

const RANGE_OPTIONS = [
  { label: "3 tháng gần nhất", value: "3m" },
  { label: "4 tháng gần nhất", value: "4m" },
  { label: "6 tháng qua", value: "6m" },
  { label: "Toàn bộ", value: "all" },
];

export default function PartnerPage() {
  const { isReady, summary, growthData, roleData, regionData, regionMap, slaData } =
    usePartnerRealtime();

  const [selectedRange, setSelectedRange] = useState("6m");

  const filteredGrowthData = useMemo(() => {
    if (selectedRange === "3m") {
      return growthData.slice(-3);
    }

    if (selectedRange === "4m") {
      return growthData.slice(-4);
    }

    if (selectedRange === "6m") {
      return growthData.slice(-6);
    }

    return growthData;
  }, [growthData, selectedRange]);

  const partnerStatItems = [
    {
      title: "Tổng đối tác",
      value: summary.totalPartners,
      change: summary.totalPartnersChange,
      icon: Handshake,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
    {
      title: "Khách hàng mới",
      value: summary.newCustomers,
      change: summary.newCustomersChange,
      icon: UserPlus,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
    {
      title: "Tỷ lệ tăng trưởng",
      value: summary.growthRate,
      change: summary.growthRateChange,
      icon: MdOutlineQueryStats,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
    {
      title: "SLA trung bình",
      value: summary.avgSla,
      change: summary.avgSlaChange,
      icon: ShieldCheck,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
  ];

  if (!isReady) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="w-full">
          <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
            Đối Tác &amp; Khách Hàng
          </h1>
          <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
            Theo dõi chỉ số và hiệu suất của đối tác và khách hàng trên toàn quốc
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PartnerStatSkeleton />
          <PartnerStatSkeleton />
          <PartnerStatSkeleton />
          <PartnerStatSkeleton />
        </div>

        <section className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
          <PartnerPanelSkeleton />
          <PartnerPanelSkeleton height="h-[370px]" />
        </section>

        <section className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[1.1fr_1fr]">
          <PartnerPanelSkeleton height="h-[520px]" />
          <PartnerPanelSkeleton height="h-[520px]" />
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
              Đối Tác &amp; Khách Hàng
            </h1>
            <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
              Theo dõi chỉ số và hiệu suất của đối tác và khách hàng trên toàn quốc
            </p>
          </div>
        </div>
      </div>

      <PartnerStats items={partnerStatItems} />

      <section className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="min-w-0 h-full">
          <PartnerGrowthChart
            title="Xu hướng tăng trưởng người dùng"
            data={filteredGrowthData}
            selectedRange={selectedRange}
            rangeOptions={RANGE_OPTIONS}
            onRangeChange={setSelectedRange}
          />
        </div>

        <div className="min-w-0 h-full">
          <PartnerRoleChart
            title="Phân loại theo vai trò"
            totalLabel={summary.totalPartners}
            totalCaption="Tổng cộng"
            data={roleData}
          />
        </div>
      </section>

      <section className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0 h-full">
          <PartnerRegionCard
            title="Phân đoạn theo khu vực"
            regionData={regionData}
            regionMap={regionMap}
          />
        </div>

        <div className="min-w-0">
          <PartnerSlaTable
            title="Tuân thủ SLA & Thời gian xử lý"
            viewAllLabel="Xem tất cả"
            partnerColumnLabel="Đối tác"
            slaColumnLabel="Tuân thủ SLA"
            avgTimeColumnLabel="Thời gian TB"
            data={slaData}
          />
        </div>
      </section>
    </div>
  );
}