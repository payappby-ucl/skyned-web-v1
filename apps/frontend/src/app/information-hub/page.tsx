export const dynamic = "force-dynamic";

import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";
import ScholarshipSummary from "./_components/scholarship/scholarship-summary";

const title = "Information Hub";
const description =
  "We offer free and seamless international study application support into bachelors, postgraduate diploma, postbaccalaureate, graduate certificates and masters programs.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/information-hub",
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
  } as Metadata;
}

export default async function InformationHub() {
  const informationHubPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/information-hub`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(informationHubPageJsonLd),
        }}
      />

      <Jumbotron
        title="Ultimate Guideline for Canada in 2025"
        subtitle="We offer free and seamless international study application support into bachelors, postgraduate diploma, postbaccalaureate, graduate certificates and masters programs."
        backgroundImage="/assets/images/backgrounds/infohub-bg.png"
      />

      <section className="space-y-10">
        {/* Information hub content goes here */}
        {/* Scholarship Summary */}
        <ScholarshipSummary />
      </section>
    </>
  );
}
