import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Script from "next/script";
import { ItemList, ListItem, WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";
import { brandServerApi } from "@/src/lib/server";
import { IPaginatedResponse, ISchool } from "@workspace/shared";
import Alert from "@/src/components/alert";
import { SchoolList } from "./_components/list";

type Props = {
  searchParams: Promise<{ page?: string; limit?: string; c?: string }>;
};

const title = "Schools";
const description =
  "Search for schools and universities in the UK, USA, Canada, Australia, and Europe.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/schools",
  },
  keywords: [
    ...new Set([
      ...(sharedMetadata.keywords || []),
      "schools",
      "programs",
      "apply",
      "study",
      "study abroad",
    ]),
  ],
  openGraph: {
    ...sharedMetadata.openGraph,
    images: [
      {
        url: `${env.client.baseUrl}/assets/images/backgrounds/school-bg.png`,
        width: 1200,
        height: 630,
        alt: `${env.organization.name} - International Study Application Support`,
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    images: {
      url: `${env.client.baseUrl}/assets/images/backgrounds/school-bg.png`,
      alt: `Our partner schools`,
    },
  },
};

export default async function Schools({ searchParams }: Props) {
  try {
    const { page, limit, c } = await searchParams;
    const urlQuery = brandServerApi.utils.constructQuery({
      page: page || null,
      limit: limit || null,
      c: c || null,
    });

    const urlConstruct = `/schools?${urlQuery.toString()}`;

    const { data } = await brandServerApi.httpClient.request<
      IPaginatedResponse<ISchool>
    >(urlConstruct, "GET", {
      next: {
        revalidate: 86400,
      },
    });

    console.log(data);

    const schoolsPageJsonLd: WithContext<ItemList> = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Partner Schools",
      description,
      url: `${env.client.baseUrl}/schools`,
      numberOfItems: data.total,
      itemListElement: data.data.map((school, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${env.client.baseUrl}/schools/${school.slug}`,
        item: {
          "@type": "School",
          name: school.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: school.address,
            addressLocality: school.city,
            addressRegion: school.state,
            addressCountry: school.country,
          },
        },
      })),
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schoolsPageJsonLd),
          }}
        />

        <Jumbotron
          title="Our Partner Schools"
          subtitle="Explore our network of partner schools and universities across the UK, USA, Canada, Australia, and Europe. Discover the right institution for your academic journey."
          backgroundImage="/assets/images/backgrounds/school-bg.png"
        />

        <section className="bg-accent space-y-10">
          {/* Partner schools list or grid goes here */}
          <SchoolList data={data} searchParams={urlQuery} />
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
