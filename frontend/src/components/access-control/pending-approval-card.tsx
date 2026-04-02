"use client";

import { Button } from "@/components/ui/button";

type PendingApprovalCardProps = {
  label: string;
  createdAgo: string;
  requesterName: string;
  details: string;
  onApprove?: () => void;
  onReject?: () => void;
};

export default function PendingApprovalCard({
  label,
  createdAgo,
  requesterName,
  details,
  onApprove,
  onReject,
}: PendingApprovalCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#1C90E9]/20 bg-[#1C90E9]/5 p-4 shadow-none ring-0 transition-all hover:border-[#1C90E9]/30">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold tracking-wide text-[#1C90E9]">
          {label}
        </span>
        <span className="text-[11px] font-normal text-slate-400">
          {createdAgo}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h4 className="text-[15px] font-bold text-foreground">
          {requesterName}
        </h4>
        <p className="text-[13px] font-medium text-muted-foreground">
          {details}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <Button
          onClick={onApprove}
          className="h-10 flex-1 rounded-xl bg-[#1C90E9] font-bold text-white shadow-none hover:bg-[#1C90E9]/90"
        >
          Phê duyệt
        </Button>
        <Button
          onClick={onReject}
          variant="secondary"
          className="h-10 flex-1 rounded-xl bg-[#E2E8F0] font-bold text-black shadow-none hover:bg-[#E2E8F0]"
        >
          Từ chối
        </Button>
      </div>
    </div>
  );
}
