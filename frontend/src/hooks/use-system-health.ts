"use client";

import { useEffect, useMemo, useState } from "react";

import {
  advanceSystemHealthSnapshot,
  createInitialSystemHealthSnapshot,
  UPDATE_INTERVAL_MS,
} from "@/lib/monitoring/system-health-simulator";
import type {
  HealthStatusVariant,
  SystemHealthSnapshot,
} from "@/types/monitoring";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { readStorageSnapshot, persistStorageSnapshot } from "@/lib/storage/storage-snapshot";


const STORAGE_KEY = STORAGE_KEYS.systemHealth;

const isSystemHealthSnapshot = (
  value: unknown,
): value is SystemHealthSnapshot => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const snapshot = value as SystemHealthSnapshot;

  return (
    typeof snapshot.updatedAt === "number" &&
    typeof snapshot.totalRamGb === "number" &&
    Array.isArray(snapshot.cpu) &&
    Array.isArray(snapshot.ram) &&
    Array.isArray(snapshot.bandwidth)
  );
};

const readSnapshot = (): SystemHealthSnapshot | null => {
  return readStorageSnapshot<SystemHealthSnapshot>(
    STORAGE_KEY,
    isSystemHealthSnapshot,
  );
};

const persistSnapshot = (snapshot: SystemHealthSnapshot) => {
  persistStorageSnapshot(STORAGE_KEY, snapshot);
};

const average = (values: number[]) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

const formatSignedPercent = (value: number, fractionDigits = 1) => {
  const normalized = Number.isFinite(value) ? value : 0;
  const sign = normalized >= 0 ? "+" : "";
  return `${sign}${normalized.toFixed(fractionDigits)}%`;
};

const formatGb = (value: number) => `${value.toFixed(1)} GB`;

const formatBandwidth = (mbps: number) => {
  if (mbps >= 1000) {
    return `${(mbps / 1000).toFixed(1)} Gbps`;
  }

  return `${Math.round(mbps)} Mbps`;
};

const getCpuStatus = (
  cpu: number,
): { variant: HealthStatusVariant; title: string } => {
  if (cpu >= 85) {
    return { variant: "danger", title: "Nguy cấp" };
  }

  if (cpu >= 70) {
    return { variant: "warning", title: "Cảnh báo" };
  }

  return { variant: "success", title: "Bình thường" };
};

const getRamStatus = (
  percent: number,
): { variant: HealthStatusVariant; title: string } => {
  if (percent >= 88) {
    return { variant: "danger", title: "Nguy cấp" };
  }

  if (percent >= 75) {
    return { variant: "warning", title: "Cảnh báo" };
  }

  return { variant: "success", title: "Bình thường" };
};

const getDatabaseStatus = (
  latency: number,
): { variant: HealthStatusVariant; title: string } => {
  if (latency >= 80) {
    return { variant: "danger", title: "Nguy cấp" };
  }

  if (latency >= 40) {
    return { variant: "warning", title: "Cảnh báo" };
  }

  return { variant: "success", title: "Bình thường" };
};

export const useSystemHealth = () => {
  const [snapshot, setSnapshot] = useState<SystemHealthSnapshot | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = readSnapshot();
    const initial = stored
      ? advanceSystemHealthSnapshot(stored, Date.now())
      : createInitialSystemHealthSnapshot();

    setSnapshot(initial);
    persistSnapshot(initial);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const timer = window.setInterval(() => {
      setSnapshot((current) => {
        const base = current ?? createInitialSystemHealthSnapshot();
        const next = advanceSystemHealthSnapshot(base, Date.now());
        persistSnapshot(next);
        return next;
      });
    }, UPDATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isReady]);

  return useMemo(() => {
    if (!snapshot) {
      return {
        isReady: false,
        cpuData: [],
        ramData: [],
        bandwidthData: [],
        currentCpu: 0,
        averageCpu: 0,
        peakCpu: 0,
        cpuStatusChange: "0.0%",
        ramStatusChange: "0.0%",
        cpuStatusVariant: "success" as const,
        cpuStatusTitle: "Đang tải",
        ramStatusVariant: "success" as const,
        ramStatusTitle: "Đang tải",
        databaseStatusVariant: "success" as const,
        databaseStatusTitle: "Đang tải",
        databaseNote: "Đang đồng bộ dữ liệu",
        ramUsedText: "0.0 GB",
        ramFreeText: "0.0 GB",
        swapText: "0 MB",
        latencyText: "0ms",
        packetLossText: "0.00%",
        inboundText: "0 Mbps",
        outboundText: "0 Mbps",
        memoryLeakSignal: false,
        windowLabel: "0 điểm / 30 giây",
      };
    }

    const cpuData = snapshot.cpu;
    const ramData = snapshot.ram;
    const bandwidthData = snapshot.bandwidth;

    const currentCpu = Math.round(cpuData[cpuData.length - 1]?.current ?? 0);
    const previousCpu = cpuData[cpuData.length - 2]?.current ?? currentCpu;
    const averageCpu = Math.round(average(cpuData.map((item) => item.current)));
    const peakCpu = Math.round(
      cpuData.length ? Math.max(...cpuData.map((item) => item.current)) : 0,
    );

    const currentRam = ramData[ramData.length - 1];
    const previousRam = ramData[ramData.length - 2] ?? currentRam;
    const oldestRam = ramData[0] ?? currentRam;

    const currentBandwidth = bandwidthData[bandwidthData.length - 1];
    const cpuStatus = getCpuStatus(currentCpu);
    const ramStatus = getRamStatus(currentRam?.percent ?? 0);
    const databaseStatus = getDatabaseStatus(currentBandwidth?.latency ?? 0);

    const cpuStatusChange = formatSignedPercent(
      ((currentCpu - previousCpu) / Math.max(previousCpu, 1)) * 100,
    );

    const currentRamFreePercent = 100 - (currentRam?.percent ?? 0);
    const previousRamFreePercent = 100 - (previousRam?.percent ?? currentRam?.percent ?? 0);

    const ramStatusChange = formatSignedPercent(
      currentRamFreePercent - previousRamFreePercent,
      2,
    );

    const memoryLeakSignal =
      (currentRam?.percent ?? 0) - (oldestRam?.percent ?? 0) >= 2;

    return {
      isReady: true,
      cpuData,
      ramData,
      bandwidthData,
      currentCpu,
      averageCpu,
      peakCpu,
      cpuStatusChange,
      ramStatusChange,
      cpuStatusVariant: cpuStatus.variant,
      cpuStatusTitle: cpuStatus.title,
      ramStatusVariant: ramStatus.variant,
      ramStatusTitle: ramStatus.title,
      databaseStatusVariant: databaseStatus.variant,
      databaseStatusTitle: databaseStatus.title,
      databaseNote: `Độ trễ ${currentBandwidth?.latency?.toFixed(0) ?? 0}ms`,
      ramUsedText: formatGb(currentRam?.used ?? 0),
      ramFreeText: formatGb(currentRam?.free ?? 0),
      swapText: currentRam ? `${Math.round(currentRam.swap * 1024)} MB` : "0 MB",
      latencyText: `${currentBandwidth?.latency?.toFixed(0) ?? 0}ms`,
      packetLossText: `${currentBandwidth?.loss?.toFixed(2) ?? "0.00"}%`,
      inboundText: formatBandwidth(currentBandwidth?.inbound ?? 0),
      outboundText: formatBandwidth(currentBandwidth?.outbound ?? 0),
      memoryLeakSignal,
      windowLabel: `${cpuData.length} điểm / 30 giây`,
    };
  }, [snapshot]);
};