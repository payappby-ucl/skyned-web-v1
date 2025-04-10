import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { AboutPage, WithContext } from "schema-dts";
import OurTeam from "./_components/out-team/our-team";

const title = "About Us";
const description =
  "Our team of professionals will adequately guide you through your study application journey.";

const aboutPageJsonLd: WithContext<AboutPage> = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: title,
  description,
  url: `${env.client.baseUrl}/about`,
  reviewedBy: organization,
};

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/about",
  },
};

const missionVisionStatement = [
  {
    title: "Who We Are",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
    imageUrl:
      "https://cdn.pixabay.com/photo/2024/01/23/18/55/ai-generated-8528080_1280.jpg",
  },
  {
    title: "Our Mission",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/29/18/22/girl-1423501_1280.jpg",
  },
];

export default async function About() {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <section className="text-background dark:text-foreground space-y-4 bg-gray-700 bg-[url(/assets/images/about_us.jpg)] bg-cover bg-center bg-no-repeat text-center bg-blend-multiply">
        <h1>About Us</h1>
        <p className="mx-auto max-w-lg">
          Our team of professionals will adequately guide you through your study
          application journey.
        </p>
      </section>
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
      <OurTeam />
    </>
  );
}
