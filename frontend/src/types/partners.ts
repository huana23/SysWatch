export type PartnerStatsSummary = {
  totalPartners: string;
  totalPartnersChange: string;
  newCustomers: string;
  newCustomersChange: string;
  growthRate: string;
  growthRateChange: string;
  avgSla: string;
  avgSlaChange: string;
};

export type GrowthPoint = {
  month: string;
  value: number;
};

export type RoleItem = {
  name: string;
  value: number;
  color: string;
};

export type RegionItem = {
  name: string;
  value: number;
};

export type SlaItem = {
  code: string;
  name: string;
  sla: string;
  avgTime: string;
  status: "good" | "warning" | "danger";
  badgeClassName: string;
};

export type PartnerRegionMap = {
  address: string;
  latitude: number;
  longitude: number;
  zoom: number;
};