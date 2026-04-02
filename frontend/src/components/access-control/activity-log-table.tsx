"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ACTIVITY_LOG_DATA } from "@/data/access-control";
import { usePagination } from "@/hooks/use-pagination";
import { formatDateTime } from "@/lib/date-time";

export default function ActivityLogTable() {
  const {
    paginatedData,
    handlePrev,
    handleNext,
    startIdx,
    endIdx,
    totalItems,
    canPrev,
    canNext,
  } = usePagination({ data: ACTIVITY_LOG_DATA, pageSize: 5 });

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-card shadow-none">
      <Table>
        <TableHeader className="bg-[#F8FAFC]">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="h-auto px-6 py-4 text-[14px] font-bold text-[#64748B]">
              Người dùng
            </TableHead>
            <TableHead className="h-auto px-4 py-4 text-[14px] font-bold text-[#64748B]">
              Hành động
            </TableHead>
            <TableHead className="h-auto px-4 py-4 text-[14px] font-bold text-[#64748B]">
              Thời gian
            </TableHead>
            <TableHead className="h-auto px-6 py-4 text-[14px] font-bold text-[#64748B] text-right">
              Trạng thái
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((log) => {
            const { time, date } = formatDateTime(log.at);
            return (
              <TableRow
                key={log.id}
                className="group border-slate-100 hover:bg-slate-50/30"
              >
                <TableCell className="py-6 pl-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${log.user.color}`}
                    >
                      {log.user.initials}
                    </div>
                    <span className="text-[14px] font-normal text-[#0F172A]">
                      {log.user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-4">
                  <span className="text-[14px] font-normal text-[#0F172A]">
                    {log.action}
                  </span>
                </TableCell>
                <TableCell className="py-6 px-4">
                  <div className="flex flex-col text-[#64748B]">
                    <span className="text-[14px] font-normal">{time}</span>
                    <span className="text-[14px] font-normal">{date}</span>
                  </div>
                </TableCell>
                <TableCell className="py-6 pr-6 text-right">
                  {log.status === "success" && (
                    <span className="inline-flex items-center rounded-full bg-[#D1FAE5] px-3 py-1 text-[12px] font-bold text-[#047857]">
                      Thành công
                    </span>
                  )}
                  {log.status === "denied" && (
                    <span className="inline-flex items-center rounded-full bg-[#FEE2E2] px-3 py-1 text-[12px] font-bold text-[#B91C1C]">
                      Bị từ chối
                    </span>
                  )}
                  {log.status === "warning" && (
                    <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold text-[#B45309]">
                      Cảnh báo
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t bg-[#F8FAFC] px-6 py-4">
        <span className="text-[14px] font-normal text-[#64748B]">
          Hiển thị {startIdx} - {endIdx} trên {totalItems} hoạt động
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            className="flex size-6 items-center justify-center rounded-sm border bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[16px]">
              chevron_left
            </span>
          </button>
          <button
            onClick={handleNext}
            disabled={!canNext}
            className="flex size-6 items-center justify-center rounded-sm border bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
