// export const dynamic = "force-dynamic";

import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import Profile from "@/src/components/profile";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { organization, sharedMetadata } from "@/src/utils";
import { IBlogPost } from "@workspace/shared";
import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { cache } from "react";
import { BlogPosting, WithContext } from "schema-dts";
import DateDisplay from "@/src/components/date-display";
import RelatedPosts from "./_components/related-posts";
import Alert from "@/src/components/alert";

type Props = {
  params: Promise<{ slug: string }>;
};

const getBlogPost = cache(async (slug: string) => {
  const { data: blogPost } = await brandServerApi.httpClient.request<IBlogPost>(
    `/blogs/${slug}`,
    "GET",
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return blogPost;
});

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return {
    ...sharedMetadata,
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: post.categories.map((category) => category.name),
    openGraph: {
      ...sharedMetadata.openGraph,
      images: [
        {
          url: post.coverImage.url,
          width: 1200,
          height: 630,
          alt: "Blog post thumbnail",
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      images: {
        url: post.coverImage.url,
        alt: `Blog post thumbnail`,
      },
    },
  } as Metadata;
}

export default async function Post({ params }: Props) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    const blogPostJsonLd: WithContext<BlogPosting> = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage.url,
      url: `${env.client.baseUrl}/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://example.com/blog/my-awesome-post",
      },
      author: {
        "@type": "Person",
        name: `${post.author?.firstName} ${post.author?.lastName}`,
        image: post.author?.primaryImage.url,
      },
      publisher: organization,
      dateModified: `${post.updatedAt}`,
      datePublished: `${post.publishedAt}`,
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
        />

        <CustomBreadCrumb className="border-y" />
        <section className="mx-auto max-w-6xl space-y-10">
          <section className="space-y-10 !p-0">
            <header className="space-y-5">
              <h1 className="md:leading-13 !text-2xl md:!text-5xl">
                {post.title}
              </h1>
              <p>{post.excerpt}</p>
              <Profile {...post.author!} />
            </header>
            <Image
              src={post.coverImage.url}
              width={200}
              height={200}
              alt={post.title}
              className={`w-full rounded-2xl`}
            />
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="wysiwyg-view"
            />
            <div className="flex items-center gap-2">
              <p className="text-xs">Last Updated</p>
              <DateDisplay date={post.updatedAt} />
            </div>
          </section>
          <RelatedPosts categories={post.categories} />
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
