import React from "react";
import FooterNav from "./footer-nav";
import CopyRight from "./copy-right";
import { env } from "@/src/config";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import Image from "next/image";
import Socials from "./socials";
import Accreditation from "./accreditation";
import icefBadgeImage from "../../../public/assets/images/icef_badge.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand text-background dark:text-foreground">
      <div className="divide-brand-50/20 container mx-auto md:divide-y">
        <div className="grid grid-cols-1 gap-5 pb-10 md:grid-cols-2 md:pb-20 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              <Link href="/" className="block">
                <Image
                  alt={`${env.organization.name}'s Logo`}
                  src="/assets/images/brand/logo_white.png"
                  width={150}
                  height={80}
                />
              </Link>
              <p>
                On-campus work means you can get a job in places that belong to
                your school. On-campus employers can be your school.
              </p>
              <Socials />
            </div>
            <div className="py-4">
              <Link
                href="https://www.icef.com/agency/0016M00002VhOmHQAV"
                aria-label={`Link to ${env.organization.name}'s ICEF accredited page`}
                target="_blank"
              >
                <Image
                  src={icefBadgeImage}
                  alt="ICEF accreditation badge"
                  className="w-24"
                />
              </Link>
            </div>
            <Button
              className="bg-background dark:bg-foreground text-brand hover:bg-brand-50 px-15 mt-auto hidden w-full md:flex"
              aria-label="Book a consultation"
              asChild
            >
              <Link href="/consultation" aria-label="Book Consultation">
                Book consultation
              </Link>
            </Button>
          </div>
          <FooterNav />
        </div>
        {/* <Accreditation /> */}
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
