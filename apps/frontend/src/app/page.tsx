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

const homePageJsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Landing Page Title",
  description: "Detailed description of your landing page",
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
