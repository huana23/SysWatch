"use client";

import { useEffect, useMemo, useState } from "react";

import { STORAGE_KEYS } from "@/constants/storage-keys";
import {
  advanceSupportSnapshot,
  createInitialSupportSnapshot,
  SUPPORT_UPDATE_INTERVAL_MS,
  toSupportChannelsView,
  toSupportHourlyView,
  toSupportRecentTicketsView,
  toSupportSlaSummaryView,
  toSupportSummaryView,
} from "@/lib/monitoring/support-simulator";
import type {
  SupportChannelItem,
  SupportHourlyPoint,
  SupportRecentTicket,
  SupportSlaSummary,
  SupportSummary,
} from "@/types/support";
import {
  readStorageSnapshot,
  persistStorageSnapshot,
} from "@/lib/storage/storage-snapshot";

const STORAGE_KEY = STORAGE_KEYS.supportDashboard;

type SupportSnapshot = ReturnType<typeof createInitialSupportSnapshot>;

const isMetricState = (
  value: unknown,
): value is { current: number; previous: number } => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const metric = value as { current?: unknown; previous?: unknown };

  return (
    typeof metric.current === "number" &&
    typeof metric.previous === "number"
  );
};

const isSupportSnapshot = (value: unknown): value is SupportSnapshot => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const snapshot = value as SupportSnapshot;

  return (
    typeof snapshot.updatedAt === "number" &&
    isMetricState(snapshot.resolvedTickets) &&
    isMetricState(snapshot.inProgressTickets) &&
    isMetricState(snapshot.overdueTickets) &&
    isMetricState(snapshot.avgWaitHours) &&
    Array.isArray(snapshot.channelShares) &&
    Array.isArray(snapshot.hourlyToday) &&
    Array.isArray(snapshot.hourlyYesterday) &&
    Array.isArray(snapshot.recentTickets)
  );
};

const readSnapshot = (): SupportSnapshot | null => {
  return readStorageSnapshot<SupportSnapshot>(STORAGE_KEY, isSupportSnapshot);
};

const persistSnapshot = (snapshot: SupportSnapshot) => {
  persistStorageSnapshot(STORAGE_KEY, snapshot);
};

type SupportRealtimeView = {
  isReady: boolean;
  summary: SupportSummary;
  channels: SupportChannelItem[];
  hourlyData: SupportHourlyPoint[];
  recentTickets: SupportRecentTicket[];
  slaSummary: SupportSlaSummary;
};

const FALLBACK_VIEW: SupportRealtimeView = {
  isReady: false,
  summary: {
    totalTickets: "--",
    totalTicketsChange: "0%",
    resolvedTickets: "--",
    resolvedTicketsChange: "0%",
    inProgressTickets: "--",
    inProgressTicketsChange: "~0.0h",
    overdueSlaTickets: "--",
    overdueSlaTicketsChange: "0%",
  },
  channels: [],
  hourlyData: [],
  recentTickets: [],
  slaSummary: {
    firstResponseRate: 0,
    resolutionRate: 0,
    criticalBreachCount: 0,
    criticalBreachProgress: 0,
  },
};

export const useSupportRealtime = (): SupportRealtimeView => {
  const [snapshot, setSnapshot] = useState<SupportSnapshot | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = readSnapshot();
    const initial = stored
      ? advanceSupportSnapshot(stored, Date.now())
      : createInitialSupportSnapshot(Date.now());

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
        const base = current ?? createInitialSupportSnapshot(Date.now());
        const next = advanceSupportSnapshot(base, Date.now());
        persistSnapshot(next);
        return next;
      });
    }, SUPPORT_UPDATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isReady]);

  return useMemo(() => {
    if (!snapshot) {
      return FALLBACK_VIEW;
    }

    return {
      isReady: true,
      summary: toSupportSummaryView(snapshot),
      channels: toSupportChannelsView(snapshot),
      hourlyData: toSupportHourlyView(snapshot),
      recentTickets: toSupportRecentTicketsView(snapshot),
      slaSummary: toSupportSlaSummaryView(snapshot),
    };
  }, [snapshot]);
};