"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoleItem } from "@/types/partners";

type PartnerRoleChartProps = {
  title: string;
  totalLabel: string;
  totalCaption: string;
  data: RoleItem[];
};

export default function PartnerRoleChart({
  title,
  totalLabel,
  totalCaption,
  data,
}: PartnerRoleChartProps) {
  return (
    <Card className="min-w-0 rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <div className="relative mx-auto h-[220px] w-full min-w-0 max-w-[260px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%" debounce={140}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={88}
                paddingAngle={4}
                stroke="none"
                isAnimationActive
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">
              {totalLabel}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {totalCaption}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>

              <span className="font-semibold text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}