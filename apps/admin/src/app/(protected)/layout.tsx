import { brandServerApi } from "@/src/lib/server";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { redirect } from "next/navigation";
import React from "react";
import { AppSidebar } from "./_components/nav/app-sidebar";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await brandServerApi.httpClient.getTokenCookie();

  if (!token) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CustomBreadCrumb />
          </div>
        </header>
        <section className="h-full w-full !p-4">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
