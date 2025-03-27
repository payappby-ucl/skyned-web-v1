import React from "react";
import { env } from "@/src/config";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import {
  SiFacebook,
  SiX,
  SiTiktok,
  SiInstagram,
  SiLinkerd,
} from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";

const navLinks = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Village",
    href: "/village",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Cookie Policy",
    href: "/cookies",
  },
  {
    title: "Partnership",
    href: "/partnership",
  },
  {
    title: "Meet the team",
    href: "/team",
  },
  {
    title: "Terms of service",
    href: "/terms",
  },
];

const socialLinks = [
  {
    Icon: SiFacebook,
    url: env.socials.facebook.handle,
    alt: `${env.organization.name}'s Facebook Page Link`,
  },
  {
    Icon: SiX,
    url: env.socials.twitter.handle,
    alt: `${env.organization.name}'s X (twitter) Page Link`,
  },
  {
    Icon: Linkedin,
    url: env.socials.linkedin.handle,
    alt: `${env.organization.name}'s Linkedin Page Link`,
  },
  {
    Icon: SiInstagram,
    url: env.socials.instagram.handle,
    alt: `${env.organization.name}'s Instagram Page Link`,
  },
  {
    Icon: SiTiktok,
    url: env.socials.tiktok.handle,
    alt: `${env.organization.name}'s Tiktok Page Link`,
  },
];

const FooterNav: React.FC = () => {
  return (
    <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-4">
        <Link href="/" className="block">
          <Image
            alt={`${env.organization.name}'s Logo`}
            src="/assets/images/brand/logo.png"
            width={150}
            height={80}
          />
        </Link>
        <Button className="bg-background dark:bg-foreground text-brand hover:bg-brand-50 px-15">
          Book consultation
        </Button>
      </div>
      <div className="space-y-4 lg:col-start-3">
        <nav
          className="grid grid-cols-3 items-center gap-2"
          aria-label="Footer Navigation"
        >
          {navLinks.map((link) => (
            <Link key={link.title} href={link.href} className="text-md">
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ Icon, alt, url }) => (
            <Link
              key={alt}
              href={url}
              target="_blank"
              aria-label={alt}
              className="bg-brand-900 rounded-md p-2"
            >
              <Icon size={16} className="text-brand-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
