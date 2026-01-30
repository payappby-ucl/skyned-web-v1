"use client";
import React from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { useCookieConsentContext } from "@/src/components/providers/cookie-consent";
import { env } from "@/src/config";

const Analytics: React.FC = () => {
  const {
    consent: { analytics },
  } = useCookieConsentContext();

  if (!analytics) return null;

  return (
    <>
      {env.seo.googleTagManagerId ? (
        <GoogleTagManager gtmId={env.seo.googleTagManagerId} />
      ) : null}
    </>
  );
};

export default Analytics;
