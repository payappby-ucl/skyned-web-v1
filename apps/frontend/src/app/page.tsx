import { WithContext, WebPage } from "schema-dts";
import { env } from "../config";
import Script from "next/script";
import HeroSection from "./_components/hero";
import Partners from "./_components/partners";
import CountryOfChoice from "./_components/country";
import Personality from "./_components/personality";
import Products from "./_components/products";
import BlogPosts from "./_components/blog";
import Testimonials from "./_components/testimonials";
import { Metadata } from "next";
import { sharedMetadata } from "../utils";

const title = "Achieve Your Dreams of Moving Abroad.";
const description =
  "We offer free and seamless international study application support into bachelors, postgraduate diploma, postbaccalaureate, graduate certificates and masters programs";

const homePageJsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  mainEntity: {
    "@type": "WebPageElement",
    mainEntityOfPage: env.client.baseUrl,
    keywords: env.organization.keywords,
  },
  author: {
    "@type": "Organization",
    name: env.organization.name,
  },
  publisher: {
    "@type": "Organization",
    name: env.organization.name,
    logo: {
      "@type": "ImageObject",
      url: `${env.client.baseUrl}/assets/images/brand/logo.png`,
    },
  },
};

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  return (
    <div>
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
    </div>
  );
}
