import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";

const title = "Privacy Policy & Cookie Policy";
const description =
  'Skyned Consults Corporation ("we", "us", "our") is committed to protecting your privacy. This Privacy & Cookies Policy explains how we collect, use, disclose, and protect your personal information when you visit or use our website and services.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/privacy-policy",
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

export default async function PrivacyPolicy() {
  const privacyPolicyPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/privacy-policy`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyPolicyPageJsonLd),
        }}
      />

      <Jumbotron
        title={title}
        subtitle={description}
        backgroundImage="/assets/images/backgrounds/infohub-bg.png"
      />

      <section className="bg-accent space-y-10">
        {/* Information hub content goes here */}
      </section>
    </>
  );
}
