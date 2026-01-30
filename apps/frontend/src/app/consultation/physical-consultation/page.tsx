import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { addresses, organization, sharedMetadata } from "@/src/utils";
import { Metadata } from "next";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import Office from "../../contact/_components/offices/office";
import Jumbotron from "../../_components/jumbotron";

const title = "Get expert advice in person at our office.";
const description =
  "Visit us to get the clarity and confidence you need, straight from a trusted professional.";

const url = "/consultation/physical-consultation";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: url,
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

export default function VisaConsultation() {
  const schema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}${url}`,
    reviewedBy: organization,
    mainEntityOfPage: {
      "@type": "ContactPage",
      mainEntity: addresses.map((address) => ({
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: address.addressLocality,
          addressRegion: address.addressRegion,
          streetAddress: address.streetAddress,
        },
      })),
    },
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Jumbotron
        title={title}
        subtitle={description}
        backgroundImage="/assets/images/visa_consultation.jpg"
      />
      <CustomBreadCrumb className="bg-accent border-b" />
      <section className="bg-accent">
        <div className="text-center">
          <h2>Meet with an expert at our office today</h2>
          {/* <p>One-on-One Consultation</p> */}
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((office, i) => (
            <Office
              office={office}
              key={`${office.location} - ${i}`}
              consultation
            />
          ))}
        </div>
      </section>
    </>
  );
}
