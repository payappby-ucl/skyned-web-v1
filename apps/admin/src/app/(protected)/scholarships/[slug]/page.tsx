import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IScholarship } from "@workspace/shared";
import { redirect } from "next/navigation";
import UpdateScholarshipForm from "./_components/form";

export default async function BlogEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const { data: scholarship } =
      await brandServerApi.httpClient.request<IScholarship>(
        `/scholarships/${slug}`,
        "GET",
        {
          next: {
            tags: [`${serverCacheTags.scholarships}-${slug}`],
          },
        },
      );

    if (!scholarship) {
      redirect("/");
    }

    return (
      <HasPermission
        resourceName="scholarships"
        action="read"
        secondaryComponent={<Alert />}
        args={[scholarship]}
        redirect
      >
        <div className="space-y-5">
          <div className="space-y-1 border-b pb-3">
            <h1 className="!text-2xl">Edit Scholarship</h1>
            <p className="text-muted-foreground text-sm">
              Edit {scholarship.title}
            </p>
          </div>
          <UpdateScholarshipForm scholarship={scholarship} />
        </div>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
