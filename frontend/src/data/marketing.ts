import type {
  MarketingChannelDetail,
  MarketingSummary,
} from "@/types/marketing";

export const marketingSummary: MarketingSummary = {
  reach: "1.284.500",
  reachChange: "+12.5%",
  impressions: "3.520.000",
  impressionsChange: "+8.2%",
  ctr: "2.45%",
  ctrChange: "-0.4%",
  totalCost: "45.200.000đ",
  remainingBudget: "Ngân sách còn lại: 15.000.000đ",
};

export const marketingChannelDetails: MarketingChannelDetail[] = [
  {
    platform: "Facebook Ads",
    reach: "750,000",
    ctr: "1.8%",
    cost: "28,500,000đ",
    cpc: "2,100đ",
  },
  {
    platform: "TikTok Ads",
    reach: "534,500",
    ctr: "3.2%",
    cost: "16,700,000đ",
    cpc: "980đ",
  },
];