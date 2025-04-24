"use client";

import HasPermission from "@/src/components/has-permission";
import { ResourceType } from "@workspace/shared";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@workspace/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IItem {
  title: string;
  url: string;
  resource?: ResourceType;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

const NavWithItems: React.FC<{ item: IItem }> = ({ item }) => {
  const pathname = usePathname();

  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            asChild
            className={
              pathname === item.url ||
              (item.url !== "/" && pathname.startsWith(item.url))
                ? "bg-accent"
                : ""
            }
          >
            <Link href={item.url}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link
                    href={subItem.url}
                    className={
                      pathname === subItem.url ||
                      (subItem.url !== "/" && pathname.startsWith(subItem.url))
                        ? "bg-accent"
                        : ""
                    }
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavWithoutItems: React.FC<{ item: IItem }> = ({ item }) => {
  const pathname = usePathname();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild tooltip={item.title}>
        <Link
          href={item.url}
          className={
            pathname === item.url ||
            (item.url !== "/" && pathname.startsWith(item.url))
              ? "bg-accent"
              : ""
          }
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function NavMain({ items }: { items: IItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm">Account</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.resource ? (
            <HasPermission
              resourceName={item.resource}
              action="list"
              args={[]}
              key={item.title}
            >
              {item.items?.length ? (
                <NavWithItems item={item} />
              ) : (
                <NavWithoutItems item={item} />
              )}
            </HasPermission>
          ) : item.items?.length ? (
            <NavWithItems item={item} key={item.title} />
          ) : (
            <NavWithoutItems item={item} key={item.title} />
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
