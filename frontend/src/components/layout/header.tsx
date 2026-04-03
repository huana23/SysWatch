"use client";

import ThemeModeToggle from "@/components/layout/theme-mode-toggle";

type HeaderProps = {
  onOpenSidebar?: () => void;
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
};

export default function Header({
  onOpenSidebar,
  userName = "Alex Rivera",
  userRole = "Quản trị viên hệ thống",
  avatarUrl,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground shadow-lg transition-colors dark:bg-[#111111] lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
          aria-label="Mở menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="hidden w-full max-w-xl sm:block">
          <div className="group relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/60 transition-colors group-focus-within:text-primary">
              search
            </span>

            <input
              type="text"
              placeholder="Tìm kiếm"
              aria-label="Tìm kiếm"
              className="w-full rounded-lg border border-sidebar-border bg-sidebar-accent py-2 pl-10 pr-4 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/60 outline-none transition-colors focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="ml-2 flex items-center gap-2 sm:gap-4">
        <ThemeModeToggle />

        <button
          type="button"
          aria-label="Thông báo"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden h-8 w-px bg-sidebar-border md:block" />

        <button
          type="button"
          aria-label="Thông tin người dùng"
          className="flex items-center gap-2 rounded-full px-1 py-1 transition-colors hover:bg-sidebar-accent sm:gap-3 sm:px-2"
        >
          <div className="hidden text-right md:block">
            <p className="text-xs font-bold leading-none text-sidebar-foreground">
              {userName}
            </p>
            <p className="text-[10px] font-medium text-sidebar-foreground/70">
              {userRole}
            </p>
          </div>

          <div className="h-9 w-9 overflow-hidden rounded-full border border-sidebar-border bg-sidebar-accent">
            <img
              loading="lazy"
              className="h-full w-full object-cover"
              alt={`${userName} avatar`}
              src={
                avatarUrl ||
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDvZYzZqQeU2AiRNlwZbKELol28ia8IdNQfgt1xq4pH6PdpUIlhWAQ7dp6MMCdgmJ7YNDPCLnwmSgyX43mXceAlox-EX1qsjCpG3-a8ScPCWQEwPaCCGYogt9XGYGAJqaZmKYIb1oL8DgSJdgSDKQbxbsfpiT6tTmcGJ0SKBm7W9z_vKDOoqdIj1OTIsEN8xaiBBhvIr7rYQrrlUm-wjAdYcczAgqEcmuzch3eMR9GKnPioBqCao7J26xMf1e8qmQNb9K9uVdiEiC5K"
              }
            />
          </div>

          <span className="hidden material-symbols-outlined text-sidebar-foreground/70 sm:inline">
            expand_more
          </span>
        </button>
      </div>
    </header>
  );
}