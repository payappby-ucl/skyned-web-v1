import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IBlogPost } from "@workspace/shared";
import { redirect } from "next/navigation";
import EditBlogForm from "./_components/form";

export default async function BlogEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const { data: post } = await brandServerApi.httpClient.request<IBlogPost>(
      `/blogs/${slug}`,
      "GET",
      {
        next: {
          tags: [`${serverCacheTags.blogs}-blogs-${slug}`],
        },
      },
    );

    if (!post) {
      redirect("/");
    }

    return (
      <HasPermission
        resourceName="blogs"
        action="read"
        secondaryComponent={<Alert />}
        args={[post]}
        redirect
      >
        <div className="space-y-5">
          <div className="space-y-1 border-b pb-3">
            <h1 className="!text-2xl">Edit Post</h1>
            <p className="text-muted-foreground text-sm">Edit {post.title}</p>
          </div>
          <EditBlogForm post={post} />
        </div>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
