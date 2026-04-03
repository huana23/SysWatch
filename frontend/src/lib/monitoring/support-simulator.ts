import {
  supportChannels as supportChannelsSeed,
  supportHourlyData as supportHourlySeed,
  supportRecentTickets as supportRecentSeed,
  supportSummary as supportSummarySeed,
} from "@/data/support";
import type {
  SupportChannelItem,
  SupportHourlyPoint,
  SupportRecentTicket,
  SupportSlaSummary,
  SupportSummary,
  SupportTicketStatus,
} from "@/types/support";

export const SUPPORT_UPDATE_INTERVAL_MS = 30_000;

type MetricState = {
  current: number;
  previous: number;
};

type SupportSnapshot = {
  updatedAt: number;
  resolvedTickets: MetricState;
  inProgressTickets: MetricState;
  overdueTickets: MetricState;
  avgWaitHours: MetricState;
  channelShares: number[];
  hourlyToday: number[];
  hourlyYesterday: number[];
  recentTickets: SupportRecentTicket[];
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

const parseHours = (value: string) =>
  Number.parseFloat(value.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;

const formatCount = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(value));

const formatSignedPercent = (current: number, previous: number, digits = 1) => {
  const base = Math.max(Math.abs(previous), 1);
  const change = ((current - previous) / base) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(digits)}%`;
};

const formatRemainingMinutes = (minutes: number) => `${Math.max(5, minutes)}m còn lại`;
const formatLateHours = (hours: number) => `Trễ ${Math.max(1, hours)}h`;

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

const nudgeShares = (values: number[], maxStep: number) => {
  const nudged = values.map((value) => clamp(value + randomFloat(-maxStep, maxStep), 5, 90));
  return normalizeToHundred(nudged);
};

const totalTicketsOf = (snapshot: Pick<SupportSnapshot, "resolvedTickets" | "inProgressTickets" | "overdueTickets">) =>
  snapshot.resolvedTickets.current +
  snapshot.inProgressTickets.current +
  snapshot.overdueTickets.current;

const previousTotalTicketsOf = (
  snapshot: Pick<SupportSnapshot, "resolvedTickets" | "inProgressTickets" | "overdueTickets">,
) =>
  snapshot.resolvedTickets.previous +
  snapshot.inProgressTickets.previous +
  snapshot.overdueTickets.previous;

const buildInitialSnapshot = (now = Date.now()): SupportSnapshot => {
  return {
    updatedAt: now,
    resolvedTickets: {
      current: parseCount(supportSummarySeed.resolvedTickets),
      previous: parseCount(supportSummarySeed.resolvedTickets),
    },
    inProgressTickets: {
      current: parseCount(supportSummarySeed.inProgressTickets),
      previous: parseCount(supportSummarySeed.inProgressTickets),
    },
    overdueTickets: {
      current: parseCount(supportSummarySeed.overdueSlaTickets),
      previous: parseCount(supportSummarySeed.overdueSlaTickets),
    },
    avgWaitHours: {
      current: parseHours(supportSummarySeed.inProgressTicketsChange),
      previous: parseHours(supportSummarySeed.inProgressTicketsChange),
    },
    channelShares: supportChannelsSeed.map((item) => item.percentage),
    hourlyToday: supportHourlySeed.map((item) => item.today),
    hourlyYesterday: supportHourlySeed.map((item) => item.yesterday),
    recentTickets: supportRecentSeed,
  };
};

const evolveRecentTicket = (ticket: SupportRecentTicket): SupportRecentTicket => {
  const nextChance = Math.random();

  let nextStatus: SupportTicketStatus = ticket.status;

  if (ticket.status === "in_progress") {
    nextStatus =
      nextChance < 0.18 ? "resolved" : nextChance < 0.33 ? "overdue" : "in_progress";
  } else if (ticket.status === "overdue") {
    nextStatus =
      nextChance < 0.16 ? "resolved" : nextChance < 0.42 ? "in_progress" : "overdue";
  } else {
    nextStatus = nextChance < 0.18 ? "in_progress" : "resolved";
  }

  let nextSla = ticket.sla;

  if (nextStatus === "resolved") {
    nextSla = "---";
  } else if (nextStatus === "in_progress") {
    nextSla = formatRemainingMinutes(randomInt(10, 45));
  } else {
    nextSla = formatLateHours(randomInt(1, 4));
  }

  return {
    ...ticket,
    status: nextStatus,
    sla: nextSla,
  };
};

const evolveHourlySeries = (values: number[], maxStep: number) =>
  values.map((value, index) => {
    const bias = index >= 2 && index <= 5 ? 1.5 : 0;
    return clamp(Math.round(value + randomFloat(-maxStep, maxStep) + bias), 6, 60);
  });

const advanceOneTick = (snapshot: SupportSnapshot, timestamp: number): SupportSnapshot => {
  const nextResolved = clamp(snapshot.resolvedTickets.current + randomInt(-8, 14), 700, 1500);
  const nextInProgress = clamp(snapshot.inProgressTickets.current + randomInt(-7, 10), 180, 520);
  const nextOverdue = clamp(snapshot.overdueTickets.current + randomInt(-4, 5), 40, 220);

  const nextAvgWait = clamp(
    roundTo(snapshot.avgWaitHours.current + randomFloat(-0.15, 0.18), 2),
    2.2,
    7.5,
  );

  return {
    updatedAt: timestamp,
    resolvedTickets: {
      previous: snapshot.resolvedTickets.current,
      current: nextResolved,
    },
    inProgressTickets: {
      previous: snapshot.inProgressTickets.current,
      current: nextInProgress,
    },
    overdueTickets: {
      previous: snapshot.overdueTickets.current,
      current: nextOverdue,
    },
    avgWaitHours: {
      previous: snapshot.avgWaitHours.current,
      current: nextAvgWait,
    },
    channelShares: nudgeShares(snapshot.channelShares, 1.2),
    hourlyToday: evolveHourlySeries(snapshot.hourlyToday, 3.2),
    hourlyYesterday: evolveHourlySeries(snapshot.hourlyYesterday, 1.8),
    recentTickets: snapshot.recentTickets.map(evolveRecentTicket),
  };
};

export const createInitialSupportSnapshot = (now = Date.now()) =>
  buildInitialSnapshot(now);

export const advanceSupportSnapshot = (
  snapshot: SupportSnapshot,
  now = Date.now(),
): SupportSnapshot => {
  if (now <= snapshot.updatedAt) {
    return snapshot;
  }

  const elapsedMs = now - snapshot.updatedAt;
  const ticks = Math.floor(elapsedMs / SUPPORT_UPDATE_INTERVAL_MS);

  if (ticks <= 0) {
    return snapshot;
  }

  let nextSnapshot = snapshot;

  for (let index = 0; index < ticks; index += 1) {
    nextSnapshot = advanceOneTick(
      nextSnapshot,
      nextSnapshot.updatedAt + SUPPORT_UPDATE_INTERVAL_MS,
    );
  }

  return nextSnapshot;
};

export const toSupportSummaryView = (snapshot: SupportSnapshot): SupportSummary => {
  const totalCurrent = totalTicketsOf(snapshot);
  const totalPrevious = previousTotalTicketsOf(snapshot);

  return {
    totalTickets: formatCount(totalCurrent),
    totalTicketsChange: formatSignedPercent(totalCurrent, totalPrevious),
    resolvedTickets: formatCount(snapshot.resolvedTickets.current),
    resolvedTicketsChange: formatSignedPercent(
      snapshot.resolvedTickets.current,
      snapshot.resolvedTickets.previous,
    ),
    inProgressTickets: formatCount(snapshot.inProgressTickets.current),
    inProgressTicketsChange: `~${snapshot.avgWaitHours.current.toFixed(1)}h`,
    overdueSlaTickets: formatCount(snapshot.overdueTickets.current),
    overdueSlaTicketsChange: formatSignedPercent(
      snapshot.overdueTickets.current,
      snapshot.overdueTickets.previous,
    ),
  };
};

export const toSupportChannelsView = (
  snapshot: SupportSnapshot,
): SupportChannelItem[] => {
  const totalTickets = totalTicketsOf(snapshot);

  return supportChannelsSeed.map((item, index) => {
    const percentage = snapshot.channelShares[index] ?? item.percentage;
    const count = Math.round((percentage / 100) * totalTickets);

    return {
      key: item.key,
      count,
      percentage,
    };
  });
};

export const toSupportHourlyView = (
  snapshot: SupportSnapshot,
): SupportHourlyPoint[] =>
  supportHourlySeed.map((item, index) => ({
    hour: item.hour,
    today: snapshot.hourlyToday[index] ?? item.today,
    yesterday: snapshot.hourlyYesterday[index] ?? item.yesterday,
  }));

export const toSupportRecentTicketsView = (
  snapshot: SupportSnapshot,
): SupportRecentTicket[] => snapshot.recentTickets;

export const toSupportSlaSummaryView = (
  snapshot: SupportSnapshot,
): SupportSlaSummary => {
  const total = Math.max(totalTicketsOf(snapshot), 1);
  const overdueRate = (snapshot.overdueTickets.current / total) * 100;
  const resolutionRate = clamp(
    roundTo((snapshot.resolvedTickets.current / total) * 100 + randomFloat(-1.2, 1.2), 0),
    70,
    98,
  );
  const firstResponseRate = clamp(
    roundTo(
      97 - overdueRate * 1.2 - snapshot.avgWaitHours.current * 0.8 + randomFloat(-1.2, 1.2),
      0,
    ),
    74,
    99,
  );
  const criticalBreachCount = clamp(
    Math.round(snapshot.overdueTickets.current * 0.12 + randomFloat(-2, 3)),
    1,
    40,
  );

  return {
    firstResponseRate,
    resolutionRate,
    criticalBreachCount,
    criticalBreachProgress: clamp(Math.round((criticalBreachCount / 40) * 100), 6, 100),
  };
};