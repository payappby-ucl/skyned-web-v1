import CountryOfChoice from "@/src/components/country";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import { Button } from "@workspace/ui/components/button";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import Jumbotron from "../_components/jumbotron";

const title = "Book an Appointment With a Study Abroad Rep";
const description =
  "Meet in person or virtually, choose what works best for you.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/consultation",
  },
};

const consultations = [
  {
    title: "Physical Consultations",
    subtitle: "Visit us in person, let's talk face-to-face.",
    description:
      "Prefer speaking with someone in person? Book a free consultation at any of our offices in Lagos, Abuja, or Port Harcourt.",
    link: {
      href: "/consultation/physical-consultation",
      buttonText: "Book a Visit",
    },
  },
  {
    title: "Virtual Consultations",
    subtitle: "Speak With Us From Anywhere",
    description:
      "Can't make it to our office? Let's meet online. It's personal, stress-free, and done on your schedule.",
    link: {
      href: "https://tr.ee/VhlLhimKyd",
      buttonText: "Book a Virtual Call",
    },
  },
  {
    title: "Visa Consultations",
    subtitle: "Let's make the visa process simpler",
    description:
      "Whether it's your first application or you've faced a rejection, we'll guide you.",
    link: {
      href: "/consultation/visa-consultation",
      buttonText: "Start Your Visa Session",
    },
  },
  {
    title: "Need to Reschedule or Cancel?",
    description:
      "If you can't make your appointment, you can easily reschedule or cancel it ahead of time. We'd love to still help you. if you need help with this, send an email to richard@skynedconsults.com or call +234 913 360 6384",
  },
];

export default function Consultation() {
  const schema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/consultation`,
    reviewedBy: organization,
    // mainEntity: {
    //     "@type": "Cons"
    // }
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Jumbotron
        title={"Book Consultation"}
        subtitle={description}
        backgroundImage="/assets/images/backgrounds/consultation-bg.png"
      />

      <CustomBreadCrumb className="bg-accent border-b" />
      <section className="bg-accent">
        <div className="bg-background shadow-xs grid grid-cols-1 gap-5 rounded-md p-5 md:p-10">
          {consultations.map(
            ({ title, subtitle, description, link }, index) => (
              <div
                className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-5"
                key={title}
              >
                <div>
                  <h2 className="!text-lg">{title}</h2>
                  {subtitle ? (
                    <p className="text-muted-foreground text-sm">
                      Meet an Admission Coordinator in Person
                    </p>
                  ) : null}
                </div>
                <div className="w-full max-w-xl space-y-2 rounded-md border p-4">
                  <p className="text-md md:text-sm">{description}</p>
                  {link ? (
                    <Button
                      asChild
                      variant="link"
                      className="text-brand w-full rounded-full text-sm md:ml-auto md:block md:w-fit"
                    >
                      <Link
                        href={link.href}
                        aria-label={`${link.buttonText}`}
                        target={`${index === 1 ? "_blank" : "_self"}`}
                      >
                        {link.buttonText}
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            ),
          )}
        </div>
      </section>
      <CountryOfChoice />
    </>
  );
}
