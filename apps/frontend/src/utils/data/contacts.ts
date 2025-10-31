import { env } from "@/src/config";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";

export const contacts = [
  {
    title: "Have any questions?",
    description: env.organization.telephone,
    Icon: PhoneIcon,
    href: `tel:${env.organization.telephone}`,
  },
  {
    title: "Write to us.",
    description: env.organization.email,
    Icon: MailIcon,
    href: `mailto:${env.organization.email}`,
  },
  {
    title: "Headquarters",
    description: `${env.organization.streetAddress} ${env.organization.addressLocality}, ${env.organization.addressRegion}`,
    Icon: MapPinIcon,
    href: `${env.map.googleMapsBaseUrl}${encodeURIComponent(`${env.organization.streetAddress} ${env.organization.addressLocality}, ${env.organization.addressRegion}`)}`,
  },
];

export const addresses = [
  {
    location: "Nairobi, Kenya",
    streetAddress: "D16 (2nd Floor)",
    addressLocality: "Woodvale Groove",
    addressRegion: "Nairobi",
    consultationLink: "#",
  },
  {
    location: "Kitchener, Canada",
    streetAddress: "403 Westwood Drive",
    addressLocality: "ON, N2M 0B5,",
    addressRegion: "Kitchener",
    consultationLink: "#",
  },
  {
    location: "Lagos, Nigeria",
    streetAddress: "Unit 25, Westbrook Mall, 4th Roundabout, Chisco",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
  {
    location: "Port-Harcourt, Nigeria",
    streetAddress: "Pyale Work Hub - No 21 Bekwere Wosu Street",
    addressLocality: "D-Line",
    addressRegion: "Port-Harcourt",
    consultationLink: "https://calendar.app.google/BUibkA6R86rUyRER9",
  },
  {
    location: "Abuja, Nigeria",
    streetAddress:
      "Novare Central Mall, 2nd Floor, Plot 502 Dalaba Street, Off Michael Okpara Street",
    addressLocality: "Wuse Zone 5",
    addressRegion: "Abuja",
    consultationLink: "https://calendly.com/skynedabuja/30min",
  },
];
