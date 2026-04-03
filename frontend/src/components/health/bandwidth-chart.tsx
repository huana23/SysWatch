"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartTooltip from "@/components/health/chart-tooltip";
import {BandwidthPoint} from "@/types/monitoring";

type BandwidthDataPoint = {
  name: string;
  value: number;
};

type BandwidthChartProps = {
  data: BandwidthPoint[];
};

export default function BandwidthChart({ data }: BandwidthChartProps) {
  return (
    <div className="h-[180px] w-full min-w-0 overflow-hidden sm:h-[200px] lg:h-[220px]">
      <ResponsiveContainer width="100%" height="100%" debounce={140}>
        <BarChart
          data={data}
          barCategoryGap={4}
          margin={{ top: 4, right: 6, left: 6, bottom: 0 }}
        >
          <XAxis hide dataKey="name" />
          <YAxis hide />
          <Tooltip content={<ChartTooltip />} />
          <Bar
            dataKey="value"
            fill="#ecd5c8"
            radius={[4, 4, 0, 0]}
            isAnimationActive
            animationBegin={0}
            animationDuration={700}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}