import { Metadata } from "next";
import { env } from "../config";

export const sharedMetadata: Metadata = {
  generator: "Next.js",
  applicationName: "Skyned Consults",
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "Skyned Consults",
    "Skyned educational consults",
    "Study Abroad Consultants",
    "Study Visa Assistance",
    "Study in Canada",
    "Study in the UK",
    "Study in Australia",
    "Study in the USA",
    "International Student Services",
    "Study Abroad",
    "Student Visa",
    " Student Visa Consultants",
    "Education Consultancy Services",
    "University Admission Assistance",
    "Scholarships for International Students",
    "Study and Work Abroad",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(env.client.baseUrl),
  openGraph: {
    title: "Skyned Consults",
    description:
      "We offer free expert support for international study applications into bachelor's, master's & diploma programs. Get guidance on admissions, visas, and study funding.",
    url: env.client.baseUrl,
    siteName: "Skyned Consults",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${env.client.baseUrl}/assets/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Skyned Consults - International Study Application Support",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Skyned Consults",
    description:
      "We offer free expert support for international study applications into bachelor's, master's & diploma programs. Get guidance on admissions, visas, and study funding.",
    siteId: env.socials.twitter.id,
    creator: env.socials.twitter.handle,
    creatorId: env.socials.twitter.id,
    site: env.socials.twitter.handle,
    images: {
      url: `${env.client.baseUrl}/assets/images/opengraph-image.png`,
      alt: "Skyned Consults Logo",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/images/favicon.ico",
    shortcut: "/assets/images/favicon.ico",
    apple: "/assets/images/apple-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/assets/images/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/assets/images/android-chrome-512x512.png",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/assets/images/apple-icon.png",
      },
    ],
  },
  verification: {
    google: env.seo.googleSiteVerificationId,
    me: ["info@skynedconsults.com"],
  },
  category: "Educational",
};
