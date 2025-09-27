export const dynamic = "force-dynamic";

import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { DEFAULT_PAGINATION_LIMIT, sharedMetadata } from "@/src/utils";
import { IBlogPost, IPaginatedResponse } from "@workspace/shared";
import { Metadata } from "next";
import Script from "next/script";
import { WithContext, Blog } from "schema-dts";
import { LatestPosts } from "./_components/latest-posts";
import NewsLetterForm from "@/src/components/footer/news-letter-form";
import { FeaturedBlogPosts } from "./_components/featured";
import Alert from "@/src/components/alert";
import Jumbotron from "../_components/jumbotron";
import { SparklesIcon } from "lucide-react";

type Props = {
  searchParams: Promise<{ page?: string; limit?: string; c?: string }>;
};

const title = "Blog";
const description =
  "Get latest news on travels, schools, programs, loans, scholarships, visas.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  keywords: [...(sharedMetadata.keywords || []), "Blog"],
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

export default async function Blogs({ searchParams }: Props) {
  try {
    const { page, limit, c } = await searchParams;
    const urlQuery = brandServerApi.utils.constructQuery({
      page: page || "1",
      limit: limit || `${DEFAULT_PAGINATION_LIMIT}`,
      c: c || null /** c stands for category */,
    });

    const urlConstruct = `/blogs?${urlQuery.toString()}`;

    const { data } = await brandServerApi.httpClient.request<
      IPaginatedResponse<IBlogPost>
    >(urlConstruct, "GET", {
      next: {
        revalidate: 86400,
      },
    });

    const blogPageJsonLd: WithContext<Blog> = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: title,
      description,
      url: `${env.client.baseUrl}/blog`,
      blogPost: data.data.map((blog) => ({
        "@type": "BlogPosting",
        headline: blog.title,
        url: `${env.client.baseUrl}/blog/${blog.slug}`,
        dateCreated: `${blog.createdAt}`,
        dateModified: `${blog.updatedAt}`,
        datePublished: `${blog.publishedAt}`,
        author: {
          "@type": "Person",
          name: `${blog.author?.firstName} ${blog.author?.lastName}`,
          image: blog.author?.primaryImage.url,
        },
        image: blog.coverImage.url,
        description: blog.excerpt,
      })),
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPageJsonLd),
          }}
        />
        <Jumbotron
          title="Browse Our Blog"
          subtitle="Stay informed with insights, scholarship updates, and expert advice tailored for students chasing international opportunities."
          backgroundImage="/assets/images/backgrounds/blog-bg.png"
          badge={{
            icon: SparklesIcon,
            text: "Your gateway to global education.",
          }}
        >
          <div className="mx-auto mt-6 max-w-lg space-y-3 text-center md:max-w-sm">
            <NewsLetterForm label="Join Newsletter" />
          </div>
        </Jumbotron>
        <CustomBreadCrumb className="border-y" />
        <section className="bg-accent space-y-10">
          <FeaturedBlogPosts />
          <LatestPosts data={data} searchParams={urlQuery} />
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
