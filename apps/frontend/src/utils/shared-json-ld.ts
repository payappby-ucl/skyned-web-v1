import { ContactPoint, Organization, PostalAddress } from "schema-dts";
import { env } from "../config";

export const address: PostalAddress = {
  "@type": "PostalAddress",
  addressLocality: env.organization.addressLocality,
  addressRegion: env.organization.addressRegion,
  postalCode: env.organization.postalCode,
  streetAddress: env.organization.streetAddress,
};

export const contactPoint: ContactPoint = {
  "@type": "ContactPoint",
  telephone: env.organization.telephone,
  contactType: "Customer Support",
  availableLanguage: "English",
  email: env.organization.email,
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    ...env.organization.hoursAvailable,
  },
};

export const organization: Organization = {
  "@type": "Organization",
  name: env.organization.name,
  url: env.client.baseUrl,
  logo: `${env.client.baseUrl}/assets/images/brand/logo.png`,
  description:
    "We offer free expert support for international study applications into bachelor's, master's & diploma programs. Get guidance on admissions, visas, and study funding.",
  email: env.organization.email,
  foundingDate: "2020-12-11",
  foundingLocation: {
    "@type": "Place",
    address,
  },
  address,
  contactPoint,
  keywords: env.organization.keywords,
  sameAs: [
    env.socials.facebook.handle,
    env.socials.instagram.handle,
    env.socials.linkedin.handle,
    env.socials.tiktok.handle,
    env.socials.twitter.handle,
  ],

  // award: ["Industry Innovation Award 2022", "Best Workplace 2023"],
  // member: [
  //   {
  //     "@type": "Person",
  //     name: "Jane Doe",
  //     jobTitle: "CEO",
  //     image: "https://www.yourcompany.com/images/team/jane-doe.jpg",
  //     description:
  //       "Jane founded the company in 2010 with a vision to transform the industry.",
  //     sameAs: ["https://www.linkedin.com/in/janedoe"],
  //   },
  //   {
  //     "@type": "Person",
  //     name: "John Smith",
  //     jobTitle: "CTO",
  //     image: "https://www.yourcompany.com/images/team/john-smith.jpg",
  //     description:
  //       "John leads our technical innovations with over 15 years of industry experience.",
  //     sameAs: ["https://www.linkedin.com/in/johnsmith"],
  //   },
  // ],
};
