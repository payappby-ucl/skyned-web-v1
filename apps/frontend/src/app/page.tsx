import { WithContext, WebPage } from "schema-dts";
import { env } from "../config";
import Script from "next/script";
import HeroSection from "./_components/hero";
import Partners from "./_components/partners";
import CountryOfChoice from "../components/country";
import Personality from "./_components/personality";
import Products from "./_components/products";
import BlogPosts from "./_components/blog";
import Testimonials from "./_components/testimonials";
import { Metadata } from "next";
import { organization, sharedMetadata } from "../utils";

const title = "Your Next Big Move, Study Abroad";
const description =
  "We've guided 1000+ students who wanted more, more opportunities, more future. Get free support for applications to international schools.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    description,
  },
  twitter: {
    ...sharedMetadata.twitter,
    title,
    description,
  },
};

export default async function Home() {
  const homePageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}`,
    mainEntity: {
      "@type": "WebPageElement",
      mainEntityOfPage: env.client.baseUrl,
      keywords: env.organization.keywords,
    },
    author: {
      "@type": "Organization",
      name: env.organization.name,
    },
    publisher: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />

      <HeroSection />
      <Partners />
      <CountryOfChoice />
      <Personality />
      <Products />
      <BlogPosts />
      <Testimonials />
    </>
  );
}
