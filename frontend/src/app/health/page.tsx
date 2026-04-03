"use client";

import { TriangleAlert } from "lucide-react";
import { FiCpu, FiDatabase, FiHardDrive } from "react-icons/fi";

import BandwidthChart from "@/components/health/bandwidth-chart";
import CpuUsageChart from "@/components/health/cpu-usage-chart";
import RamUsageChart from "@/components/health/ram-usage-chart";
import StatLegendItem from "@/components/health/stat-legend-item";
import StatusCard from "@/components/health/status-card";
import { useSystemHealth } from "@/hooks/use-system-health";
import { getChangeType } from "@/lib/change-trend";

function HealthStatusSkeleton() {
  return <div className="h-32 animate-pulse rounded-xl border border-border bg-card shadow-sm" />;
}

function HealthPanelSkeleton({ height = "h-[380px]" }: { height?: string }) {
  return (
    <div className={`animate-pulse rounded-xl border border-border bg-card shadow-sm ${height}`} />
  );
}

export default function SystemHealthPage() {
  const {
    isReady,
    cpuData,
    ramData,
    bandwidthData,
    currentCpu,
    averageCpu,
    peakCpu,
    cpuStatusChange,
    ramStatusChange,
    cpuStatusVariant,
    cpuStatusTitle,
    ramStatusVariant,
    ramStatusTitle,
    databaseStatusVariant,
    databaseStatusTitle,
    databaseNote,
    ramUsedText,
    ramFreeText,
    swapText,
    latencyText,
    packetLossText,
    inboundText,
    outboundText,
    memoryLeakSignal,
    windowLabel,
  } = useSystemHealth();

  if (!isReady) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="w-full">
          <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
            Sức khỏe Hệ thống
          </h1>
          <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
            Theo dõi tài nguyên và hiệu suất máy chủ theo thời gian thực
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <HealthStatusSkeleton />
          <HealthStatusSkeleton />
          <HealthStatusSkeleton />
        </div>

        <div className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
          <HealthPanelSkeleton />
          <HealthPanelSkeleton />
        </div>

        <HealthPanelSkeleton height="h-[420px]" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full">
        <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
          Sức khỏe Hệ thống
        </h1>
        <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
          Theo dõi tài nguyên và hiệu suất máy chủ theo thời gian thực
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <StatusCard
          variant={cpuStatusVariant}
          label="CPU Status"
          title={cpuStatusTitle}
          note={`${cpuStatusChange} so với chu kỳ trước`}
          noteChangeType={getChangeType(cpuStatusChange)}
          icon={<FiCpu className="text-[36px]" />}
        />

        <StatusCard
          variant={ramStatusVariant}
          label="RAM Status"
          title={ramStatusTitle}
          note={`${ramStatusChange} bộ nhớ trống`}
          noteChangeType={getChangeType(ramStatusChange)}
          icon={<FiHardDrive className="text-[36px]" />}
        />

        <StatusCard
          variant={databaseStatusVariant}
          label="Database Connection"
          title={databaseStatusTitle}
          note={databaseNote}
          noteIcon={
            databaseStatusVariant !== "success" ? (
              <TriangleAlert className="h-3.5 w-3.5" />
            ) : undefined
          }
          icon={
              <FiDatabase className="text-[36px]" />
          }
        />
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
        <section className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="xl:min-h-[102px]">
            <div className="mb-2">
              <h3 className="m-0 text-lg font-bold leading-7 text-card-foreground">
                Sử dụng CPU (%)
              </h3>
              {/*<p className="mt-1 text-xs text-muted-foreground">*/}
              {/*  Sliding window: {windowLabel}*/}
              {/*</p>*/}
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 flex-wrap items-start gap-4 md:gap-6">
                <StatLegendItem
                  colorClass="bg-orange-500"
                  label="Hiện tại"
                  value={`${currentCpu}%`}
                />
                <StatLegendItem
                  colorClass="bg-slate-300"
                  label="Trung bình"
                  value={`${averageCpu}%`}
                />
                <StatLegendItem
                  colorClass="bg-rose-400"
                  label="Đỉnh"
                  value={`${peakCpu}%`}
                />
              </div>

              <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Tự cập nhật mỗi 30 giây
              </div>
            </div>
          </div>

          <div className="mt-4 h-[320px] min-w-0">
            <CpuUsageChart data={cpuData} />
          </div>
        </section>

        <section className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="xl:min-h-[152px]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="m-0 text-lg font-bold leading-7 text-card-foreground">
                  Phân bổ Bộ nhớ (RAM)
                </h3>
              </div>

              <div
                className={`whitespace-nowrap rounded-full px-2 py-[5px] text-[11px] font-bold leading-4 ${
                  memoryLeakSignal
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                }`}
              >
                {memoryLeakSignal ? "! CÓ DẤU HIỆU MEMORY LEAK" : "ỔN ĐỊNH"}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-[10px] border border-orange-200 bg-orange-50 p-[14px] dark:border-orange-500/20 dark:bg-orange-500/10">
                <span className="mb-1.5 block text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-300">
                  ĐÃ DÙNG
                </span>
                <strong className="text-base font-extrabold leading-6 text-orange-500">
                  {ramUsedText}
                </strong>
              </div>

              <div className="rounded-[10px] bg-slate-100 p-[14px] dark:bg-muted">
                <span className="mb-1.5 block text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-300">
                  TRỐNG
                </span>
                <strong className="text-base font-extrabold leading-6 text-slate-900 dark:text-foreground">
                  {ramFreeText}
                </strong>
              </div>

              <div className="rounded-[10px] bg-slate-100 p-[14px] dark:bg-muted">
                <span className="mb-1.5 block text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-300">
                  SWAP
                </span>
                <strong className="text-base font-extrabold leading-6 text-slate-900 dark:text-foreground">
                  {swapText}
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-1.5 h-[320px] min-w-0">
            <RamUsageChart data={ramData} />
          </div>
        </section>
      </div>

      <section className="min-w-0 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm md:p-6">
        <div className="mb-[18px] flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="m-0 text-lg font-bold leading-7 text-card-foreground">
              Băng thông &amp; Thông lượng
            </h3>
            <p className="m-0 text-xs font-normal leading-4 text-slate-500 dark:text-slate-300">
              Tốc độ truyền tải và chất lượng kết nối mạng
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-300">
                ĐỘ TRỄ (LATENCY)
              </span>
              <strong className="text-base font-extrabold leading-6 text-green-500">
                {latencyText}
              </strong>
            </div>

            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-300">
                MẤT GÓI (LOSS)
              </span>
              <strong className="text-base font-extrabold leading-6 text-card-foreground">
                {packetLossText}
              </strong>
            </div>

            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-300">
                LƯU LƯỢNG INBOUND
              </span>
              <strong className="text-base font-extrabold leading-6 text-orange-500">
                {inboundText}
              </strong>
            </div>

            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-300">
                LƯU LƯỢNG OUTBOUND
              </span>
              <strong className="text-base font-extrabold leading-6 text-card-foreground">
                {outboundText}
              </strong>
            </div>
          </div>
        </div>

        <div className="h-[320px] min-w-0">
          <BandwidthChart data={bandwidthData} />
        </div>
      </section>
    </div>
  );
}