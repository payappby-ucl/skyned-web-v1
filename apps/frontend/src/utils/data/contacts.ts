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
    location: "Lagos Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
  {
    location: "Abuja Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
  {
    location: "Lagos Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
  {
    location: "Port Harcourt Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
  {
    location: "Canada Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
  {
    location: "Kenya Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
  {
    location: "Ghana Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
    consultationLink: "#",
  },
];
