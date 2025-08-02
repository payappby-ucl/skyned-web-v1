"use client";

import HasPermission from "@/src/components/has-permission";
import Profile from "@/src/components/profile";
import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAdmin, IBlogPost } from "@workspace/shared";
import { ActionAlert } from "@workspace/ui/components/action-alert";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { deleteBlogPost } from "../_actions";

interface Props {
  post: IBlogPost;
}
const BlogPost: React.FC<Props> = ({ post }) => {
  const queryClient = useQueryClient();
  const deleteBlogMutation = useMutation({
    mutationFn: async () => {
      try {
        brandClientApi.utils.toast.promise(
          async () => {
            const res = await deleteBlogPost(post.slug);
            const resData =
              brandClientApi.utils.handleServerActionResponse(res);
            return resData;
          },
          {
            loading: "Deleting...",
            success(data) {
              queryClient.invalidateQueries({
                queryKey: ["blogs"],
              });
              return data.message;
            },
            error(error) {
              return brandClientApi.utils.handleError(error);
            },
          },
        );
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    },
  });

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

        <div className="flex items-center gap-1">
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

          <HasPermission resourceName="blogs" action="delete" args={[post]}>
            <ActionAlert
              title="Delete Post"
              description="This action cannot be reversed"
              action={deleteBlogMutation.mutate}
              actionText="Delete"
              Icon={<Trash2 className="text-destructive" />}
            />
          </HasPermission>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
