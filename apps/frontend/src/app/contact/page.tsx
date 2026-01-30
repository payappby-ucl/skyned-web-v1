import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import { Metadata } from "next";
import Script from "next/script";
import { WithContext, WebPage } from "schema-dts";
import ContactUsForm from "./_components/contact-form";
import Offices from "./_components/offices/offices";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { addresses, contacts } from "@/src/utils";
import Jumbotron from "../_components/jumbotron";

const title = "Get in Touch with Us";
const description = "We'd love to talk to you.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/contact",
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

export default function Contact() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/contact`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Jumbotron
        title={title}
        subtitle={description}
        backgroundImage="/assets/images/backgrounds/about-bg.png"
      >
        <div className="mt-10 grid grid-cols-1 place-content-end gap-4 self-end md:grid-cols-3">
          {contacts.map(({ Icon, description, title, href }, i) => (
            <div
              className="bg-background dark:bg-foreground text-foreground dark:text-background flex gap-2 rounded-md p-3"
              key={title}
            >
              <div className="bg-accent self-start rounded-md p-2">
                <Icon size={15} className="text-brand font-bold" />
              </div>
              <div>
                <p className="text-muted-foreground text-left text-sm">
                  {title}
                </p>
                <a
                  href={href}
                  target="_blank"
                  aria-label={title}
                  className="text-md hover:underline"
                >
                  {description}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Jumbotron>

      <CustomBreadCrumb className="bg-accent/50 border-b" />

      <section className="bg-accent/50 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <h2>Let's Work Together</h2>
          <p>Contact us for the basic question, We're to help.</p>
        </div>
        <ContactUsForm />
      </section>
      <Offices offices={addresses} />
    </>
  );
}
