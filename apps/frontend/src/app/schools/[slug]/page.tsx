import CustomBreadCrumb from "@/src/components/custom-bredcrumb"
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { organization, sharedMetadata } from "@/src/utils";
import { ISchool } from "@workspace/shared";
import { Metadata } from "next";
import Script from "next/script";
import { cache } from "react";
import { BlogPosting, WithContext } from "schema-dts";
import DateDisplay from "@/src/components/date-display";
import Alert from "@/src/components/alert";
import Jumbotron from "../../_components/jumbotron";

type Props = {
  params: Promise<{ slug: string }>;
};

const getSchool = cache(async (slug: string) => {
  const { data: school } = await brandServerApi.httpClient.request<ISchool>(
    `/schools/${slug}`,
    "GET",
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return school;
});

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const school = await getSchool(slug);

  return {
    ...sharedMetadata,
    title: school.name,
    description: school.overview,
    alternates: {
      canonical: `/schools/${school.slug}`,
    },
    keywords: school.name.split(" "),
    openGraph: {
      ...sharedMetadata.openGraph,
      images: [
        {
          url: school.schoolImage.url,
          width: 1200,
          height: 630,
          alt: "School image",
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      images: {
        url: school.schoolImage.url,
        alt: `School image for ${school.name}`,
      },
    },
  } as Metadata;
}

export default async function SchoolDetails({ params }: Props) {
  try {
    const { slug } = await params;
    const school = await getSchool(slug);

    const blogPostJsonLd: WithContext<BlogPosting> = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: school.name,
      description: school.overview,
      image: school.schoolImage.url,
      url: `${env.client.baseUrl}/schools/${school.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://example.com/blog/my-awesome-post",
      },
      publisher: organization,
      dateModified: `${school.updatedAt}`,
      datePublished: `${school.createdAt}`,
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
        />

        <Jumbotron
          title={school.name}
          subtitle={school.address}
          backgroundImage={
            school.schoolImage.url || "/assets/images/backgrounds/school-bg.png"
          }
          overlay
        />

        <CustomBreadCrumb className="border-y"/>

        <section>
          <div
            dangerouslySetInnerHTML={{ __html: school.overview }}
            className="wysiwyg-view"
          />
          <div className="flex items-center gap-2">
            <p className="text-xs">Last Updated</p>
            <DateDisplay date={school.updatedAt} />
          </div>
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
