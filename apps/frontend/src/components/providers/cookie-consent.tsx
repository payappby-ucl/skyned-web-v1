"use client";

import { COOKIE_CONSENT_STORAGE_KEY } from "@/src/utils";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/** Represents Cookie Consent type */
export interface ICookieConsent {
  necessary: boolean;
  functional: boolean;
  marketing: boolean;
  analytics: boolean;
}

const CookieConsentContext = createContext<{
  consent: ICookieConsent;
  bannerVisible: boolean;
  acceptAll(): void;
  rejectAll(): void;
  saveConsent: (consent: ICookieConsent) => void;
} | null>(null);

export const CookieContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [consent, setConsent] = useState<ICookieConsent>({
    necessary: true,
    functional: false,
    marketing: false,
    analytics: false,
  });

  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (cookieConsent) {
      try {
        const consent = JSON.parse(cookieConsent) as ICookieConsent;
        setConsent({
          ...consent,
          necessary: true,
        });
      } catch (error) {
        setBannerVisible(true);
      }
    } else {
      setBannerVisible(true);
    }
  }, []);

  const saveConsent = useCallback((consent: ICookieConsent) => {
    const updateConsent: ICookieConsent = {
      ...consent,
      necessary: true,
    };

    localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify(updateConsent),
    );

    setConsent(updateConsent);
    setBannerVisible(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      functional: true,
      marketing: true,
      analytics: true,
    });
  }, []);

  const rejectAll = useCallback(() => {
    saveConsent({
      necessary: true,
      functional: false,
      marketing: false,
      analytics: false,
    });
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        bannerVisible,
        acceptAll,
        rejectAll,
        saveConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsentContext = () => {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("Cookie Consent Context not defined");
  }

  return context;
};
