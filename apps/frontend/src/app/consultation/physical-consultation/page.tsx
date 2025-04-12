import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import {
  addresses,
  legalExperts,
  organization,
  sharedMetadata,
  visaImmigrationExperts,
} from "@/src/utils";
import { Button } from "@workspace/ui/components/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import Office from "../../contact/_components/offices/office";

const title = "Meet Our Admission Coordinators for a One-on-One Consultation";
const description =
  "Visit any of our offices for expert guidance on admissions and academic processes";

const url = "/consultation/physical-consultation";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: url,
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

      <section className="text-background dark:text-foreground space-y-4 bg-gray-700 bg-[url(/assets/images/visa_consultation.jpg)] bg-cover bg-center bg-no-repeat text-center bg-blend-multiply">
        <h1 className="mx-auto md:max-w-2xl">{title}</h1>
        <p className="mx-auto max-w-lg">{description}</p>
      </section>
      <CustomBreadCrumb className="bg-accent border-b" />
      <section className="bg-accent">
        <div className="text-center">
          <h2>Our Office Locations</h2>
          <p>One-on-One Consultation</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-8">
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
