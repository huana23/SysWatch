import type { ReactNode } from "react";

import type { ChangeType } from "@/types/overview";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type StatCardItemProps = {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: ReactNode;
  iconWrapClass: string;
};

function getChangeBadgeClass(type: ChangeType) {
  if (type === "up") {
    return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10";
  }

  if (type === "down") {
    return "bg-red-500/10 text-red-500 hover:bg-red-500/10";
  }

  return "bg-muted text-muted-foreground hover:bg-muted";
}

export default function StatCardItem({
  title,
  value,
  change,
  changeType,
  icon,
  iconWrapClass,
}: StatCardItemProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconWrapClass}`}
          >
            {icon}
          </div>

          <Badge className={getChangeBadgeClass(changeType)}>{change}</Badge>
        </div>

        <p className="mb-2 text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <h3 className="text-[2rem] font-extrabold leading-none tracking-tight text-foreground">
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}