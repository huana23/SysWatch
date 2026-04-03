"use client";

import { useEffect, useMemo, useState } from "react";

import { STORAGE_KEYS } from "@/constants/storage-keys";
import {
  advancePartnerSnapshot,
  createInitialPartnerSnapshot,
  getPartnerRegionMap,
  PARTNER_UPDATE_INTERVAL_MS,
  toPartnerGrowthFromSnapshot,
  toPartnerRegionView,
  toPartnerRoleView,
  toPartnerSlaView,
  toPartnerSummaryView,
} from "@/lib/monitoring/partner-simulator";
import type {
  GrowthPoint,
  PartnerRegionMap,
  PartnerStatsSummary,
  RegionItem,
  RoleItem,
  SlaItem,
} from "@/types/partners";
import {
  readStorageSnapshot,
  persistStorageSnapshot,
} from "@/lib/storage/storage-snapshot";

const STORAGE_KEY = STORAGE_KEYS.partnerDashboard;

type PartnerSnapshot = ReturnType<typeof createInitialPartnerSnapshot>;

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

const isPartnerSnapshot = (value: unknown): value is PartnerSnapshot => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const snapshot = value as PartnerSnapshot;

  return (
    typeof snapshot.updatedAt === "number" &&
    isMetricState(snapshot.totalPartners) &&
    isMetricState(snapshot.newCustomers) &&
    isMetricState(snapshot.growthRate) &&
    isMetricState(snapshot.avgSla) &&
    Array.isArray(snapshot.growthSeries) &&
    Array.isArray(snapshot.roleShares) &&
    Array.isArray(snapshot.regionShares) &&
    Array.isArray(snapshot.slaRows)
  );
};

const readSnapshot = (): PartnerSnapshot | null => {
  return readStorageSnapshot<PartnerSnapshot>(STORAGE_KEY, isPartnerSnapshot);
};

const persistSnapshot = (snapshot: PartnerSnapshot) => {
  persistStorageSnapshot(STORAGE_KEY, snapshot);
};

type PartnerRealtimeView = {
  isReady: boolean;
  summary: PartnerStatsSummary;
  growthData: GrowthPoint[];
  roleData: RoleItem[];
  regionData: RegionItem[];
  regionMap: PartnerRegionMap;
  slaData: SlaItem[];
};

const FALLBACK_VIEW: PartnerRealtimeView = {
  isReady: false,
  summary: {
    totalPartners: "--",
    totalPartnersChange: "0%",
    newCustomers: "--",
    newCustomersChange: "0%",
    growthRate: "--",
    growthRateChange: "0%",
    avgSla: "--",
    avgSlaChange: "0%",
  },
  growthData: [],
  roleData: [],
  regionData: [],
  regionMap: getPartnerRegionMap(),
  slaData: [],
};

export const usePartnerRealtime = (): PartnerRealtimeView => {
  const [snapshot, setSnapshot] = useState<PartnerSnapshot | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = readSnapshot();
    const initial = stored
      ? advancePartnerSnapshot(stored, Date.now())
      : createInitialPartnerSnapshot(Date.now());

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
        const base = current ?? createInitialPartnerSnapshot(Date.now());
        const next = advancePartnerSnapshot(base, Date.now());
        persistSnapshot(next);
        return next;
      });
    }, PARTNER_UPDATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isReady]);

  return useMemo(() => {
    if (!snapshot) {
      return FALLBACK_VIEW;
    }

    return {
      isReady: true,
      summary: toPartnerSummaryView(snapshot),
      growthData: toPartnerGrowthFromSnapshot(snapshot),
      roleData: toPartnerRoleView(snapshot),
      regionData: toPartnerRegionView(snapshot),
      regionMap: getPartnerRegionMap(),
      slaData: toPartnerSlaView(snapshot),
    };
  }, [snapshot]);
};