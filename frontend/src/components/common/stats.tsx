import type { ElementType } from "react";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ChangeType } from "@/lib/change-trend";

type TrendStatItem = {
  title: string;
  value: string;
  icon: ElementType;
  iconWrapClass: string;
  variant?: "trend";
  change: string;
  changeType: ChangeType;
  changeSuffix: string;
  changeClassName?: string;
  changeIcon?: ElementType;
};

type NoteStatItem = {
  title: string;
  value: string;
  icon: ElementType;
  iconWrapClass: string;
  variant: "note";
  note: string;
  noteClassName?: string;
};

type StatItem = TrendStatItem | NoteStatItem;

type StatsProps = {
  items: readonly StatItem[];
};

export default function Stats({ items }: StatsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

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
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.iconWrapClass}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-4xl font-bold leading-none text-foreground">
                  {item.value}
                </span>

                {item.variant === "note" ? (
                  <p
                    className={`text-xs ${
                      item.noteClassName ?? "text-muted-foreground"
                    }`}
                  >
                    {item.note}
                  </p>
                ) : (
                  <TrendMeta item={item} />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function TrendMeta({ item }: { item: TrendStatItem }) {
  const DefaultChangeIcon =
    item.changeType === "positive"
      ? TrendingUp
      : item.changeType === "negative"
        ? TrendingDown
        : Minus;

  const ChangeIcon = item.changeIcon ?? DefaultChangeIcon;

  const changeClass =
    item.changeClassName ??
    (item.changeType === "positive"
      ? "text-emerald-500"
      : item.changeType === "negative"
        ? "text-rose-500"
        : "text-muted-foreground");

  return (
    <p className="flex items-center gap-1 text-xs">
      <span className={`flex items-center gap-1 font-semibold ${changeClass}`}>
        <ChangeIcon className="h-3.5 w-3.5" />
        {item.change}
      </span>

      <span className="text-muted-foreground">{item.changeSuffix}</span>
    </p>
  );
}