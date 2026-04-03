import type {
  DashboardSnapshot,
  DashboardStatsView,
} from "@/types/monitoring";

const ONE_HOUR_MS = 60 * 60 * 1000;

const formatCount = (value: number) => new Intl.NumberFormat("vi-VN").format(value);

const formatRevenue = (value: number) => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B ₫`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M ₫`;
  }

  return `${new Intl.NumberFormat("vi-VN").format(value)} ₫`;
};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

type GrowthConfig = {
  ratePerHour: number;
  minStep: number;
  waveAmplitude: number;
  phase: number;
};

const growthConfig: Record<keyof Omit<DashboardSnapshot, "updatedAt">, GrowthConfig> = {
  users: {
    ratePerHour: 0.012,
    minStep: 2,
    waveAmplitude: 0.0007,
    phase: 0.4,
  },
  orders: {
    ratePerHour: 0.024,
    minStep: 1,
    waveAmplitude: 0.0012,
    phase: 1.2,
  },
  partners: {
    ratePerHour: 0.008,
    minStep: 1,
    waveAmplitude: 0.0005,
    phase: 2.1,
  },
  revenue: {
    ratePerHour: 0.031,
    minStep: 12_000,
    waveAmplitude: 0.0014,
    phase: 2.8,
  },
};

const displayChange: Record<keyof Omit<DashboardSnapshot, "updatedAt">, string> = {
  users: "+1.2%",
  orders: "+2.4%",
  partners: "+0.8%",
  revenue: "+3.1%",
};

const evolveMetric = (
  currentValue: number,
  config: GrowthConfig,
  elapsedMs: number,
  now: number,
) => {
  if (elapsedMs <= 0) {
    return currentValue;
  }

  const elapsedHours = elapsedMs / ONE_HOUR_MS;
  const wave = Math.sin(now / 600_000 + config.phase) * config.waveAmplitude;
  const growthFactor = Math.max(0.0002, config.ratePerHour * elapsedHours + wave);
  const delta = Math.max(config.minStep, Math.round(currentValue * growthFactor));

  return currentValue + delta;
};

export const createInitialDashboardSnapshot = (now = Date.now()): DashboardSnapshot => {
  return {
    updatedAt: now,
    users: 12_840 + randomInt(-180, 220),
    orders: 3_260 + randomInt(-80, 90),
    partners: 468 + randomInt(-12, 16),
    revenue: 126_000_000 + randomInt(-2_000_000, 2_000_000),
  };
};

export const advanceDashboardSnapshot = (
  previous: DashboardSnapshot,
  now = Date.now(),
): DashboardSnapshot => {
  if (now <= previous.updatedAt) {
    return previous;
  }

  const elapsedMs = now - previous.updatedAt;

  return {
    updatedAt: now,
    users: evolveMetric(previous.users, growthConfig.users, elapsedMs, now),
    orders: evolveMetric(previous.orders, growthConfig.orders, elapsedMs, now),
    partners: evolveMetric(previous.partners, growthConfig.partners, elapsedMs, now),
    revenue: evolveMetric(previous.revenue, growthConfig.revenue, elapsedMs, now),
  };
};

export const toDashboardStatsView = (
  snapshot: DashboardSnapshot,
): DashboardStatsView => {
  return {
    users: {
      value: formatCount(snapshot.users),
      change: displayChange.users,
    },
    orders: {
      value: formatCount(snapshot.orders),
      change: displayChange.orders,
    },
    partners: {
      value: formatCount(snapshot.partners),
      change: displayChange.partners,
    },
    revenue: {
      value: formatRevenue(snapshot.revenue),
      change: displayChange.revenue,
    },
  };
};

export const formatSyncLabel = (updatedAt: number) => {
  const diffMs = Math.max(0, Date.now() - updatedAt);
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 5) {
    return "vừa xong";
  }

  if (diffSeconds < 60) {
    return `${diffSeconds} giây trước`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffMinutes < 60) {
    return `${diffMinutes} phút trước`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} giờ trước`;
};