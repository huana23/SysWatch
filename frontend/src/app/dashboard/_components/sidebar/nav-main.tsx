"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type {
  NavGroup,
  NavItemIcon,
  NavMainItem,
} from "@/navigation/sidebar/sidebar-items";

const navMenuLinkButtonClass = "h-auto gap-3 px-3 py-2.5";

function SidebarNavIcon({
  icon,
  className,
}: {
  icon?: NavItemIcon;
  className?: string;
}) {
  if (!icon) {
    return null;
  }
  if (
    typeof icon === "object" &&
    icon !== null &&
    "kind" in icon &&
    icon.kind === "custom"
  ) {
    const C = icon.Component;
    return <C className={cn("size-4 shrink-0", className)} />;
  }
  const Lucide = icon as LucideIcon;
  return <Lucide className={cn("size-4 shrink-0", className)} />;
}

interface NavMainProps {
  readonly items: readonly NavGroup[];
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">
    Soon
  </span>
);

const NavItemExpanded = ({
  item,
  isActive,
  isSubmenuOpen,
}: {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavMainItem["subItems"]) => boolean;
  isSubmenuOpen: (subItems?: NavMainItem["subItems"]) => boolean;
}) => {
  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={isSubmenuOpen(item.subItems)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {item.subItems ? (
            <SidebarMenuButton
              disabled={item.comingSoon}
              isActive={isActive(item.url, item.subItems)}
              tooltip={item.title}
            >
              <SidebarNavIcon icon={item.icon} />
              <span>{item.title}</span>
              {item.comingSoon && <IsComingSoon />}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              asChild
              aria-disabled={item.comingSoon}
              isActive={isActive(item.url)}
              tooltip={item.title}
              className={navMenuLinkButtonClass}
            >
              <Link
                prefetch={false}
                href={item.url}
                target={item.newTab ? "_blank" : undefined}
              >
                <SidebarNavIcon icon={item.icon} />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        {item.subItems && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    aria-disabled={subItem.comingSoon}
                    isActive={isActive(subItem.url)}
                    asChild
                  >
                    <Link
                      prefetch={false}
                      href={subItem.url}
                      target={subItem.newTab ? "_blank" : undefined}
                    >
                      <SidebarNavIcon icon={subItem.icon} />
                      <span>{subItem.title}</span>
                      {subItem.comingSoon && <IsComingSoon />}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavItemCollapsed = ({
  item,
  isActive,
}: {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavMainItem["subItems"]) => boolean;
}) => {
  return (
    <SidebarMenuItem key={item.title}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            disabled={item.comingSoon}
            tooltip={item.title}
            isActive={isActive(item.url, item.subItems)}
          >
            <SidebarNavIcon icon={item.icon} />
            <span>{item.title}</span>
            <ChevronRight />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-50 space-y-1"
          side="right"
          align="start"
        >
          {item.subItems?.map((subItem) => (
            <DropdownMenuItem key={subItem.title} asChild>
              <SidebarMenuSubButton
                key={subItem.title}
                asChild
                className="focus-visible:ring-0"
                aria-disabled={subItem.comingSoon}
                isActive={isActive(subItem.url)}
              >
                <Link
                  prefetch={false}
                  href={subItem.url}
                  target={subItem.newTab ? "_blank" : undefined}
                >
                  <SidebarNavIcon
                    icon={subItem.icon}
                    className="[&>svg]:text-sidebar-foreground"
                  />
                  <span>{subItem.title}</span>
                  {subItem.comingSoon && <IsComingSoon />}
                </Link>
              </SidebarMenuSubButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export function NavMain({ items }: NavMainProps) {
  const path = usePathname();
  const { state, isMobile } = useSidebar();

  const isItemActive = (url: string, subItems?: NavMainItem["subItems"]) => {
    if (subItems?.length) {
      return subItems.some((sub) => path.startsWith(sub.url));
    }
    return path === url;
  };

  const isSubmenuOpen = (subItems?: NavMainItem["subItems"]) => {
    return subItems?.some((sub) => path.startsWith(sub.url)) ?? false;
  };

  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.id}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarGroupContent className="flex flex-col gap-1">
            <SidebarMenu>
              {group.items.map((item) => {
                if (state === "collapsed" && !isMobile) {
                  // If no subItems, just render the button as a link
                  if (!item.subItems) {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          aria-disabled={item.comingSoon}
                          tooltip={item.title}
                          isActive={isItemActive(item.url)}
                          className={navMenuLinkButtonClass}
                        >
                          <Link
                            prefetch={false}
                            href={item.url}
                            target={item.newTab ? "_blank" : undefined}
                          >
                            <SidebarNavIcon icon={item.icon} />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                  // Otherwise, render the dropdown as before
                  return (
                    <NavItemCollapsed
                      key={item.title}
                      item={item}
                      isActive={isItemActive}
                    />
                  );
                }
                // Expanded view
                return (
                  <NavItemExpanded
                    key={item.title}
                    item={item}
                    isActive={isItemActive}
                    isSubmenuOpen={isSubmenuOpen}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
