import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";
import { MoveRightIcon, PiggyBankIcon } from "lucide-react";

const title = "Study Loans";
const description =
  "Explore flexible study loan options to fund your international education and achieve your academic goals.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/loans",
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

export default async function Loans() {
  const loansPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/loans`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loansPageJsonLd),
        }}
      />

      <Jumbotron
        title={<>Find the Best <span className="text-[#7ddf62]">Student</span> <br/> <span className="text-[#7ddf62]">Loan</span> for Your Program</>}
        subtitle="We partner with MPOWER and Passage to connect you with the right loan based on your school, program, and visa status. Start by answering a few quick questions — it only takes 2 minutes."
        backgroundImage="/assets/images/backgrounds/loan.jpg"
        cta={{
          label: "Start Loan Check",
          href: "#loan-application",
          icon: MoveRightIcon,
        }}
        badge={{icon: PiggyBankIcon, text: "Flexible options | Low interest rates"}}
        overlay
      />

      <section className="bg-accent space-y-10">
        {/* Content for the Loans page goes here */}
        <p className="text-center text-lg">
          Welcome to our loans page! Here, you can find resources, connect with
          others, and share your experiences.
        </p>
      </section>
    </>
  );
}
