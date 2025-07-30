import { env } from "@/src/config";
import {
  organization,
  sharedMetadata,
} from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";

const title = "Schools";
const description = "Search for schools and universities in the UK, USA, Canada, Australia, and Europe.";

export async function generateMetadata() {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/schools",
    },
  } as Metadata;
}

export default async function Schools() {
  const schoolsPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/schools`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolsPageJsonLd) }}
      />

      <Jumbotron
        title="Our Partner Schools"
        subtitle="Explore our network of partner schools and universities across the UK, USA, Canada, Australia, and Europe. Discover the right institution for your academic journey."
        backgroundImage="/assets/images/backgrounds/school-bg.png"
      />

      <section className="bg-accent space-y-10">
        {/* Partner schools list or grid goes here */}
      </section>
    </>
  );
}
