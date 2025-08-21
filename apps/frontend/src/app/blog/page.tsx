export const dynamic = "force-dynamic";

import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { sharedMetadata } from "@/src/utils";
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
};

export default async function Blogs({ searchParams }: Props) {
  try {
    const { page, limit, c } = await searchParams;
    const urlQuery = brandServerApi.utils.constructQuery({
      page: page || null,
      limit: limit || null,
      c: c || null,
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
        >
          <small
            className="border-1 absolute left-1/2 top-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border-transparent bg-clip-padding px-3 py-1.5 text-white backdrop-blur md:top-40"
            style={{
              borderImage:
                "linear-gradient(90deg, rgb(255 255 255 / 2%) 0%, rgb(240 240 240 / 9%) 40%, rgb(255 255 255 / 0%) 100%) 1 / 1 / 0 stretch",
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(173,216,230,0.10) 100%)",
              clipPath: "border-box",
            }}
          >
            <SparklesIcon size={14} /> Your gateway to global education.
          </small>
          <div className="mx-auto mt-6 max-w-lg space-y-3 text-center md:max-w-sm">
            <p>Join to our newsletter</p>
            <NewsLetterForm label="Join" />
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
