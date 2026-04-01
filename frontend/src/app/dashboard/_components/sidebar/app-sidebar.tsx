"use client";

import Image from "next/image";
import Link from "next/link";

import {
  CircleHelp,
  ClipboardList,
  Database,
  File,
  Search,
  Settings,
} from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { rootUser } from "@/data/users";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const _data = {
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: CircleHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Database,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardList,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: File,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.sidebarVariant,
      sidebarCollapsible: s.sidebarCollapsible,
      isSynced: s.isSynced,
    })),
  );

  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-auto min-h-0 min-w-0 gap-3 px-6 py-6 text-left group-data-[collapsible=icon]:px-2! group-data-[collapsible=icon]:py-2! rounded-none"
            >
              <Link
                prefetch={false}
                href="/dashboard/default"
                className="flex min-w-0 items-center gap-3"
              >
                <Image
                  src={APP_CONFIG.logoSrc}
                  alt={APP_CONFIG.brandTitle}
                  width={40}
                  height={40}
                  className="size-10 shrink-0 group-data-[collapsible=icon]:size-8"
                  unoptimized
                />
                <div className="flex min-w-0 flex-col gap-0.5 leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-[15px] text-heading-lg">
                    {APP_CONFIG.brandTitle}
                  </span>
                  <span className="text-healing-md text-xs">
                    {APP_CONFIG.brandSubtitle}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
