"use client";

import * as React from "react";
import {
  CircleHelp,
  LayoutDashboard,
  LucideIcon,
  MessageCircleQuestion,
  NotebookText,
  School,
  Settings2,
  Split,
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
import { IDepartment, ResourceType } from "@workspace/shared";

export function AppSidebar({
  departments,
  ...props
}: React.ComponentProps<typeof Sidebar> & { departments: IDepartment[] }) {
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
  } = React.useMemo(
    () => ({
      navMain: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
        },
        {
          title: "Schools",
          url: "/schools",
          icon: School,
          resource: "schools",
        },

        ...(departments?.length
          ? [
              {
                title: "Departments",
                url: "/departments",
                icon: Split,
                resource: "departments" as "departments",
                items: [
                  ...departments.map((department) => ({
                    department,
                    title: department.name.replace("_", " "),
                    url: `/departments/${department.name.toLowerCase().replace("_", "-")}`,
                  })),
                ],
              },
            ]
          : []),

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
          title: "Blog",
          url: "/blog",
          icon: NotebookText,
          resource: "blogs",
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
    }),
    [],
  );

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
