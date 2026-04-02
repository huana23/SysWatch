import type { ElementType } from "react";

import { TrendingDown, TrendingUp, Minus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getChangeMeta } from "@/lib/change-trend";

type PartnerStatItem = {
  title: string;
  value: string;
  change: string;
  icon: ElementType;
  iconWrapClass?: string;
};

type PartnerStatsProps = {
  items: PartnerStatItem[];
};

export default function PartnerStats({ items }: PartnerStatsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        const { changeType, displayChange } = getChangeMeta(item.change);

        const ChangeIcon =
          changeType === "positive"
            ? TrendingUp
            : changeType === "negative"
              ? TrendingDown
              : Minus;

        const changeClass =
          changeType === "positive"
            ? "text-emerald-500"
            : changeType === "negative"
              ? "text-rose-500"
              : "text-muted-foreground";

        return (
          <Card
            key={item.title}
            className="rounded-2xl border border-border bg-card shadow-sm"
          >
            <CardContent className="p-5">
              <div className="mb-5 flex items-start justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </p>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    item.iconWrapClass ?? "bg-sky-500/10 text-sky-500"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold leading-none text-foreground">
                  {item.value}
                </span>

                <span
                  className={`flex items-center gap-1 pb-1 text-sm font-semibold ${changeClass}`}
                >
                  <ChangeIcon className="h-4 w-4" />
                  {displayChange}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}