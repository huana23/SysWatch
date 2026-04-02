"use client";

type SecuritySettingItemProps = {
  id: string;
  icon: string;
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

import { Switch } from "@/components/ui/switch";

export default function SecuritySettingItem({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
}: SecuritySettingItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
      <div className="flex gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            {icon}
          </span>
        </div>

        <div>
          <p className="font-bold text-sm text-foreground leading-6">{title}</p>
          <p className="text-xs text-slate-500 leading-6">{description}</p>
        </div>
      </div>

      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
