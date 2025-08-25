import Alert from "@/src/components/alert";
import { env } from "@/src/config";
import { DEFAULT_PAGINATION_LIMIT, sharedMetadata } from "@/src/utils";
import Jumbotron from "../_components/jumbotron";
import { Metadata } from "next";
import Script from "next/script";
import { brandServerApi } from "@/src/lib/server";
import { IPaginatedResponse, IProgram } from "@workspace/shared";
import { ItemList, WithContext } from "schema-dts";
import ProgramList from "./_components/list";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";

type Props = {
  searchParams: Promise<{ term?: string; country?: string }>;
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
    const { term, country } = await searchParams;
    const urlQuery = brandServerApi.utils.constructQuery({
      page: "1",
      limit: `${DEFAULT_PAGINATION_LIMIT}`,
      term: term || null,
      country: country || null,
    });

    console.log(urlQuery.toString());
    const urlConstruct = `/programs?${urlQuery.toString()}`;
    const { data } = await brandServerApi.httpClient.request<
      IPaginatedResponse<IProgram>
    >(urlConstruct, "GET", {
      next: {
        tags: [urlConstruct],
      },
    });

    const searchPageJsonLd: WithContext<ItemList> = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Programs",
      description,
      url: `${env.client.baseUrl}/search`,
      numberOfItems: data.data.length,
      itemListElement: data.data.map((program, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${env.client.baseUrl}/schools/${program.school?.slug}/programs/${program.slug}`,
        item: {
          "@type": "EducationalOccupationalProgram",
          "@id": `${env.client.baseUrl}/schools/${program.school?.slug}/programs/${program.slug}`,
          name: program.name,
          description: program.overview,
          timeToComplete: `${program.duration} ${program.timeframe}`,
          provider: {
            "@type": "CollegeOrUniversity",
            name: program.school?.name,
            description: program.school?.overview,
            image: program.school?.schoolImage.url,
            url: `${env.client.baseUrl}/schools/${program.school?.slug}`,
            logo: program.school?.logo.url,
            address: {
              "@type": "PostalAddress",
              streetAddress: program.school?.address,
              addressLocality: program.school?.city,
              addressRegion: program.school?.state,
              addressCountry: program.school?.country,
            },
            sameAs: [program.school!.link],
          },
        },
      })),
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchPageJsonLd),
          }}
        />

        <Jumbotron
          title={title}
          subtitle={description}
          backgroundImage="/assets/images/backgrounds/school-bg.png"
        />

        <CustomBreadCrumb className="border-y" />
        <section className="!py-10" id="programs-list">
          {/* Programs list */}
          <ProgramList data={data} searchParams={urlQuery} />
        </section>
      </>
    );
  } catch (error) {
    <Alert message="Error" />;
  }
}
