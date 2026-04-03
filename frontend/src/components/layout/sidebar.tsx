"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  name: string;
  icon: string;
  href: string;
};

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
  logoText?: string;
  subtitle?: string;
  menuItems?: MenuItem[];
  systemStatus?: {
    text: string;
    color: string;
  };
};

  export default function Sidebar({
    isOpen = false,
    onClose = () => {},
    logoText = "Hệ Thống Giám Sát",
    subtitle = "Bảng Điều Khiển Quản Trị",
    menuItems = [
      { name: "Tổng Quan", icon: "dashboard", href: "/dashboard" },
      { name: "Sức Khỏe Hệ Thống", icon: "health_metrics", href: "/health" },
      { name: "Đối Tác", icon: "handshake", href: "/partners" },
      { name: "Chăm Sóc Khách Hàng", icon: "support_agent", href: "/support" },
      { name: "Tiếp Thị", icon: "campaign", href: "/marketing" },
      { name: "Kiểm Soát Truy Cập", icon: "shield_person", href: "/access-control" },
    ],
    systemStatus = {
      text: "Tất cả hệ thống hoạt động bình thường",
      color: "green-600",
    },
  }: SidebarProps) {
    const pathname = usePathname();

    const statusColorClass =
      systemStatus.color === "green-600"
        ? "bg-green-500"
        : systemStatus.color === "yellow-500"
          ? "bg-yellow-500"
          : systemStatus.color === "red-500"
            ? "bg-red-500"
            : "bg-green-500";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-lg transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between gap-3 p-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <span className="material-symbols-outlined">monitoring</span>
              </div>

              <div className="min-w-0">
                <h1 className="truncate font-bold leading-tight text-sidebar-foreground">
                  {logoText}
                </h1>
                <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
              aria-label="Đóng menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav
            className="flex-1 space-y-1 overflow-y-auto px-4 py-2"
            aria-label="Sidebar navigation"
          >
            {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              aria-label={item.name}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                isActive
                  ? "bg-[#1C90E91A] text-[#1C90E9]"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
          </nav>

          <div className="shrink-0 border-t border-sidebar-border p-4">
            <div className="rounded-xl border border-primary/15 bg-primary/10 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                TRẠNG THÁI
              </p>

              <div className="flex items-center gap-2" aria-live="polite">
                <div className={`h-2 w-2 rounded-full ${statusColorClass}`} />
                <span className="text-sm text-sidebar-foreground/90">
                  {systemStatus.text}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}