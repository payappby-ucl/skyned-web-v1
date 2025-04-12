import CountryOfChoice from "@/src/components/country";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import { Button } from "@workspace/ui/components/button";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";

const title = "Book Consultation";
const description =
  "Welcome to Skyned Consults! Choose the appointment type that suits your needs and schedule a session with our experts.";

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
    title: "Physical Consultation",
    subtitle: "Meet an Admission Coordinator in Person",
    description:
      "Meet our Admission Coordinators at any of our offices for a one-on-one consultation. Locations: Lagos Office, Abuja Office, Port Harcourt Office",
    link: {
      href: "/consultation/physical-consultation",
      buttonText: "Book a Physical Appointment",
    },
  },
  {
    title: "Virtual Booking",
    subtitle: "Speak to an Admission Coordinator Online",
    description: "Available via:  Google Meet",
    link: {
      href: "https://tr.ee/VhlLhimKyd",
      buttonText: "Book a Virtual Appointment",
    },
  },
  {
    title: "Visa Consultation",
    subtitle: "Speak with Immigration Officers & Lawyers",
    description:
      "Get expert advice on visa applications, immigration policies, and travel documentation. Consult with: Visa Immigration Officers, Legal Experts",
    link: {
      href: "/consultation/visa-consultation",
      buttonText: "Book a Visa Consultation",
    },
  },
  {
    title: "Rescheduling & Cancellations",
    description:
      "If you need to reschedule or cancel your appointment, please use the link in your confirmation email or contact our support team at support@skynedconsults.com or call us at +234 XXX XXXX XXXX.",
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

      <section className="text-background dark:text-foreground space-y-4 bg-gray-700 bg-[url(/assets/images/consultation.jpg)] bg-cover bg-center bg-no-repeat text-center bg-blend-multiply">
        <h1>{title}</h1>
        <p className="mx-auto max-w-lg">{description}</p>
      </section>
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
