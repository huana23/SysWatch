"use client";

import { ChevronDown } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GrowthPoint } from "@/types/partners";

type PartnerGrowthChartProps = {
  title: string;
  filterLabel: string;
  data: GrowthPoint[];
};

export default function PartnerGrowthChart({
  title,
  filterLabel,
  data,
}: PartnerGrowthChartProps) {
  return (
    <Card className="min-w-0 rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <button className="inline-flex items-center gap-1 rounded-xl bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {filterLabel}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </CardHeader>

      <CardContent className="p-5">
        <div className="h-[320px] w-full min-w-0 overflow-hidden rounded-xl">
          <ResponsiveContainer width="100%" height="100%" debounce={140}>
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="partnerGrowthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2284F5" stopOpacity={0.28} />
                  <stop offset="55%" stopColor="#2284F5" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#2284F5" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis hide />
              <Tooltip cursor={false} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#2284F5"
                strokeWidth={3}
                fill="url(#partnerGrowthFill)"
                isAnimationActive
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}