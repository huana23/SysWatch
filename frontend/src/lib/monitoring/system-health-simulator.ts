import type {
  BandwidthPoint,
  CpuPoint,
  RamPoint,
  SystemHealthSnapshot,
} from "@/types/monitoring";

export const UPDATE_INTERVAL_MS = 30_000;
export const DEFAULT_WINDOW_SIZE = 12;
const TOTAL_RAM_GB = 16;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const randomFloat = (min: number, max: number) =>
  min + Math.random() * (max - min);

const roundTo = (value: number, fractionDigits = 1) =>
  Number(value.toFixed(fractionDigits));

const formatPointTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const withCpuAverage = (points: CpuPoint[]): CpuPoint[] => {
  let runningTotal = 0;

  return points.map((point, index) => {
    runningTotal += point.current;

    return {
      ...point,
      average: Math.round(runningTotal / (index + 1)),
    };
  });
};

const buildCpuPoint = (current: number, timestamp: number): CpuPoint => {
  const safeValue = Math.round(clamp(current, 10, 95));

  return {
    timestamp,
    time: formatPointTime(timestamp),
    current: safeValue,
    average: safeValue,
    value: safeValue,
    usage: safeValue,
  };
};

const buildRamPoint = (
  percent: number,
  timestamp: number,
  totalRamGb: number,
  swapGb: number,
): RamPoint => {
  const safePercent = roundTo(clamp(percent, 35, 92), 2);
  const used = roundTo((safePercent / 100) * totalRamGb, 1);
  const free = roundTo(totalRamGb - used, 1);
  const safeSwap = roundTo(clamp(swapGb, 0.3, 1.5), 2);

  return {
    timestamp,
    time: formatPointTime(timestamp),
    current: safePercent,
    value: safePercent,
    usage: safePercent,
    percent: safePercent,
    used,
    free,
    total: totalRamGb,
    swap: safeSwap,
  };
};

const buildBandwidthPoint = (
  inbound: number,
  outbound: number,
  latency: number,
  loss: number,
  timestamp: number,
): BandwidthPoint => {
  const safeInbound = roundTo(clamp(inbound, 450, 1_500));
  const safeOutbound = roundTo(clamp(outbound, 650, 2_000));
  const safeLatency = roundTo(clamp(latency, 10, 180));
  const safeLoss = roundTo(clamp(loss, 0, 1), 2);
  const averageFlow = roundTo((safeInbound + safeOutbound) / 2);
  const label = formatPointTime(timestamp);

  return {
    timestamp,
    time: label,
    name: label,
    inbound: safeInbound,
    outbound: safeOutbound,
    latency: safeLatency,
    loss: safeLoss,
    current: averageFlow,
    value: averageFlow,
    total: roundTo(safeInbound + safeOutbound),
  };
};

const nextCpuValue = (prev: number) => clamp(prev + randomFloat(-4, 4), 10, 95);
const nextRamPercent = (prev: number) => clamp(prev + randomFloat(-0.6, 1.15), 35, 92);
const nextSwapValue = (prev: number) => clamp(prev + randomFloat(-0.05, 0.08), 0.3, 1.5);
const nextInboundValue = (prev: number) => clamp(prev + randomFloat(-28, 28), 450, 1_500);
const nextOutboundValue = (prev: number) => clamp(prev + randomFloat(-34, 34), 650, 2_000);
const nextLatencyValue = (prev: number) => clamp(prev + randomFloat(-2.5, 2.5), 10, 180);
const nextLossValue = (prev: number) => clamp(prev + randomFloat(-0.01, 0.015), 0, 1);

