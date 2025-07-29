import { env } from "@/src/config";
import {
  missionVisionStatement,
  organization,
  sharedMetadata,
} from "@/src/utils";
import Image from "next/image";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";

import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import Jumbotron from "../_components/jumbotron";

const title = "About Us";
const description =
  "Our team of professionals will adequately guide you through your study application journey.";

export async function generateMetadata() {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/about",
    },
  } as Metadata;
}

export default async function About() {
  const aboutPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/about`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <Jumbotron
        title="About Us"
        subtitle="Our team of professionals will adequately guide you through your study application journey."
        backgroundImage="/assets/images/about_us.jpg"
      />
      <CustomBreadCrumb className="bg-accent border-b" />
      <section className="bg-accent space-y-10">
        {missionVisionStatement.map(({ imageUrl, title, description }, i) => (
          <div
            className="grid grid-cols-1 items-center gap-5 md:grid-cols-2"
            key={title}
          >
            <div
              className={`space-y-4 ${(i + 1) % 2 === 0 ? "md:order-2" : ""}`}
            >
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={500}
              className="rounded-4xl justify-self-center"
            />
          </div>
        ))}
      </section>
    </>
  );
}
