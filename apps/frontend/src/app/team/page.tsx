export const dynamic = "force-dynamic";

import Alert from "@/src/components/alert";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { organization, sharedMetadata } from "@/src/utils";
import { IAdmin } from "@workspace/shared";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import OurTeam from "./_components/our-team";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { cache } from "react";
import { Metadata } from "next";

const getOurTeam = cache(async () => {
  const { data: teams } = await brandServerApi.httpClient.request<
    OurTeamType[]
  >("/our-team", "GET", {
    next: {
      revalidate: 86400,
    },
  });

  return teams;
});

export type OurTeamType = Pick<
  IAdmin,
  | "firstName"
  | "lastName"
  | "about"
  | "jobTitle"
  | "primaryImage"
  | "secondaryImage"
  | "socials"
  | "email"
>;

const title = "Meet Our Team";
const description =
  "Our team of professionals will adequately guide you through your study application journey.";

export async function generateMetadata(): Promise<Metadata> {
  const teams = await getOurTeam();

  const ceo = teams[0];
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/team",
    },
    openGraph: {
      ...sharedMetadata.openGraph,
      title,
      description,
      images: [
        {
          url: ceo?.primaryImage.url,
          width: 1200,
          height: 630,
          alt: `${env.organization.name} CEO's picture`,
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      title,
      description,
      images: {
        url: ceo?.primaryImage.url,
        alt: `${env.organization.name} CEO's picture`,
      },
    },
  } as Metadata;
}

export default async function OurTeamPage() {
  try {
    const teams = await getOurTeam();

    const ourTeamPageJsonLd: WithContext<WebPage> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${env.client.baseUrl}/team`,
      reviewedBy: organization,
      mainEntity: {
        "@type": "AboutPage",
        mainEntity: teams.map((team) => ({
          "@type": "Person",
          name: `${team.firstName} ${team.lastName}`,
          jobTitle: team.jobTitle,
          image: team.primaryImage.url,
          email: team.email,
          sameAs: team.socials?.map((social) => social.url),
        })),
      },
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ourTeamPageJsonLd),
          }}
        />
        <CustomBreadCrumb className="border-y" />
        <OurTeam teams={teams} />
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
