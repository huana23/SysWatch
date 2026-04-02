"use client";

import { FiCpu, FiDatabase, FiHardDrive } from "react-icons/fi";
import { TriangleAlert } from "lucide-react";

import BandwidthChart from "@/components/health/bandwidth-chart";
import CpuUsageChart from "@/components/health/cpu-usage-chart";
import RamUsageChart from "@/components/health/ram-usage-chart";
import StatLegendItem from "@/components/health/stat-legend-item";
import StatusCard from "@/components/health/status-card";
import { bandwidthData, cpuData, ramData } from "@/data/health";
import { getChangeType } from "@/lib/change-trend";

export default function SystemHealthPage() {
  const currentCpu = cpuData.length ? cpuData[cpuData.length - 1].current : 0;

  const averageCpu = cpuData.length
    ? Math.round(
        cpuData.reduce((sum, item) => sum + item.current, 0) / cpuData.length,
      )
    : 0;

  const peakCpu = cpuData.length
    ? Math.max(...cpuData.map((item) => item.current))
    : 0;

  const cpuStatusChange = "+0.5%";
  const ramStatusChange = "-12%";

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
          variant="success"
          label="CPU Status"
          title="Bình thường"
          note={`${cpuStatusChange} so với giờ trước`}
          noteChangeType={getChangeType(cpuStatusChange)}
          icon={<FiCpu className="h-[27px] w-[27px]" />}
        />

        <StatusCard
          variant="warning"
          label="RAM Status"
          title="Cảnh báo"
          note={`${ramStatusChange} bộ nhớ trống`}
          noteChangeType={getChangeType(ramStatusChange)}
          icon={<FiHardDrive className="h-[27px] w-[27px]" />}
        />

        <StatusCard
          variant="danger"
          label="Database Connection"
          title="Nguy cấp"
          note="Độ trễ tăng 400ms"
          noteIcon={<TriangleAlert className="h-3.5 w-3.5" />}
          icon={<FiDatabase className="h-[27px] w-[27px]" />}
        />
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
        <section className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="xl:min-h-[102px]">
            <div className="mb-2">
              <h3 className="m-0 text-lg font-bold leading-7 text-card-foreground">
                Sử dụng CPU (%)
              </h3>
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

              <select
                defaultValue="1h"
                className="h-8 w-full max-w-full shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 text-xs font-medium leading-4 text-slate-700 outline-none transition-colors focus:border-slate-200 focus:outline-none focus:ring-0 lg:w-[134px]"
              >
                <option value="1h">Gần nhất 1 giờ</option>
                <option value="6h">Gần nhất 6 giờ</option>
                <option value="24h">Gần nhất 24 giờ</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
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

              <div className="whitespace-nowrap rounded-full bg-yellow-100 px-2 py-[5px] text-[11px] font-bold leading-4 text-yellow-700">
                ! CÓ DẤU HIỆU MEMORY LEAK
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-[10px] border border-orange-200 bg-orange-50 p-[14px]">
                <span className="mb-1.5 block text-[11px] font-bold leading-4 text-slate-500">
                  ĐÃ DÙNG
                </span>
                <strong className="text-base font-extrabold leading-6 text-orange-500">
                  12.4 GB
                </strong>
              </div>

              <div className="rounded-[10px] bg-slate-100 p-[14px]">
                <span className="mb-1.5 block text-[11px] font-bold leading-4 text-slate-500">
                  TRỐNG
                </span>
                <strong className="text-base font-extrabold leading-6 text-slate-900">
                  3.6 GB
                </strong>
              </div>

              <div className="rounded-[10px] bg-slate-100 p-[14px]">
                <span className="mb-1.5 block text-[11px] font-bold leading-4 text-slate-500">
                  SWAP
                </span>
                <strong className="text-base font-extrabold leading-6 text-slate-900">
                  512 MB
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-1.5">
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
            <p className="m-0 text-xs font-normal leading-4 text-slate-500">
              Tốc độ truyền tải và chất lượng kết nối mạng
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500">
                ĐỘ TRỄ (LATENCY)
              </span>
              <strong className="text-base font-extrabold leading-6 text-green-500">
                24ms
              </strong>
            </div>

            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500">
                MẤT GÓI (LOSS)
              </span>
              <strong className="text-base font-extrabold leading-6 text-card-foreground">
                0.02%
              </strong>
            </div>

            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500">
                LƯU LƯỢNG INBOUND
              </span>
              <strong className="text-base font-extrabold leading-6 text-orange-500">
                850 Mbps
              </strong>
            </div>

            <div>
              <span className="mb-1.5 block whitespace-nowrap text-[11px] font-bold leading-4 text-slate-500">
                LƯU LƯỢNG OUTBOUND
              </span>
              <strong className="text-base font-extrabold leading-6 text-card-foreground">
                1.2 Gbps
              </strong>
            </div>
          </div>
        </div>

        <BandwidthChart data={bandwidthData} />
      </section>
    </div>
  );
}