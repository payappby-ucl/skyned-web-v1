import { Metadata } from "next";
import { env } from "../config";

export const sharedMetadata: Metadata = {
  generator: "Next.js",
  applicationName: env.organization.name,
  referrer: "strict-origin-when-cross-origin",
  keywords: env.organization.keywords.split(","),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(env.client.baseUrl),
  openGraph: {
    title: env.organization.name,
    description: env.organization.description,
    url: env.client.baseUrl,
    siteName: env.organization.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${env.client.baseUrl}/assets/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${env.organization.name} - International Study Application Support`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: env.organization.name,
    description: env.organization.description,
    siteId: env.socials.twitter.id,
    creator: env.socials.twitter.handle,
    creatorId: env.socials.twitter.id,
    site: env.socials.twitter.handle,
    images: {
      url: `${env.client.baseUrl}/assets/images/opengraph-image.png`,
      alt: `${env.organization.name} Logo`,
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
    me: [env.organization.email],
  },
  category: "Educational",
};
