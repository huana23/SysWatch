"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartTooltip from "@/components/health/chart-tooltip";
import { CpuDataPoint } from "@/types/health";

type CpuUsageChartProps = {
  data: CpuDataPoint[];
};

const CHART_X_AXIS_HEIGHT = 30;

export default function CpuUsageChart({ data }: CpuUsageChartProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const resizeTimerRef = useRef<number | null>(null);
  const ignoreFirstResizeRef = useRef(true);

  const [showLines, setShowLines] = useState(true);
  const [resizeVersion, setResizeVersion] = useState(0);

  const dataSignature = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      if (ignoreFirstResizeRef.current) {
        ignoreFirstResizeRef.current = false;
        return;
      }

      setShowLines(false);

      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = window.setTimeout(() => {
        setResizeVersion((prev) => prev + 1);
        setShowLines(true);
      }, 120);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="h-[240px] w-full min-w-0 overflow-hidden lg:h-[310px]"
    >
      <ResponsiveContainer width="100%" height="100%" debounce={40}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 10, left: 4, bottom: 0 }}
        >
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0", strokeWidth: 1.5 }}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            height={CHART_X_AXIS_HEIGHT}
            interval="preserveStartEnd"
            minTickGap={24}
            padding={{ left: 1, right: 1 }}
          />

          <YAxis hide domain={[0, 100]} />
          <Tooltip content={<ChartTooltip />} />

          {showLines && (
            <>
              <Line
                key={`average-${resizeVersion}-${dataSignature}`}
                type="monotone"
                dataKey="average"
                name="average"
                stroke="#a8b3c2"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                connectNulls
                isAnimationActive
                animationBegin={0}
                animationDuration={700}
                animationEasing="ease-out"
              />

              <Line
                key={`current-${resizeVersion}-${dataSignature}`}
                type="monotone"
                dataKey="current"
                name="current"
                stroke="#f97316"
                strokeWidth={3}
                dot={false}
                connectNulls
                isAnimationActive
                animationBegin={0}
                animationDuration={850}
                animationEasing="ease-out"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}