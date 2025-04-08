import { env } from "@/src/config";
import {
  SiFacebook,
  SiX,
  SiInstagram,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

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

const Socials: React.FC = () => (
  <div className="flex items-center gap-4">
    {socialLinks.map(({ Icon, alt, url }) => (
      <Link
        key={alt}
        href={url}
        target="_blank"
        aria-label={alt}
        className="bg-brand-500/25 rounded-sm p-2"
      >
        <Icon size={16} className="text-brand-100" />
      </Link>
    ))}
  </div>
);
export default Socials;
