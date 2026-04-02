import type { ReactNode } from "react";

import {ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Minus} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {ChangeType} from "@/types/common";

type StatCardItemProps = {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: ReactNode;
  iconWrapClass: string;
};

export default function StatCardItem({
  title,
  value,
  change,
  changeType,
  icon,
  iconWrapClass,
}: StatCardItemProps) {
  const badgeClass =
    changeType === "positive"
      ? "bg-emerald-500/10 text-emerald-500"
      : changeType === "negative"
        ? "bg-rose-500/10 text-rose-500"
        : "bg-slate-500/10 text-slate-400";

  return (
    <Card className="rounded-2xl border border-border bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconWrapClass}`}
          >
            {icon}
          </div>

          <div
            className={`inline-flex min-h-8 items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}
          >
            {changeType === "positive" && <TrendingUp className="h-4 w-4" />}
            {changeType === "negative" && <TrendingDown className="h-4 w-4" />}
            {changeType === "neutral" && <Minus className="h-4 w-4" />}
            <span>{change}</span>
          </div>
        </div>

        <div className="mt-6 space-y-1.5">
          <p className="text-[15px] font-medium text-muted-foreground">
            {title}
          </p>

          <p className="text-[42px] font-extrabold leading-none tracking-[-0.03em] text-foreground">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}