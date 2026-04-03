"use client";

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
} from "@/data/overview";
import AlertCardItem from "@/components/overview/alert-card-item";
import ActivityTimelineItem from "@/components/overview/activity-timeline-item";
import DashboardFilters from "@/components/overview/dashboard-filters";
import ModuleCardItem from "@/components/overview/module-card-item";
import StatCardItem from "@/components/overview/stat-card-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { getChangeMeta } from "@/lib/change-trend";

const visibleActivities = dashboardActivities.slice(0, 4);

function DashboardStatSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-8 w-24 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-4 w-20 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isReady, stats, syncedLabel } = useDashboardStats();

  const usersChange = getChangeMeta(stats.users.change);
  const ordersChange = getChangeMeta(stats.orders.change);
  const partnersChange = getChangeMeta(stats.partners.change);
  const revenueChange = getChangeMeta(stats.revenue.change);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <DashboardFilters />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isReady ? (
          <>
            <StatCardItem
              title="Tổng số người dùng"
              value={stats.users.value}
              change={usersChange.displayChange}
              changeType={usersChange.changeType}
              icon={<Users className="h-6 w-6" />}
              iconWrapClass="bg-blue-500/10 text-blue-500"
            />

            <StatCardItem
              title="Tổng số đơn đặt hàng"
              value={stats.orders.value}
              change={ordersChange.displayChange}
              changeType={ordersChange.changeType}
              icon={<ShoppingCart className="h-6 w-6" />}
              iconWrapClass="bg-violet-500/10 text-violet-500"
            />

            <StatCardItem
              title="Tổng số đối tác"
              value={stats.partners.value}
              change={partnersChange.displayChange}
              changeType={partnersChange.changeType}
              icon={<Handshake className="h-6 w-6" />}
              iconWrapClass="bg-amber-500/10 text-amber-500"
            />

            <StatCardItem
              title="Doanh thu hôm nay"
              value={stats.revenue.value}
              change={revenueChange.displayChange}
              changeType={revenueChange.changeType}
              icon={<Wallet className="h-6 w-6" />}
              iconWrapClass="bg-emerald-500/10 text-emerald-500"
            />
          </>
        ) : (
          <>
            <DashboardStatSkeleton />
            <DashboardStatSkeleton />
            <DashboardStatSkeleton />
            <DashboardStatSkeleton />
          </>
        )}
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
            Đồng bộ: {isReady ? syncedLabel : "Đang tải dữ liệu..."}
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