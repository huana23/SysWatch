import type { ComponentType } from "react";

import {
  Handshake,
  Headphones,
  HeartPulse,
  LayoutDashboard,
  type LucideIcon,
  Megaphone,
  ShieldUser,
} from "lucide-react";

export type NavIconCustom = {
  kind: "custom";
  Component: ComponentType<{ className?: string }>;
};

export type NavItemIcon = LucideIcon | NavIconCustom;

export interface NavSubItem {
  title: string;
  url: string;
  icon?: NavItemIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: NavItemIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      { title: "Tổng Quan", url: "#", icon: LayoutDashboard },
      { title: "Sức Khỏe Hệ Thống", url: "#", icon: HeartPulse },
      { title: "Đối Tác", url: "#", icon: Handshake },
      { title: "Chăm Sóc Khách Hàng", url: "#", icon: Headphones },
      { title: "Tiếp Thị", url: "#", icon: Megaphone },
      {
        title: "Kiểm Soát Truy Cập",
        url: "/dashboard/access-control",
        icon: ShieldUser,
      },
    ],
  },
];
