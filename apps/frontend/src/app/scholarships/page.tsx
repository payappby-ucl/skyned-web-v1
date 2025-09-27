import Script from "next/script";
import Jumbotron from "../_components/jumbotron";
import ScholarshipList from "./_components/list";
import {
  sharedMetadata,
  organization,
  DEFAULT_PAGINATION_LIMIT,
  serverCacheTags,
} from "@/src/utils";
import { Metadata } from "next";
import { WithContext, WebPage } from "schema-dts";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { IPaginatedResponse, IScholarship } from "@workspace/shared";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const title = "Scholarships";
const description =
  "We offer scholarships across multiple categories to support different aspects of your educational journey.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/scholarships",
  },
  keywords: [
    ...(sharedMetadata.keywords || []),
    "Scholarships",
    "Housing",
    "Application Fee",
    "Others",
    "Waiver",
  ],
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    description,
  },
  twitter: {
    ...sharedMetadata.twitter,
    title,
    description,
  },
};

export default async function ScholarshipsPage({ searchParams }: Props) {
  const { page, limit, ...rest } = await searchParams;
  const urlQuery = brandServerApi.utils.constructQuery({
    page: page || "1",
    limit: limit || `${DEFAULT_PAGINATION_LIMIT}`,
    ...rest,
  });

  const urlConstruct = `/scholarships?${urlQuery.toString()}`;

  const { data } = await brandServerApi.httpClient.request<
    IPaginatedResponse<IScholarship>
  >(urlConstruct, "GET", {
    next: {
      tags: [serverCacheTags.scholarships],
    },
  });

  const scholarshipPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/scholarships`,
    reviewedBy: organization,
    mainEntity: (data || []).data.map((scholarship) => ({
      "@type": "CreativeWork",
      name: scholarship.title,
      url: `${env.client.baseUrl}/scholarships/${scholarship.slug}`,
      description: scholarship.overview,
      about: {
        "@type": "Thing",
        name: scholarship.subtitle,
      },
      audience: {
        "@type": "Audience",
        audienceType: "Students",
      },
    })),
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(scholarshipPageJsonLd),
        }}
      />

      <Jumbotron
        title={title}
        subtitle={description}
        backgroundImage="/assets/images/backgrounds/infohub-bg.png"
      />
      <CustomBreadCrumb className="border-y" />
      <section className="space-y-10">
        <ScholarshipList searchParams={urlQuery} data={data} />
      </section>
    </>
  );
}
