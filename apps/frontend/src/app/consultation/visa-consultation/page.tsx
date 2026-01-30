import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import {
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
import Jumbotron from "../../_components/jumbotron";

const title = "Connect with our immigration experts";
const description =
  "Whether you're applying to study, join a spouse, or relocate permanently, our licensed immigration officers provide trusted support every step of the way.";

const url = "/consultation/visa-consultation";

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

const experts = [...legalExperts, ...visaImmigrationExperts];

export default function VisaConsultation() {
  const schema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}${url}`,
    reviewedBy: organization,
    mainEntityOfPage: {
      "@type": "ProfilePage",
      mainEntity: experts.map((expert) => ({
        "@type": "Person",
        givenName: `${expert.firstName} ${expert.lastName}`,
        jobTitle: "Legal Expert",
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
      <section className="bg-accent space-y-10">
        <div className="text-center">
          <h2>Legal Experts</h2>
          <p className="text-md">
            Get legal advice on immigration policies and visa applications
          </p>
        </div>
        {legalExperts.map(
          ({ firstName, lastName, about, link, imageUrl }, i) => (
            <div
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              key={`Legal Expert - ${i}`}
            >
              <Image
                src={imageUrl}
                alt={`Legal Expert ${firstName} ${lastName}'s image`}
                width={200}
                height={200}
                className="w-md h-full place-self-center rounded-lg object-cover md:rounded-l-lg md:rounded-br-lg md:rounded-tr-none"
              />
              <div className="space-y-1 place-self-center">
                <h3 className="text-brand !text-xl">
                  {firstName} {lastName}
                </h3>
                <p className="text-md">{about}</p>
                <Button
                  asChild
                  variant="brand"
                  className="mt-2 w-full rounded-full !text-sm md:w-fit"
                >
                  <Link
                    href={link}
                    arial-label={`Link to book a consultation with ${firstName} ${lastName}`}
                  >
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </div>
          ),
        )}
      </section>
      <section className="space-y-10">
        <div className="text-center">
          <h2>Speak with an Immigration Experts</h2>
          {/* <p className="text-md">
            Consult with experienced immigration officers for accurate guidance
          </p> */}
        </div>
        {visaImmigrationExperts.map(
          ({ firstName, lastName, about, sub, link, imageUrl }, i) => (
            <div
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              key={`Legal Expert - ${i}`}
            >
              <Image
                src={imageUrl}
                alt={`Legal Expert ${firstName} ${lastName}'s image`}
                width={200}
                height={200}
                className="w-md max-h-[300px] place-self-center rounded-lg object-cover md:rounded-l-lg md:rounded-br-lg md:rounded-tr-none"
              />
              <div className="space-y-1 place-self-center">
                <header>
                  <h3 className="text-brand !text-xl">
                    {firstName} {lastName}
                  </h3>
                  {sub ? <p className="text-muted-foreground">{sub}</p> : null}
                </header>
                <div
                  dangerouslySetInnerHTML={{ __html: about }}
                  className="text-md space-y-3"
                />
                <Button
                  asChild
                  variant="brand"
                  className="mt-2 w-full rounded-full !text-sm md:w-fit"
                >
                  <Link
                    href={link}
                    arial-label={`Link to book a consultation with ${firstName} ${lastName}`}
                  >
                    Book a consultation with {firstName} {lastName}
                  </Link>
                </Button>
              </div>
            </div>
          ),
        )}
      </section>
    </>
  );
}
