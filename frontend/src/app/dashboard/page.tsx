import {
  Activity,
  Clock3,
  Handshake,
  Headset,
  Lock,
  Megaphone,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

import {
  dashboardActivities,
  dashboardAlerts,
  dashboardModuleMetrics,
  dashboardOverviewStats,
} from "@/data/overview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DashboardFilters from "@/components/overview/dashboard-filters";
import StatCardItem from "@/components/overview/stat-card-item";
import AlertCardItem from "@/components/overview/alert-card-item";
import ActivityTimelineItem from "@/components/overview/activity-timeline-item";
import ModuleCardItem from "@/components/overview/module-card-item";

const visibleActivities = dashboardActivities.slice(0, 4);

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <DashboardFilters />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCardItem
          title="Tổng số người dùng"
          value={dashboardOverviewStats.users.value}
          change={dashboardOverviewStats.users.change}
          changeType={dashboardOverviewStats.users.changeType}
          icon={<Users className="h-4 w-4" />}
          iconWrapClass="bg-blue-500/10 text-blue-500"
        />

        <StatCardItem
          title="Tổng số đơn đặt hàng"
          value={dashboardOverviewStats.orders.value}
          change={dashboardOverviewStats.orders.change}
          changeType={dashboardOverviewStats.orders.changeType}
          icon={<ShoppingCart className="h-4 w-4" />}
          iconWrapClass="bg-violet-500/10 text-violet-500"
        />

        <StatCardItem
          title="Tổng số đối tác"
          value={dashboardOverviewStats.partners.value}
          change={dashboardOverviewStats.partners.change}
          changeType={dashboardOverviewStats.partners.changeType}
          icon={<Handshake className="h-4 w-4" />}
          iconWrapClass="bg-amber-500/10 text-amber-500"
        />

        <StatCardItem
          title="Doanh thu hôm nay"
          value={dashboardOverviewStats.revenue.value}
          change={dashboardOverviewStats.revenue.change}
          changeType={dashboardOverviewStats.revenue.changeType}
          icon={<Wallet className="h-4 w-4" />}
          iconWrapClass="bg-emerald-500/10 text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 py-4">
            <CardTitle className="text-xl font-bold">
              Cảnh Báo Hoạt Động
            </CardTitle>

            <Button
              variant="link"
              className="h-auto p-0 text-sm font-semibold text-primary"
            >
              Xem tất cả
            </Button>
          </CardHeader>

          <CardContent className="space-y-3 p-4">
            {dashboardAlerts.map((item, index) => (
              <AlertCardItem
                key={`${item.type}-${item.time}-${index}`}
                item={item}
              />
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border shadow-sm">
          <CardHeader className="border-b px-6 py-5">
            <CardTitle className="text-[18px] font-semibold leading-7 text-foreground">
              Hoạt Động Gần Đây
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 py-5">
            <div className="space-y-1">
              {visibleActivities.map((item, index) => (
                <ActivityTimelineItem
                  key={`${item.title}-${item.time}`}
                  item={item}
                  isLast={index === visibleActivities.length - 1}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-col gap-2 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl font-bold">
            Tóm Tắt Trạng Thái Các Module
          </CardTitle>

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            Đồng bộ: 1 phút trước
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">
            <ModuleCardItem
              name="System Health"
              value={dashboardModuleMetrics.systemHealth.value}
              status={dashboardModuleMetrics.systemHealth.status}
              icon={<Activity className="h-4 w-4" />}
              strokeClass="text-emerald-500"
              textClass="text-emerald-500"
              borderClass="border-emerald-500/30"
            />

            <ModuleCardItem
              name="Partners"
              value={dashboardModuleMetrics.partners.value}
              status={dashboardModuleMetrics.partners.status}
              icon={<Handshake className="h-4 w-4" />}
              strokeClass="text-sky-500"
              textClass="text-sky-500"
              borderClass="border-sky-500/30"
            />

            <ModuleCardItem
              name="Customer Support"
              value={dashboardModuleMetrics.customerSupport.value}
              status={dashboardModuleMetrics.customerSupport.status}
              icon={<Headset className="h-4 w-4" />}
              strokeClass="text-amber-500"
              textClass="text-amber-500"
              borderClass="border-amber-500/30"
            />

            <ModuleCardItem
              name="Marketing"
              value={dashboardModuleMetrics.marketing.value}
              status={dashboardModuleMetrics.marketing.status}
              icon={<Megaphone className="h-4 w-4" />}
              strokeClass="text-violet-500"
              textClass="text-violet-500"
              borderClass="border-violet-500/30"
            />

            <ModuleCardItem
              name="Access Control"
              value={dashboardModuleMetrics.accessControl.value}
              status={dashboardModuleMetrics.accessControl.status}
              icon={<Lock className="h-4 w-4" />}
              strokeClass="text-emerald-500"
              textClass="text-emerald-500"
              borderClass="border-emerald-500/30"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}