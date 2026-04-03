import type { ElementType } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SupportChannelDisplayItem = {
  label: string;
  count: number;
  percentage: number;
  icon: ElementType;
  iconClassName: string;
  barClassName: string;
};

type SupportChannelsCardProps = {
  title: string;
  filterLabel: string;
  items: readonly SupportChannelDisplayItem[];
};

export default function SupportChannelsCard({
  title,
  filterLabel,
  items,
}: SupportChannelsCardProps) {
  return (
    <Card className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <span className="text-xs font-medium text-muted-foreground">
          {filterLabel}
        </span>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex flex-1 flex-col justify-between gap-5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${item.iconClassName}`} />
                    <span className="text-foreground">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">
                      {item.count}
                    </span>
                    <span className="text-muted-foreground">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${item.barClassName}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}