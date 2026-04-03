"use client";

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

type RangeOption = {
  label: string;
  value: string;
};

type PartnerGrowthChartProps = {
  title: string;
  data: GrowthPoint[];
  selectedRange: string;
  rangeOptions: RangeOption[];
  onRangeChange: (value: string) => void;
};

export default function PartnerGrowthChart({
  title,
  data,
  selectedRange,
  rangeOptions,
  onRangeChange,
}: PartnerGrowthChartProps) {
  return (
    <Card className="min-w-0 rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <select
          value={selectedRange}
          onChange={(event) => onRangeChange(event.target.value)}
          className="h-7 rounded-full border border-border bg-muted px-4 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-accent focus:ring-2 focus:ring-ring"
          aria-label="Chọn khoảng thời gian tăng trưởng"
        >
          {rangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </CardHeader>

      <CardContent className="p-5">
        <div className="h-[320px] w-full min-w-0 rounded-xl">
          <ResponsiveContainer width="100%" height="100%" debounce={140}>
            <AreaChart
              data={data}
              margin={{ top: 8, right: 12, left: 12, bottom: 8 }}
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
                interval={0}
                minTickGap={0}
                tickMargin={12}
                padding={{ left: 12, right: 12 }}
                tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
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