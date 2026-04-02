"use client";

import { useMemo, useState } from "react";
import {
  KeyRound,
  LockKeyhole,
  ShieldEllipsis,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

type SecurityIconKey = "2fa" | "sso" | "sessionTimeout";

type SecuritySettingItem = {
  key: string;
  title: string;
  description: string;
  iconKey: SecurityIconKey;
  iconClassName: string;
  enabled: boolean;
};

type ApprovalRequestItem = {
  id: string;
  type: string;
  requester: string;
  description: string;
  requestedAgo: string;
};

type AccessSecurityPanelProps = {
  settingsTitle: string;
  approvalsTitle: string;
  settings: readonly SecuritySettingItem[];
  approvals: readonly ApprovalRequestItem[];
  approveLabel: string;
  rejectLabel: string;
};

const iconMap = {
  "2fa": ShieldEllipsis,
  sso: KeyRound,
  sessionTimeout: LockKeyhole,
} as const;

export default function AccessSecurityPanel({
  settingsTitle,
  approvalsTitle,
  settings,
  approvals,
  approveLabel,
  rejectLabel,
}: AccessSecurityPanelProps) {
  const initialState = useMemo(
    () =>
      Object.fromEntries(settings.map((item) => [item.key, item.enabled])) as Record<
        string,
        boolean
      >,
    [settings],
  );

  const [toggleState, setToggleState] = useState<Record<string, boolean>>(initialState);

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">{settingsTitle}</h2>

        <div className="space-y-3">
          {settings.map((item) => {
            const Icon = iconMap[item.iconKey];
            const checked = toggleState[item.key] ?? false;

            return (
              <Card
                key={item.key}
                className="rounded-2xl border border-border bg-card shadow-sm"
              >
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${item.iconClassName}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <Switch
                    checked={checked}
                    onCheckedChange={(value) =>
                      setToggleState((prev) => ({
                        ...prev,
                        [item.key]: value,
                      }))
                    }
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">{approvalsTitle}</h2>

        <div className="space-y-3">
          {approvals.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl border border-border bg-blue-50/60 shadow-sm"
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-sky-600">
                    {item.type}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {item.requestedAgo}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.requester}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button className="rounded-xl">{approveLabel}</Button>
                  <Button variant="secondary" className="rounded-xl">
                    {rejectLabel}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}