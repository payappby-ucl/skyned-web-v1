"use client";

import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useMemo } from "react";

export const Navigation: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  const hideNav = useMemo(() => {
    if (pathname.startsWith("/loans/eligibility")) return true;
    return false;
  }, [pathname]);

  return !hideNav ? children : null;
};
