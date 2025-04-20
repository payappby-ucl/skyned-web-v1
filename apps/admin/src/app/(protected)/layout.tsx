import { brandServerApi } from "@/src/lib/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await brandServerApi.httpClient.getTokenCookie();

  if (!token) {
    redirect("/login");
  }

  return children;
}
