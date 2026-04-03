import type {
  GrowthPoint,
  PartnerRegionMap,
  PartnerStatsSummary,
  RegionItem,
  RoleItem,
  SlaItem,
} from "@/types/partners";

export const partnerStatsSummary: PartnerStatsSummary = {
  totalPartners: "1,250",
  totalPartnersChange: "+5.2%",
  newCustomers: "458",
  newCustomersChange: "+10.1%",
  growthRate: "+12.5%",
  growthRateChange: "+2.4%",
  avgSla: "98.5%",
  avgSlaChange: "-0.5%",
};

export const growthData: GrowthPoint[] = [
  { month: "THÁNG 1", value: 180 },
  { month: "THÁNG 2", value: 195 },
  { month: "THÁNG 3", value: 190 },
  { month: "THÁNG 4", value: 255 },
  { month: "THÁNG 5", value: 230 },
  { month: "THÁNG 6", value: 275 },
];

export const roleData: RoleItem[] = [
  { name: "Người bán (Sellers)", value: 40, color: "#2F80ED" },
  { name: "Vận chuyển (Logistics)", value: 35, color: "#8B5CF6" },
  { name: "Kho bãi & Khác", value: 25, color: "#F59E0B" },
];

export const regionData: RegionItem[] = [
  { name: "Hà Nội (Miền Bắc)", value: 42 },
  { name: "TP. Hồ Chí Minh (Miền Nam)", value: 38 },
  { name: "Đà Nẵng (Miền Trung)", value: 15 },
  { name: "Các khu vực khác", value: 5 },
];

export const regionMap: PartnerRegionMap = {
  address: "55 Nguyễn Văn Linh, Hải Châu, Đà Nẵng, Việt Nam",
  latitude: 16.0607065,
  longitude: 108.2157017,
  zoom: 15,
};

export const slaData: SlaItem[] = [
  {
    code: "JT",
    name: "J&T Express",
    sla: "99.2%",
    avgTime: "1.4h",
    status: "good",
    badgeClassName:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  },
  {
    code: "GH",
    name: "Giao Hàng Nhanh",
    sla: "98.5%",
    avgTime: "1.8h",
    status: "good",
    badgeClassName:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    code: "NT",
    name: "Nhất Tín Log.",
    sla: "94.2%",
    avgTime: "2.5h",
    status: "warning",
    badgeClassName:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    code: "VN",
    name: "Vietnam Post",
    sla: "89.1%",
    avgTime: "3.2h",
    status: "danger",
    badgeClassName:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  },
];