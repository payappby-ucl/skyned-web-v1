import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Graph } from "schema-dts";
import "@workspace/ui/globals.css";
import { AuthProvider } from "@/src/components/providers/auth-provider";
import Nav from "@/src/components/nav";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProviders } from "../components/providers/theme-provider";
import { sharedMetadata } from "../utils";
import { env } from "../config";
import Script from "next/script";
import Footer from "../components/footer/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...sharedMetadata,
  title: {
    default: "Skyned Consults Corporation",
    template: "%s | Skyned Consults Corporation",
  },
  description:
    "We offer free expert support for international study applications into bachelor's, master's & diploma programs. Get guidance on admissions, visas, and study funding.",
  alternates: {
    canonical: "/",
    // languages: {
    //   "en-US": "/en-US",
    //   "de-DE": "/de-DE",
    // },
  },

  // authors: [{ name: "Seb" }, { name: "Josh", url: "https://nextjs.org" }],
  // creator: "Jiachi Liu",
  // publisher: "Sebastian Markbåge",
};

// ? Organization and website JSON-LD
const baseJSONLD: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: env.organization.name,
      url: env.client.baseUrl,
      logo: `${env.client.baseUrl}/assets/images/brand/logo.png`,
      description:
        "We offer free expert support for international study applications into bachelor's, master's & diploma programs. Get guidance on admissions, visas, and study funding.",
      email: env.organization.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: env.organization.addressLocality,
        addressRegion: env.organization.addressRegion,
        postalCode: env.organization.postalCode,
        streetAddress: env.organization.streetAddress,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: env.organization.telephone,
        contactType: "Customer Support",
        availableLanguage: "English",
        email: env.organization.email,
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          ...env.organization.hoursAvailable,
        },
      },
      keywords: env.organization.keywords,
      sameAs: [
        env.socials.facebook.handle,
        env.socials.instagram.handle,
        env.socials.linkedin.handle,
        env.socials.tiktok.handle,
        env.socials.twitter.handle,
      ],
    },
    {
      "@type": "WebSite",
      name: env.organization.name,
      url: env.client.baseUrl,
      // potentialAction: {
      //   "@type": "SearchAction",
      //   target: "https://yourwebsite.com/search?q={search_term_string}",
      //   "query-input": "required name=search_term_string",
      // },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {env.seo.googleTagManagerId ? (
        <GoogleTagManager gtmId={env.seo.googleTagManagerId} />
      ) : null}
      <body className={`${poppins.variable} ${manrope.variable} antialiased`}>
        <ThemeProviders>
          <AuthProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
          <Toaster richColors closeButton />
        </ThemeProviders>
      </body>

      {/* JSON-LD */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseJSONLD) }}
      />
    </html>
  );
}
