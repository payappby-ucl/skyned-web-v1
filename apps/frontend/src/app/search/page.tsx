import Alert from "@/src/components/alert";
import { env } from "@/src/config";
import { DEFAULT_PAGINATION_LIMIT, sharedMetadata } from "@/src/utils";
import Jumbotron from "../_components/jumbotron";
import { Metadata } from "next";
import Script from "next/script";
import { brandServerApi } from "@/src/lib/server";
import { IPaginatedResponse } from "@workspace/shared";

type Props = {
  searchParams: Promise<{ page?: string; limit?: string; c?: string }>;
};

const title = "Search Programs";
const description =
  "Explore our network of partner schools and universities across the UK, USA, Canada, Australia, and Europe. Discover the right institution for your academic journey.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/search",
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
        alt: title,
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    images: {
      url: `${env.client.baseUrl}/assets/images/backgrounds/school-bg.png`,
      alt: title,
    },
  },
};
export default async function SearchPage({ searchParams }: Props) {
  try {
    // TODO: Implement search filters
    const { page, limit } = await searchParams;
    const urlQuery = brandServerApi.utils.constructQuery({
      page: page || "1",
      limit: limit || `${DEFAULT_PAGINATION_LIMIT}`,
    });

    // const urlConstruct = `/schools?${urlQuery.toString()}`;

    // const { data } = await brandServerApi.httpClient.request<
    //   IPaginatedResponse<ISchool>
    // >(urlConstruct, "GET", {
    //   next: {
    //     revalidate: 86400,
    //   },
    // });

    // const searchPageJsonLd: WithContext<ItemList> = {
    //   "@context": "https://schema.org",
    //   "@type": "ItemList",
    //   name: "Partner Schools",
    //   description,
    //   url: `${env.client.baseUrl}/schools`,
    //   numberOfItems: data.total,
    //   itemListElement: data.data.map((school, index) => ({
    //     "@type": "ListItem",
    //     position: index + 1,
    //     url: `${env.client.baseUrl}/schools/${school.slug}`,
    //     item: {
    //       "@type": "School",
    //       "@id": `${env.client.baseUrl}/schools/${school.slug}`,
    //       name: school.name,
    //       description: school.overview,
    //       image: school.schoolImage.url,
    //       url: `${env.client.baseUrl}/schools/${school.slug}`,
    //       logo: school.logo.url,
    //       address: {
    //         "@type": "PostalAddress",
    //         streetAddress: school.address,
    //         addressLocality: school.city,
    //         addressRegion: school.state,
    //         addressCountry: school.country,
    //       },
    //       sameAs: [school.link],
    //     },
    //   })),
    // };

    return (
      <>
        {/* <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchPageJsonLd),
          }}
        /> */}

        <section className="bg-accent space-y-10">
          {/* Partner schools list or grid goes here */}
          {/* <SchoolList data={data} searchParams={urlQuery} /> */}
        </section>
      </>
    );
  } catch (error) {
    <Alert message="Error" />;
  }
}
