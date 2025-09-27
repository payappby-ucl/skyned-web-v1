// export const dynamic = "force-dynamic";

import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { organization, sharedMetadata } from "@/src/utils";
import { IScholarship } from "@workspace/shared";
import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { cache } from "react";
import { CreativeWork, WithContext } from "schema-dts";
import DateDisplay from "@/src/components/date-display";
import Alert from "@/src/components/alert";
import { Badge } from "@workspace/ui/components/badge";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { SocialShare } from "@/src/components/social-share";

type Props = {
  params: Promise<{ slug: string }>;
};

const getScholarship = cache(async (slug: string) => {
  const { data: scholarship } =
    await brandServerApi.httpClient.request<IScholarship>(
      `/scholarships/${slug}`,
      "GET",
      {
        next: {
          revalidate: 86400,
        },
      },
    );

  return scholarship;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getScholarship(slug);

  return {
    ...sharedMetadata,
    title: post.title,
    description: post.overview,
    alternates: {
      canonical: `/scholarships/${post.slug}`,
    },
    keywords: [],
    openGraph: {
      ...sharedMetadata.openGraph,
      title: post.title,
      description: post.overview,
      images: [
        {
          url: post.banner.url,
          width: 1200,
          height: 630,
          alt: "Scholarship post thumbnail",
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      title: post.title,
      description: post.overview,
      images: {
        url: post.banner.url,
        alt: "Scholarship post thumbnail",
      },
    },
  } as Metadata;
}

export default async function Post({ params }: Props) {
  try {
    const { slug } = await params;
    const post = await getScholarship(slug);

    const scholarshipPostJsonLd: WithContext<CreativeWork> = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: post.title,
      description: post.overview,
      image: post.banner.url,
      url: `${env.client.baseUrl}/scholarships/${post.slug}`,
      provider: organization,
      about: {
        "@type": "Thing",
        name: post.subtitle,
      },
      audience: {
        "@type": "Audience",
        audienceType: "Students",
      },
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(scholarshipPostJsonLd),
          }}
        />

        <section className="space-y-5">
          <CustomBreadCrumb className="border-y" />
          <article className="grid grid-cols-1 gap-8 space-y-10 md:grid-cols-3">
            <div className="space-y-10 md:col-span-2">
              <div className="space-y-4">
                <Image
                  src={post.banner.url}
                  width={200}
                  height={200}
                  alt={post.title}
                  className={`w-full rounded-2xl`}
                />
                <div className="flex items-start justify-between">
                  <header>
                    <h1 className="md:leading-13 !text-2xl md:!text-5xl">
                      {post.title}
                    </h1>
                    <p className="text-muted-foreground">{post.subtitle}</p>
                  </header>

                  <Badge variant="outline" className="capitalize">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <div>{post.overview}</div>

              <div className="space-y-10 rounded-lg border p-5">
                <h2 className="text-2xl">About this scholarship</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: post.description }}
                  className="wysiwyg-view"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-5 rounded-lg border p-5">
                <div>
                  <header className="flex items-center gap-2">
                    <CircleCheckBig />
                    <h2 className="text-lg">Eligibility Requirements</h2>
                  </header>
                  <p className="text-muted-foreground text-sm">
                    Make sure you meet these criteria before applying
                  </p>
                </div>

                <div className="space-y-2">
                  {post.eligibilityRequirements.map((requirement) => (
                    <div className="flex items-center gap-2" key={requirement}>
                      <CircleCheckBig
                        size={20}
                        // className="text-muted-foreground"
                      />
                      <p className="flex-1 text-sm">{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5 rounded-lg border p-5">
                <div>
                  <h2 className="text-lg">Share this scholarship</h2>
                  <p className="text-muted-foreground text-sm">
                    Help other discover this opportunity
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <SocialShare
                    title={`Check out ${post.title}`}
                    text={`Scholarship Opportunity at ${env.organization.name}`}
                    url={`${env.client.baseUrl}/scholarships/${post.slug}`}
                    context="Scholarship"
                    imageUrl={`${post.banner.url || env.client.baseUrl + "/assets/images/brand/logo.png"}`}
                  />
                </div>
              </div>
            </div>
          </article>
          <div className="flex items-center gap-2">
            <p className="text-xs">Last Updated</p>
            <DateDisplay date={post.updatedAt} />
          </div>
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
