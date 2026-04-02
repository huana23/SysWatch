import {
  Activity,
  AlertTriangle,
  Handshake,
  Headset,
  Info,
  Lock,
  Megaphone,
  ShieldAlert,
  ShoppingCart,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type {
  DashboardAlertItem,
  DashboardModuleItem,
  DashboardStatCard,
} from "@/types/overview";

export const statIconMap: Record<DashboardStatCard["icon"], LucideIcon> = {
  users: Users,
  "shopping-cart": ShoppingCart,
  handshake: Handshake,
  wallet: Wallet,
};

export const alertIconMap: Record<DashboardAlertItem["icon"], LucideIcon> = {
  "shield-alert": ShieldAlert,
  "alert-triangle": AlertTriangle,
  info: Info,
};

export const moduleIconMap: Record<DashboardModuleItem["icon"], LucideIcon> = {
  activity: Activity,
  handshake: Handshake,
  headset: Headset,
  megaphone: Megaphone,
  lock: Lock,
};

export function getStatIconWrapClass(color: DashboardStatCard["color"]) {
  switch (color) {
    case "blue":
      return "bg-blue-500/10 text-blue-500";
    case "violet":
      return "bg-violet-500/10 text-violet-500";
    case "amber":
      return "bg-amber-500/10 text-amber-500";
    case "emerald":
      return "bg-emerald-500/10 text-emerald-500";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function getModuleColorClasses(color: DashboardModuleItem["color"]) {
  switch (color) {
    case "emerald":
      return {
        strokeClass: "text-emerald-500",
        textClass: "text-emerald-500",
        borderClass: "border-emerald-500/30",
      };
    case "sky":
      return {
        strokeClass: "text-sky-500",
        textClass: "text-sky-500",
        borderClass: "border-sky-500/30",
      };
    case "amber":
      return {
        strokeClass: "text-amber-500",
        textClass: "text-amber-500",
        borderClass: "border-amber-500/30",
      };
    case "violet":
      return {
        strokeClass: "text-violet-500",
        textClass: "text-violet-500",
        borderClass: "border-violet-500/30",
      };
    default:
      return {
        strokeClass: "text-muted-foreground",
        textClass: "text-muted-foreground",
        borderClass: "border-border",
      };
  }
}

export function getChangeBadgeClass(type: DashboardStatCard["changeType"]) {
  if (type === "up") {
    return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10";
  }

  if (type === "down") {
    return "bg-red-500/10 text-red-500 hover:bg-red-500/10";
  }

  return "bg-muted text-muted-foreground hover:bg-muted";
}

export function getAlertStyles(type: DashboardAlertItem["type"]) {
  if (type === "danger") {
    return {
      wrap: "border-red-500/15 bg-red-500/5",
      icon: "text-red-500",
      title: "text-red-500",
      time: "text-red-400",
    };
  }

  if (type === "warning") {
    return {
      wrap: "border-amber-500/15 bg-amber-500/5",
      icon: "text-amber-500",
      title: "text-amber-500",
      time: "text-amber-400",
    };
  }

  return {
    wrap: "border-blue-500/15 bg-blue-500/5",
    icon: "text-blue-500",
    title: "text-blue-500",
    time: "text-blue-400",
  };
}
