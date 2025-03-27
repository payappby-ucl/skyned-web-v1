import { WithContext, WebPage } from "schema-dts";
import { env } from "../config";
import Script from "next/script";
import HeroSection from "./_components/hero";

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
    <section>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />

      <HeroSection />
      <div className="h-20"></div>
    </section>
  );
}
