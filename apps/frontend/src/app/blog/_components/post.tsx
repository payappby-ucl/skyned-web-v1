"use client";

import { brandClientApi } from "@/src/lib/client";
import { IBlogPost } from "@workspace/shared";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Profile from "@/src/components/profile";
import { Badge } from "@workspace/ui/components/badge";

interface Props {
  post: IBlogPost;
  col?: boolean;
}
const BlogPost: React.FC<Props> = ({ post, col }) => (
  <Link href={`/blog/${post.slug}`} arial-label={`Link to ${post.title} page`}>
    <article
      className={`space-y-2 overflow-hidden ${col ? "grid grid-cols-1 gap-5 md:grid-cols-3" : ""}`}
    >
      <Image
        src={post.coverImage.url}
        width={200}
        height={200}
        alt={post.title}
        className={`w-full rounded-2xl ${col ? "h-full object-cover md:col-span-1" : ""}`}
      />
      <div className={`space-y-2 md:col-span-2`}>
        <header className="space-y-2">
          <time
            dateTime={brandClientApi.date.formatDate(
              post.publishedAt || post.createdAt,
              "YYYY-MM-DD",
            )}
            className="font-regular text-xs"
          >
            {brandClientApi.date.formatDate(
              post.publishedAt || post.createdAt,
              "DD MMMM YYYY",
            )}
          </time>

          <h3 className="!text-xl">{post.title}</h3>
        </header>
        {post.categories.length ? (
          <div className="flex items-center gap-1">
            {post.categories.map((category) => (
              <Badge key={category.name} className="capitalize">
                {category.name}
              </Badge>
            ))}
          </div>
        ) : null}
        <p className="text-sm">{post.excerpt}</p>

        <Profile {...post.author!} />
      </div>
    </article>
  </Link>
);

export default BlogPost;
