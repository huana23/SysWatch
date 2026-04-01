import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

import type { DashboardAlertItem } from "@/types/overview";

type AlertCardItemProps = {
  item: DashboardAlertItem;
};

function getAlertConfig(type: DashboardAlertItem["type"]) {
  if (type === "danger") {
    return {
      title: "CẢNH BÁO NGHIÊM TRỌNG",
      wrap: "border-red-500/15 bg-red-500/5",
      iconClass: "text-red-500",
      titleClass: "text-red-500",
      timeClass: "text-red-400",
      Icon: ShieldAlert,
    };
  }

  if (type === "warning") {
    return {
      title: "CẢNH BÁO",
      wrap: "border-amber-500/15 bg-amber-500/5",
      iconClass: "text-amber-500",
      titleClass: "text-amber-500",
      timeClass: "text-amber-400",
      Icon: AlertTriangle,
    };
  }

  return {
    title: "THÔNG TIN",
    wrap: "border-blue-500/15 bg-blue-500/5",
    iconClass: "text-blue-500",
    titleClass: "text-blue-500",
    timeClass: "text-blue-400",
    Icon: Info,
  };
}

export default function AlertCardItem({ item }: AlertCardItemProps) {
  const config = getAlertConfig(item.type);
  const Icon = config.Icon;

  return (
    <div className={`rounded-xl border p-4 ${config.wrap}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${config.iconClass}`}>
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-3">
            <p className={`text-sm font-bold ${config.titleClass}`}>
              {config.title}
            </p>

            <span className={`text-xs font-medium ${config.timeClass}`}>
              {item.time}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">{item.message}</p>
        </div>
      </div>
    </div>
  );
}