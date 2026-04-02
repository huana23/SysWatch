
export type DashboardStatMetric = {
  value: string;
  change: string;
};

export type DashboardAlertType = "danger" | "warning" | "info";

export type DashboardAlertItem = {
  message: string;
  time: string;
  type: DashboardAlertType;
};

export type DashboardActivityItem = {
  title: string;
  description: string;
  time: string;
  isActive: boolean;
};

export type DashboardModuleMetric = {
  value: number;
  status: string;
};

export type DashboardOverviewStats = {
  users: DashboardStatMetric;
  orders: DashboardStatMetric;
  partners: DashboardStatMetric;
  revenue: DashboardStatMetric;
};

export type DashboardModuleMetrics = {
  systemHealth: DashboardModuleMetric;
  partners: DashboardModuleMetric;
  customerSupport: DashboardModuleMetric;
  marketing: DashboardModuleMetric;
  accessControl: DashboardModuleMetric;
};

export type ActivityTimelineItemProps = {
  item: DashboardActivityItem;
  isLast: boolean;
};