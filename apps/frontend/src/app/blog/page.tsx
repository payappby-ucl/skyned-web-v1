import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { sharedMetadata } from "@/src/utils";
import { IBlogPost, IPaginatedResponse } from "@workspace/shared";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Script from "next/script";
import { WithContext, Blog } from "schema-dts";
import { LatestPosts } from "./_components/latest-posts";
import { Badge } from "@workspace/ui/components/badge";
import NewsLetterForm from "@/src/components/footer/news-letter-form";
import { FeaturedBlogPosts } from "./_components/featured";

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
        revalidate: 3600,
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
        <CustomBreadCrumb className="border-y" />
        <section className="space-y-20">
          <header className="mx-auto max-w-lg space-y-3 text-center">
            <Badge variant="outline">Your gateway to global education.</Badge>
            <h1>Browser Our Blog</h1>
            <p>
              Stay informed with insights, scholarship updates, and expert
              advice tailored for students chasing international opportunities.
            </p>
          </header>
          <div className="mx-auto max-w-lg space-y-3 text-center md:max-w-sm">
            <p>Join to our newsletter</p>
            <NewsLetterForm label="Join" />
          </div>
          <FeaturedBlogPosts />
          <LatestPosts data={data} searchParams={urlQuery} />
        </section>
      </>
    );
  } catch (error) {
    console.log(error);
    redirect("/");
  }
}
