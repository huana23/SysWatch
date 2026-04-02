import { Handshake, ShieldCheck, UserPlus } from "lucide-react";
import { MdOutlineQueryStats } from "react-icons/md";

import PartnerGrowthChart from "@/components/partners/partner-growth-chart";
import PartnerRegionCard from "@/components/partners/partner-region-card";
import PartnerRoleChart from "@/components/partners/partner-role-chart";
import PartnerSlaTable from "@/components/partners/partner-sla-table";
import PartnerStats from "@/components/partners/partner-stats";
import {
  growthData,
  partnerStatsSummary,
  regionData,
  regionMap,
  roleData,
  slaData,
} from "@/data/partners";

export default function PartnerPage() {
  const partnerStatItems = [
    {
      title: "Tổng Đối tác",
      value: partnerStatsSummary.totalPartners,
      change: partnerStatsSummary.totalPartnersChange,
      icon: Handshake,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
    {
      title: "Khách hàng mới",
      value: partnerStatsSummary.newCustomers,
      change: partnerStatsSummary.newCustomersChange,
      icon: UserPlus,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
    {
      title: "Tỷ lệ tăng trưởng",
      value: partnerStatsSummary.growthRate,
      change: partnerStatsSummary.growthRateChange,
      icon: MdOutlineQueryStats,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
    {
      title: "SLA trung bình",
      value: partnerStatsSummary.avgSla,
      change: partnerStatsSummary.avgSlaChange,
      icon: ShieldCheck,
      iconWrapClass: "bg-sky-500/10 text-sky-500",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full">
        <h1 className="m-0 text-[24px] font-black leading-[30px] tracking-[-0.5px] text-foreground sm:text-[28px] sm:leading-[34px] lg:text-[30px] lg:leading-9">
          Đối Tác & Khách Hàng
        </h1>
        <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground sm:text-[15px] lg:text-base">
          Theo dõi chỉ số và hiệu suất của đối tác và khách hàng trên toàn quốc
        </p>
      </div>

      <PartnerStats items={partnerStatItems} />

      <section className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="min-w-0">
          <PartnerGrowthChart
            title="Xu hướng tăng trưởng người dùng"
            filterLabel="6 tháng qua"
            data={growthData}
          />
        </div>

        <div className="min-w-0">
          <PartnerRoleChart
            title="Phân loại theo vai trò"
            totalLabel="1.25k"
            totalCaption="Tổng cộng"
            data={roleData}
          />
        </div>
      </section>

      <section className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0 h-full">
          <PartnerRegionCard
            title="Phân đoạn theo khu vực"
            regionData={regionData}
            regionMap={regionMap}
          />
        </div>

        <div className="min-w-0">
          <PartnerSlaTable
            title="Tuân thủ SLA & Thời gian xử lý"
            viewAllLabel="Xem tất cả"
            partnerColumnLabel="Đối tác"
            slaColumnLabel="Tuân thủ SLA"
            avgTimeColumnLabel="Thời gian TB"
            data={slaData}
          />
        </div>
      </section>
    </div>
  );
}