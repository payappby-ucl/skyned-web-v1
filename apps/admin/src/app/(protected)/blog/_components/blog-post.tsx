"use client";

import HasPermission from "@/src/components/has-permission";
import Profile from "@/src/components/profile";
import { brandClientApi } from "@/src/lib/client";
import { IAdmin, IBlogPost } from "@workspace/shared";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  post: IBlogPost;
}
const BlogPost: React.FC<Props> = ({ post }) => {
  return (
    <article className="space-y-2 overflow-hidden">
      <Image
        src={post.coverImage.url}
        width={200}
        height={200}
        alt={post.title}
        className="w-full rounded-2xl"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="font-semibold uppercase">
            {post.status}
          </Badge>

          {post.featured ? (
            <Badge variant="secondary" className="font-bold uppercase">
              Featured
            </Badge>
          ) : null}
        </div>

        <p className="font-regular text-xs">
          {brandClientApi.date.formatDate(
            post.publishedAt || post.createdAt,
            "DD MMMM YYYY",
          )}
        </p>
      </div>
      <h2 className="!text-xl">{post.title}</h2>
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
      <div className="flex items-center justify-between">
        <HasPermission
          resourceName="admins"
          action="read"
          args={[post.author as IAdmin]}
          secondaryComponent={<Profile {...post.author!} disabled />}
        >
          <Profile {...post.author!} />
        </HasPermission>

        <HasPermission
          resourceName="blogs"
          action="update"
          args={[{} as any, post]}
        >
          <Button asChild size="icon" variant="ghost">
            <Link href={`/blog/${post.slug}`} aria-label="Link to edit post">
              <SquarePen />
            </Link>
          </Button>
        </HasPermission>
      </div>
    </article>
  );
};

export default BlogPost;
