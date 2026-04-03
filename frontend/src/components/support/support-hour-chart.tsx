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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupportHourlyPoint } from "@/types/support";

type SupportHourChartProps = {
  title: string;
  subtitle: string;
  todayLabel: string;
  yesterdayLabel: string;
  data: SupportHourlyPoint[];
};

const CHART_X_AXIS_HEIGHT = 30;

export default function SupportHourChart({
  title,
  subtitle,
  todayLabel,
  yesterdayLabel,
  data,
}: SupportHourChartProps) {
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
    <Card className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="border-b px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span>{todayLabel}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span>{yesterdayLabel}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 p-5">
        <div
          ref={wrapperRef}
          className="h-[240px] w-full min-w-0 overflow-hidden"
        >
          <ResponsiveContainer width="100%" height="100%" debounce={40}>
            <LineChart
              data={data}
              margin={{ top: 8, right: 10, left: 4, bottom: 0 }}
            >
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0", strokeWidth: 1.5 }}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                height={CHART_X_AXIS_HEIGHT}
                interval="preserveStartEnd"
                minTickGap={24}
                padding={{ left: 1, right: 1 }}
              />

              <YAxis hide />
              <Tooltip cursor={false} />

              {showLines && (
                <>
                  <Line
                    key={`yesterday-${resizeVersion}-${dataSignature}`}
                    type="monotone"
                    dataKey="yesterday"
                    name="yesterday"
                    stroke="#cbd5e1"
                    strokeWidth={3}
                    dot={false}
                    connectNulls
                    isAnimationActive
                    animationBegin={0}
                    animationDuration={700}
                    animationEasing="ease-out"
                  />

                  <Line
                    key={`today-${resizeVersion}-${dataSignature}`}
                    type="monotone"
                    dataKey="today"
                    name="today"
                    stroke="#3b82f6"
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
      </CardContent>
    </Card>
  );
}