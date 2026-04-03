export type DashboardSnapshot = {
  updatedAt: number;
  users: number;
  orders: number;
  partners: number;
  revenue: number;
};

export type DashboardStatView = {
  value: string;
  change: string;
};

export type DashboardStatsView = {
  users: DashboardStatView;
  orders: DashboardStatView;
  partners: DashboardStatView;
  revenue: DashboardStatView;
};

export type HealthStatusVariant = "success" | "warning" | "danger";

export type CpuPoint = {
  timestamp: number;
  time: string;
  current: number;
  average: number;
  value: number;
  usage: number;
};

export type RamPoint = {
  timestamp: number;
  time: string;
  current: number;
  value: number;
  usage: number;
  percent: number;
  used: number;
  free: number;
  total: number;
  swap: number;
};

export type BandwidthPoint = {
  timestamp: number;
  time: string;
  name: string;
  inbound: number;
  outbound: number;
  latency: number;
  loss: number;
  current: number;
  value: number;
  total: number;
};

export type SystemHealthSnapshot = {
  updatedAt: number;
  totalRamGb: number;
  cpu: CpuPoint[];
  ram: RamPoint[];
  bandwidth: BandwidthPoint[];
};