export const createInitialSystemHealthSnapshot = (
  windowSize = DEFAULT_WINDOW_SIZE,
  now = Date.now(),
): SystemHealthSnapshot => {
  const safeWindowSize = Math.max(6, windowSize);
  const startTime = now - (safeWindowSize - 1) * UPDATE_INTERVAL_MS;

  let cpu = randomFloat(34, 52);
  let ramPercent = randomFloat(62, 72);
  let inbound = randomFloat(760, 900);
  let outbound = randomFloat(1_050, 1_260);
  let latency = randomFloat(18, 28);
  let loss = randomFloat(0.01, 0.08);
  let swap = randomFloat(0.45, 0.75);

  const cpuPoints: CpuPoint[] = [];
  const ramPoints: RamPoint[] = [];
  const bandwidthPoints: BandwidthPoint[] = [];

  for (let index = 0; index < safeWindowSize; index += 1) {
    if (index > 0) {
      cpu = nextCpuValue(cpu);
      ramPercent = nextRamPercent(ramPercent);
      inbound = nextInboundValue(inbound);
      outbound = nextOutboundValue(outbound);
      latency = nextLatencyValue(latency);
      loss = nextLossValue(loss);
      swap = nextSwapValue(swap);
    }

    const timestamp = startTime + index * UPDATE_INTERVAL_MS;

    cpuPoints.push(buildCpuPoint(cpu, timestamp));
    ramPoints.push(buildRamPoint(ramPercent, timestamp, TOTAL_RAM_GB, swap));
    bandwidthPoints.push(
      buildBandwidthPoint(inbound, outbound, latency, loss, timestamp),
    );
  }

  return {
    updatedAt: cpuPoints[cpuPoints.length - 1]?.timestamp ?? now,
    totalRamGb: TOTAL_RAM_GB,
    cpu: withCpuAverage(cpuPoints),
    ram: ramPoints,
    bandwidth: bandwidthPoints,
  };
};

const advanceOneTick = (
  snapshot: SystemHealthSnapshot,
  timestamp: number,
): SystemHealthSnapshot => {
  const previousCpu = snapshot.cpu[snapshot.cpu.length - 1]?.current ?? 45;
  const previousRam = snapshot.ram[snapshot.ram.length - 1]?.percent ?? 68;
  const previousInbound = snapshot.bandwidth[snapshot.bandwidth.length - 1]?.inbound ?? 840;
  const previousOutbound = snapshot.bandwidth[snapshot.bandwidth.length - 1]?.outbound ?? 1_180;
  const previousLatency = snapshot.bandwidth[snapshot.bandwidth.length - 1]?.latency ?? 24;
  const previousLoss = snapshot.bandwidth[snapshot.bandwidth.length - 1]?.loss ?? 0.03;
  const previousSwap = snapshot.ram[snapshot.ram.length - 1]?.swap ?? 0.6;

  const cpuPoint = buildCpuPoint(nextCpuValue(previousCpu), timestamp);
  const ramPoint = buildRamPoint(
    nextRamPercent(previousRam),
    timestamp,
    snapshot.totalRamGb,
    nextSwapValue(previousSwap),
  );
  const bandwidthPoint = buildBandwidthPoint(
    nextInboundValue(previousInbound),
    nextOutboundValue(previousOutbound),
    nextLatencyValue(previousLatency),
    nextLossValue(previousLoss),
    timestamp,
  );

  const nextCpu = withCpuAverage(
    [...snapshot.cpu, cpuPoint].slice(-DEFAULT_WINDOW_SIZE),
  );
  const nextRam = [...snapshot.ram, ramPoint].slice(-DEFAULT_WINDOW_SIZE);
  const nextBandwidth = [...snapshot.bandwidth, bandwidthPoint].slice(
    -DEFAULT_WINDOW_SIZE,
  );

  return {
    ...snapshot,
    updatedAt: timestamp,
    cpu: nextCpu,
    ram: nextRam,
    bandwidth: nextBandwidth,
  };
};

export const advanceSystemHealthSnapshot = (
  snapshot: SystemHealthSnapshot,
  now = Date.now(),
): SystemHealthSnapshot => {
  if (now <= snapshot.updatedAt) {
    return snapshot;
  }

  const elapsedMs = now - snapshot.updatedAt;
  const ticks = Math.floor(elapsedMs / UPDATE_INTERVAL_MS);

  if (ticks <= 0) {
    return snapshot;
  }

  let nextSnapshot = snapshot;

  for (let index = 0; index < ticks; index += 1) {
    nextSnapshot = advanceOneTick(
      nextSnapshot,
      nextSnapshot.updatedAt + UPDATE_INTERVAL_MS,
    );
  }

  return nextSnapshot;
};