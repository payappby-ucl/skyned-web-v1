import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { sharedMetadata } from "@/src/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";

const getBlogPosts = cache(async () => {
  const { data: teams } = await brandServerApi.httpClient.request<
    OurTeamType[]
  >("/our-team", "GET", {
    next: {
      revalidate: 86400,
    },
  });

  return teams;
});

const title = "Blog";
const description =
  "Get latest news on travels, schools, programs, loans, scholarships, visas.";

export async function generateMetadata() {
  const teams = await getOurTeam();

  const ceo = teams[0];
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      ...sharedMetadata.openGraph,
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
      images: {
        url: ceo?.primaryImage.url,
        alt: `${env.organization.name} CEO's picture`,
      },
    },
  } as Metadata;
}

export async function Blog() {
  try {
  } catch (error) {
    redirect("/");
  }
}
