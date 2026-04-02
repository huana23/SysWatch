import Groups3Icon from "@mui/icons-material/Groups3";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import PaymentsIcon from "@mui/icons-material/Payments";

import MarketingChannelTable from "@/components/marketing/marketing-channel-table";
import {
  marketingChannelDetails,
  marketingSummary,
} from "@/data/marketing";
import { getChangeType } from "@/lib/change-trend";
import Stats from "@/components/common/stats";

export default function MarketingPage() {
  const statItems = [
    {
      title: "Số lượt tiếp cận",
      value: marketingSummary.reach,
      icon: Groups3Icon ,
      iconWrapClass: "bg-orange-500/10 text-orange-500",
      variant: "trend" as const,
      change: marketingSummary.reachChange,
      changeType: getChangeType(marketingSummary.reachChange),
      changeSuffix: "so với tháng trước",
      changeClassName: "text-emerald-500",
    },
    {
      title: "Số lượt hiển thị",
      value: marketingSummary.impressions,
      icon: VisibilityIcon ,
      iconWrapClass: "bg-orange-500/10 text-orange-500",
      variant: "trend" as const,
      change: marketingSummary.impressionsChange,
      changeType: getChangeType(marketingSummary.impressionsChange),
      changeSuffix: "so với tháng trước",
      changeClassName: "text-emerald-500",
    },
    {
      title: "CTR Trung bình",
      value: marketingSummary.ctr,
      icon: AdsClickIcon ,
      iconWrapClass: "bg-orange-500/10 text-orange-500",
      variant: "trend" as const,
      change: marketingSummary.ctrChange,
      changeType: getChangeType(marketingSummary.ctrChange),
      changeSuffix: "so với tháng trước",
      changeClassName: "text-rose-500",
    },
    {
      title: "Tổng Chi phí",
      value: marketingSummary.totalCost,
      icon: PaymentsIcon,
      iconWrapClass: "bg-orange-500/10 text-orange-500",
      variant: "note" as const,
      note: marketingSummary.remainingBudget,
      noteClassName: "text-muted-foreground",
    },
  ] as const;

  const marketingChannelRows = marketingChannelDetails.map((item) => ({
    platform: item.platform,
    platformDotClassName:
      item.platform === "Facebook Ads" ? "bg-blue-500" : "bg-black",
    reach: item.reach,
    ctr: item.ctr,
    cost: item.cost,
    cpc: item.cpc,
  }));

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full">
        <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
          Báo Cáo Tiếp Thị
        </h1>
        <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
          Phân tích hiệu quả quảng cáo đa kênh theo thời gian thực (30 ngày qua)
        </p>
      </div>

      <Stats items={statItems} />

      <div className="w-full xl:max-w-[1040px] mx-auto">
        <div className="space-y-6">
            <MarketingChannelTable
              title="Chi tiết kênh quảng cáo"
              exportLabel="Xuất báo cáo"
              platformLabel="Nền tảng"
              reachLabel="Reach"
              ctrLabel="CTR"
              costLabel="Chi phí"
              cpcLabel="CPC"
              rows={marketingChannelRows}
            />
          </div>
        </div>
    </div>
  );
}