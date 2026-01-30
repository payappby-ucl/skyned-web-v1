"use client";

import { useCookieConsentContext } from "@/src/components/providers/cookie-consent";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import Link from "next/link";
import React from "react";
import CookieSettings from "./cookie-settings";

const CookieBanner: React.FC = () => {
  const { bannerVisible, acceptAll } = useCookieConsentContext();
  return (
    <Sheet open={bannerVisible} modal={false}>
      <SheetContent side="bottom">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SheetHeader className="lg:col-span-2">
            <SheetTitle className="!text-2xl">Cookies</SheetTitle>
            <SheetDescription className="text-md">
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. By clicking "Accept All," you
              consent to our use of cookies. You can manage your preferences by
              clicking "Cookie Settings." For more information about how we use
              cookies, please see our{" "}
              <Button asChild variant="link" className="p-0">
                <Link href={"/cookies"} aria-label="Cookie Policy link">
                  Cookie Policy
                </Link>
              </Button>
              .
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 items-center justify-center gap-5 border p-5 md:border-0">
            <CookieSettings />
            <Button variant="brand" onClick={acceptAll}>
              Accept All Cookies
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CookieBanner;
