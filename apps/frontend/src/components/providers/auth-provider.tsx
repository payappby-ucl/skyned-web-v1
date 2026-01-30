"use client";

import { brandClientApi } from "@/src/lib/client";
import React, { PropsWithChildren, useEffect } from "react";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    brandClientApi.auth.handleStateChange(async (user) => {
      if (user) {
        // * set cookies
        const token = await user.getIdToken();
        await brandClientApi.httpClient.setTokenCookie(token);
      } else {
        // * Delete Cookies
        await brandClientApi.httpClient.clearTokenCookie();
      }
    });
  }, []);

  return children;
};
