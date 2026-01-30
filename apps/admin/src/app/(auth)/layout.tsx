import { brandServerApi } from "@/src/lib/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await brandServerApi.httpClient.getTokenCookie();

  if (token) {
    redirect("/");
  }

  return (
    <section className="flex h-screen w-full items-center justify-center">
      {children}
    </section>
  );
}
