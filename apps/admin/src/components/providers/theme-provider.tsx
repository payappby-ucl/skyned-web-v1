"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "@workspace/ui/components/sonner";

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      forcedTheme="dark"
    >
      {children}
    </NextThemesProvider>
  );
}
