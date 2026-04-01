import type { CSSProperties, ReactNode } from "react";

import { cookies } from "next/headers";

import { Bell, Search } from "lucide-react";

import { AppSidebar } from "@/app/dashboard/_components/sidebar/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { users } from "@/data/users";
import {
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
} from "@/lib/preferences/layout";
import { cn } from "@/lib/utils";
import { getPreference } from "@/server/server-actions";

import { AccountSwitcher } from "./_components/sidebar/account-switcher";

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
  const [variant, collapsible] = await Promise.all([
    getPreference("sidebar_variant", SIDEBAR_VARIANT_VALUES, "inset"),
    getPreference("sidebar_collapsible", SIDEBAR_COLLAPSIBLE_VALUES, "icon"),
  ]);

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 68)",
        } as CSSProperties
      }
    >
      <AppSidebar variant={variant} collapsible={collapsible} />
      <SidebarInset
        className={cn(
          "[html[data-content-layout=centered]_&>*]:mx-auto",
          "[html[data-content-layout=centered]_&>*]:w-full",
          "[html[data-content-layout=centered]_&>*]:max-w-screen-2xl",
        )}
      >
        <header className="flex h-16 shrink-0 items-center border-b bg-background px-6 lg:px-8">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <SidebarTrigger className="md:hidden" />
              <div className="relative max-w-xl flex-1">
                <Search
                  className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  type="search"
                  placeholder="Tìm kiếm"
                  className="h-9 rounded-md border-0 bg-muted/70 pr-4 pl-10 shadow-none focus-visible:ring-2 py-2"
                />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" aria-label="Thông báo">
                <Bell className="size-5" />
              </Button>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <AccountSwitcher users={users} />
            </div>
          </div>
        </header>
        <div className="h-full bg-[#F6F7F8] p-6 md:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
