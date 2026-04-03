"use client";

import { useEffect, useMemo, useState } from "react";

import {
  advanceDashboardSnapshot,
  createInitialDashboardSnapshot,
  formatSyncLabel,
  toDashboardStatsView,
} from "@/lib/monitoring/dashboard-simulator";
import type { DashboardSnapshot, DashboardStatsView } from "@/types/monitoring";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { readStorageSnapshot, persistStorageSnapshot } from "@/lib/storage/storage-snapshot";


const STORAGE_KEY = STORAGE_KEYS.dashboardOverview;
const UPDATE_INTERVAL_MS = 15_000;

const FALLBACK_STATS: DashboardStatsView = {
  users: {
    value: "--",
    change: "0%",
  },
  orders: {
    value: "--",
    change: "0%",
  },
  partners: {
    value: "--",
    change: "0%",
  },
  revenue: {
    value: "--",
    change: "0%",
  },
};

const isDashboardSnapshot = (value: unknown): value is DashboardSnapshot => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const snapshot = value as DashboardSnapshot;

  return (
    typeof snapshot.updatedAt === "number" &&
    typeof snapshot.users === "number" &&
    typeof snapshot.orders === "number" &&
    typeof snapshot.partners === "number" &&
    typeof snapshot.revenue === "number"
  );
};


const readSnapshot = (): DashboardSnapshot | null => {
  return readStorageSnapshot<DashboardSnapshot>(
    STORAGE_KEY,
    isDashboardSnapshot,
  );
};

const persistSnapshot = (snapshot: DashboardSnapshot) => {
  persistStorageSnapshot(STORAGE_KEY, snapshot);
};

export const useDashboardStats = () => {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = readSnapshot();
    const initial = stored
      ? advanceDashboardSnapshot(stored, Date.now())
      : createInitialDashboardSnapshot(Date.now());

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
        const base = current ?? createInitialDashboardSnapshot(Date.now());
        const next = advanceDashboardSnapshot(base, Date.now());
        persistSnapshot(next);
        return next;
      });
    }, UPDATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isReady]);

  const stats = useMemo(
    () => (snapshot ? toDashboardStatsView(snapshot) : FALLBACK_STATS),
    [snapshot],
  );

  const syncedLabel = useMemo(
    () => (snapshot ? formatSyncLabel(snapshot.updatedAt) : "--"),
    [snapshot],
  );

  return {
    isReady,
    stats,
    syncedLabel,
    lastUpdatedAt: snapshot?.updatedAt ?? 0,
  };
};