"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  CircleHelp,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  LucideIcon,
  Map,
  MessageCircleQuestion,
  PieChart,
  Settings2,
  Split,
  SquareTerminal,
  UserIcon,
} from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  Sidebar,
} from "@workspace/ui/components/sidebar";
import { NavMain } from "./main-nav";
// import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { NavTitle } from "./nav-title";
import { department, ResourceType } from "@workspace/shared";

// This is sample data.
const data: {
  navMain: {
    title: string;
    url: string;
    resource?: ResourceType;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
} = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },

    {
      title: "Departments",
      url: "/departments",
      icon: Split,
      resource: "departments",
      items: [
        ...Object.values(department).map((name) => ({
          title: name.replace("_", " "),
          url: `/departments/${name.toLowerCase().replace("_", "-")}`,
        })),
      ],
    },

    {
      title: "Faqs",
      url: "/faqs",
      icon: MessageCircleQuestion,
      resource: "faqs",
    },

    {
      title: "Inquiries",
      url: "/inquiries",
      icon: CircleHelp,
      resource: "inquiries",
    },

    {
      title: "Accounts",
      url: "/admins",
      icon: UserIcon,
      resource: "admins",
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavTitle />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
