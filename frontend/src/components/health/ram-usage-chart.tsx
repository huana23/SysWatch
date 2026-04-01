"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartTooltip from "@/components/health/chart-tooltip";

type RamDataPoint = {
  time: string;
  used: number;
};

type RamUsageChartProps = {
  data: RamDataPoint[];
};

export default function RamUsageChart({ data }: RamUsageChartProps) {
  return (
    <div className="h-[220px] w-full min-w-0 overflow-hidden rounded-xl bg-muted lg:h-[240px]">
      <ResponsiveContainer width="100%" height="100%" debounce={140}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="ramFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.28} />
              <stop offset="55%" stopColor="#f97316" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={false}
            height={0}
            padding={{ left: 0, right: 0 }}
          />

          <YAxis hide />
          <Tooltip content={<ChartTooltip />} />

          <Area
            type="monotone"
            dataKey="used"
            name="used"
            stroke="#f97316"
            strokeWidth={3}
            fill="url(#ramFill)"
            isAnimationActive
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}