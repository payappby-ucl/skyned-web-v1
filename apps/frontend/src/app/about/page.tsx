import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Image from "next/image";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import OurTeam from "./_components/out-team/our-team";
import { Metadata } from "next";

const title = "About Us";
const description =
  "Our team of professionals will adequately guide you through your study application journey.";

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

const teams = [
  {
    firstName: "Richard",
    lastName: "Castillo",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    title: "CEO",
  },
  {
    firstName: "Jesse",
    lastName: "Frazier",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/11/05/12/25/woman-6771278_1280.jpg",
    title: "COO",
  },
  {
    firstName: "Lela",
    lastName: "Swanson",
    imageUrl:
      "https://cdn.pixabay.com/photo/2019/02/11/20/20/woman-3990680_1280.jpg",
    title: "HOO",
  },
  {
    firstName: "Josie",
    lastName: "Bass",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
    title: "Tech Lead",
  },
  {
    firstName: "Bruce",
    lastName: "Roberson",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/11/20/15/47/portrait-7604619_1280.jpg",
    title: "Marketing Lead",
  },
  {
    firstName: "Gordon",
    lastName: "George",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/13/12/20/face-1389833_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Verna",
    lastName: "Roy",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/40/woman-1845148_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Alan",
    lastName: "Walters",
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Marian",
    lastName: "Ortega",
    imageUrl:
      "https://cdn.pixabay.com/photo/2023/01/28/23/14/woman-7751884_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Philip",
    lastName: "Haynes",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/52/man-1867175_1280.jpg",
    title: "Team Member",
  },
];

export async function generateMetadata() {
  const ceo = teams[0];
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      ...sharedMetadata.openGraph,
      images: [
        {
          url: ceo?.imageUrl,
          width: 1200,
          height: 630,
          alt: `${env.organization.name} CEO's picture`,
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      images: {
        url: ceo?.imageUrl,
        alt: `${env.organization.name} CEO's picture`,
      },
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
    mainEntity: {
      "@type": "AboutPage",
      mainEntity: teams.map((team) => ({
        "@type": "Person",
        name: `${team.firstName} ${team.lastName}`,
        jobTitle: team.title,
        image: team.imageUrl,
        email: "test@skyned.com", // TODO: Replace with real email,
        sameAs: [env.socials.facebook.handle], // TODO: Replace with real user social links
      })),
    },
  };

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
      <OurTeam teams={teams} />
    </>
  );
}
