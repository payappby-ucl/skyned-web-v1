import { env } from "@/src/config";
import {
  organization,
  sharedMetadata,
} from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";

const title = "Our Village";
const description = "Join our community and explore the resources available to you.";

export async function generateMetadata() {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/our-village",
    },
  } as Metadata;
}

export default async function OurVillage() {
  const ourVillagePageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/our-village`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ourVillagePageJsonLd) }}
      />

      <Jumbotron
        title="Join Our Community"
        subtitle="Explore the resources available to you and connect with like-minded individuals."
        backgroundImage="/assets/images/backgrounds/about-bg.png"
      />

      <section className="bg-accent space-y-10">
        {/* Content for the Our Village page goes here */}
        <p className="text-center text-lg">
          Welcome to our village! Here, you can find resources, connect with others, and share your experiences.
        </p>
      </section>
    </>
  );
}
