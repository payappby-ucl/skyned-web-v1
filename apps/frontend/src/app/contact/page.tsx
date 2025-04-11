import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Metadata } from "next";
import Script from "next/script";
import { WithContext, ContactPage, WebPage } from "schema-dts";
import ContactUsForm from "./_components/contact-form";
import Offices from "./_components/offices/offices";

const title = "Get in Touch with Us";
const description = "We'd love to talk to you.";

const contacts = [
  {
    title: "Have any questions?",
    description: env.organization.telephone,
    Icon: PhoneIcon,
    href: `tel:${env.organization.telephone}`,
  },
  {
    title: "Write to us.",
    description: env.organization.email,
    Icon: MailIcon,
    href: `mailto:${env.organization.email}`,
  },
  {
    title: "Headquarters",
    description: `${env.organization.streetAddress} ${env.organization.addressLocality}, ${env.organization.addressRegion}`,
    Icon: MapPinIcon,
    href: `${env.map.googleMapsBaseUrl}${encodeURI(`${env.organization.streetAddress} ${env.organization.addressLocality}, ${env.organization.addressRegion}`)}`,
  },
];

const addresses = [
  {
    location: "Lagos Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
  },
  {
    location: "Abuja Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
  },
  {
    location: "Lagos Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
  },
  {
    location: "Port Harcourt Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
  },
  {
    location: "Canada Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
  },
  {
    location: "Kenya Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
  },
  {
    location: "Ghana Office",
    streetAddress: "DIS - 70b Kusenla Road, Behind Medplus Pharmacy, 2nd Floor",
    addressLocality: "Ikate",
    addressRegion: "Lagos",
  },
];

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/contact",
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
    mainEntity: {
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
      <section className="text-background dark:text-foreground grid-col grid gap-10 bg-gray-700 bg-[url(/assets/images/about_us.jpg)] bg-cover bg-center bg-no-repeat !pb-2 bg-blend-multiply">
        <div className="space-y-4 text-center">
          <h1>{title}</h1>
          <p className="mx-auto max-w-lg">{description}</p>
        </div>
        <div className="grid grid-cols-1 place-content-end gap-4 self-end md:grid-cols-3">
          {contacts.map(({ Icon, description, title, href }, i) => (
            <div
              className="bg-background dark:bg-foreground text-foreground dark:text-background flex gap-2 rounded-md p-3"
              key={title}
            >
              <div className="bg-accent self-start rounded-md p-2">
                <Icon size={15} className="text-brand font-bold" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{title}</p>
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
      </section>
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
