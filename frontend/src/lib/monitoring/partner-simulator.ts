import {
  growthData as growthSeed,
  partnerStatsSummary as summarySeed,
  regionData as regionSeed,
  regionMap,
  roleData as roleSeed,
  slaData as slaSeed,
} from "@/data/partners";
import type {
  GrowthPoint,
  PartnerRegionMap,
  PartnerStatsSummary,
  RegionItem,
  RoleItem,
  SlaItem,
} from "@/types/partners";

export const PARTNER_UPDATE_INTERVAL_MS = 30_000;

type MetricState = {
  current: number;
  previous: number;
};

type PartnerSlaRowSnapshot = {
  code: string;
  name: string;
  sla: number;
  avgTimeHours: number;
  badgeClassName: string;
};

type PartnerSnapshot = {
  updatedAt: number;
  totalPartners: MetricState;
  newCustomers: MetricState;
  growthRate: MetricState;
  avgSla: MetricState;
  growthSeries: number[];
  roleShares: number[];
  regionShares: number[];
  slaRows: PartnerSlaRowSnapshot[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const roundTo = (value: number, digits = 1) =>
  Number(value.toFixed(digits));

const randomFloat = (min: number, max: number) =>
  min + Math.random() * (max - min);

const randomInt = (min: number, max: number) =>
  Math.floor(randomFloat(min, max + 1));

const parseCount = (value: string) =>
  Number.parseInt(value.replace(/[^\d]/g, ""), 10) || 0;

const parsePercent = (value: string) =>
  Number.parseFloat(value.replace("%", "").replace(",", ".")) || 0;

const parseHours = (value: string) =>
  Number.parseFloat(value.replace("h", "").replace(",", ".")) || 0;

const formatCount = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(value));

const formatPercentValue = (value: number, digits = 1) => `${value.toFixed(digits)}%`;

const formatSignedPercent = (current: number, previous: number, digits = 1) => {
  const base = Math.max(Math.abs(previous), 1);
  const change = ((current - previous) / base) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(digits)}%`;
};

const formatHours = (value: number) => `${value.toFixed(1)}h`;

const getSlaStatus = (sla: number): SlaItem["status"] => {
  if (sla >= 97) return "good";
  if (sla >= 92) return "warning";
  return "danger";
};

const getBadgeClassName = (code: string, status: SlaItem["status"]) => {
  const paletteByCode: Record<string, string> = {
    JT: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    GH: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    NT: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    VN: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  };

  if (paletteByCode[code]) {
    return paletteByCode[code];
  }

  if (status === "good") {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
  }

  if (status === "warning") {
    return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  }

  return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
};

const normalizeToHundred = (values: number[]) => {
  const total = values.reduce((sum, value) => sum + value, 0);
  const scaled = values.map((value) => (value / total) * 100);
  const rounded = scaled.map((value) => Math.floor(value));
  let remainder = 100 - rounded.reduce((sum, value) => sum + value, 0);

  const ranked = scaled
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);

  let cursor = 0;

  while (remainder > 0 && ranked.length > 0) {
    rounded[ranked[cursor % ranked.length].index] += 1;
    remainder -= 1;
    cursor += 1;
  }

  return rounded;
};

const nudgeShares = (current: number[], maxStep: number) => {
  const nudged = current.map((value) => clamp(value + randomFloat(-maxStep, maxStep), 3, 90));
  return normalizeToHundred(nudged);
};

const evolveMetric = (
  metric: MetricState,
  deltaMin: number,
  deltaMax: number,
  minValue: number,
  maxValue: number,
  digits = 0,
): MetricState => {
  const nextValue = clamp(metric.current + randomFloat(deltaMin, deltaMax), minValue, maxValue);

  return {
    previous: metric.current,
    current: digits === 0 ? Math.round(nextValue) : roundTo(nextValue, digits),
  };
};

const buildInitialSnapshot = (now = Date.now()): PartnerSnapshot => {
  return {
    updatedAt: now,
    totalPartners: {
      current: parseCount(summarySeed.totalPartners),
      previous: parseCount(summarySeed.totalPartners),
    },
    newCustomers: {
      current: parseCount(summarySeed.newCustomers),
      previous: parseCount(summarySeed.newCustomers),
    },
    growthRate: {
      current: parsePercent(summarySeed.growthRate),
      previous: parsePercent(summarySeed.growthRate),
    },
    avgSla: {
      current: parsePercent(summarySeed.avgSla),
      previous: parsePercent(summarySeed.avgSla),
    },
    growthSeries: growthSeed.map((item) => item.value),
    roleShares: roleSeed.map((item) => item.value),
    regionShares: regionSeed.map((item) => item.value),
    slaRows: slaSeed.map((item) => ({
      code: item.code,
      name: item.name,
      sla: parsePercent(item.sla),
      avgTimeHours: parseHours(item.avgTime),
      badgeClassName: item.badgeClassName,
    })),
  };
};

const evolveGrowthSeries = (series: number[]) => {
  const next = [...series];
  const lastIndex = next.length - 1;
  const prevIndex = Math.max(0, lastIndex - 1);

  next[prevIndex] = Math.max(120, Math.round(next[prevIndex] + randomFloat(-4, 4)));
  next[lastIndex] = Math.max(next[prevIndex] - 10, Math.round(next[lastIndex] + randomFloat(-6, 10)));

  return next;
};

const evolveSlaRows = (rows: PartnerSlaRowSnapshot[]): PartnerSlaRowSnapshot[] =>
  rows.map((row) => {
    const slaStep =
      row.code === "VN" ? randomFloat(-0.45, 0.18) : row.code === "NT" ? randomFloat(-0.3, 0.2) : randomFloat(-0.18, 0.12);

    const timeStep =
      row.code === "VN" ? randomFloat(-0.12, 0.22) : row.code === "NT" ? randomFloat(-0.1, 0.16) : randomFloat(-0.08, 0.1);

    return {
      ...row,
      sla: roundTo(clamp(row.sla + slaStep, 86, 99.7), 1),
      avgTimeHours: roundTo(clamp(row.avgTimeHours + timeStep, 0.8, 4.8), 1),
    };
  });

const advanceOneTick = (snapshot: PartnerSnapshot, timestamp: number): PartnerSnapshot => {
  const nextTotalPartners = evolveMetric(snapshot.totalPartners, 1, 6, 900, 4000, 0);
  const nextNewCustomers = evolveMetric(snapshot.newCustomers, -4, 9, 180, 1200, 0);
  const nextGrowthRate = evolveMetric(snapshot.growthRate, -0.25, 0.35, -3, 28, 1);
  const nextAvgSla = evolveMetric(snapshot.avgSla, -0.12, 0.08, 88, 99.8, 1);

  return {
    updatedAt: timestamp,
    totalPartners: nextTotalPartners,
    newCustomers: nextNewCustomers,
    growthRate: nextGrowthRate,
    avgSla: nextAvgSla,
    growthSeries: evolveGrowthSeries(snapshot.growthSeries),
    roleShares: nudgeShares(snapshot.roleShares, 1.2),
    regionShares: nudgeShares(snapshot.regionShares, 1.0),
    slaRows: evolveSlaRows(snapshot.slaRows),
  };
};

export const createInitialPartnerSnapshot = (now = Date.now()) =>
  buildInitialSnapshot(now);

export const advancePartnerSnapshot = (
  snapshot: PartnerSnapshot,
  now = Date.now(),
): PartnerSnapshot => {
  if (now <= snapshot.updatedAt) {
    return snapshot;
  }

  const elapsedMs = now - snapshot.updatedAt;
  const ticks = Math.floor(elapsedMs / PARTNER_UPDATE_INTERVAL_MS);

  if (ticks <= 0) {
    return snapshot;
  }

  let nextSnapshot = snapshot;

  for (let index = 0; index < ticks; index += 1) {
    nextSnapshot = advanceOneTick(
      nextSnapshot,
      nextSnapshot.updatedAt + PARTNER_UPDATE_INTERVAL_MS,
    );
  }

  return nextSnapshot;
};

export const toPartnerSummaryView = (
  snapshot: PartnerSnapshot,
): PartnerStatsSummary => {
  return {
    totalPartners: formatCount(snapshot.totalPartners.current),
    totalPartnersChange: formatSignedPercent(
      snapshot.totalPartners.current,
      snapshot.totalPartners.previous,
    ),
    newCustomers: formatCount(snapshot.newCustomers.current),
    newCustomersChange: formatSignedPercent(
      snapshot.newCustomers.current,
      snapshot.newCustomers.previous,
    ),
    growthRate: formatPercentValue(snapshot.growthRate.current),
    growthRateChange: formatSignedPercent(
      snapshot.growthRate.current,
      snapshot.growthRate.previous,
    ),
    avgSla: formatPercentValue(snapshot.avgSla.current),
    avgSlaChange: formatSignedPercent(
      snapshot.avgSla.current,
      snapshot.avgSla.previous,
    ),
  };
};


export const toPartnerGrowthFromSnapshot = (
  snapshot: PartnerSnapshot,
): GrowthPoint[] =>
  growthSeed.map((item, index) => ({
    month: item.month,
    value: snapshot.growthSeries[index] ?? item.value,
  }));

export const toPartnerRoleView = (snapshot: PartnerSnapshot): RoleItem[] =>
  roleSeed.map((item, index) => ({
    ...item,
    value: snapshot.roleShares[index] ?? item.value,
  }));

export const toPartnerRegionView = (snapshot: PartnerSnapshot): RegionItem[] =>
  regionSeed.map((item, index) => ({
    ...item,
    value: snapshot.regionShares[index] ?? item.value,
  }));

export const toPartnerSlaView = (snapshot: PartnerSnapshot): SlaItem[] =>
  snapshot.slaRows.map((row) => {
    const status = getSlaStatus(row.sla);

    return {
      code: row.code,
      name: row.name,
      sla: formatPercentValue(row.sla),
      avgTime: formatHours(row.avgTimeHours),
      status,
      badgeClassName: getBadgeClassName(row.code, status),
    };
  });

export const getPartnerRegionMap = (): PartnerRegionMap => regionMap;