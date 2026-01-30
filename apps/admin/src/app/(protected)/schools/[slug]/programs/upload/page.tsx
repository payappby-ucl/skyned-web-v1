import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { ISchool } from "@workspace/shared";
import { redirect } from "next/navigation";
import UploadForm from "./_components/upload-form";

export default async function UploadBulkProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const { data: school } = await brandServerApi.httpClient.request<ISchool>(
      `/schools/${slug}`,
      "GET",
      {
        next: {
          tags: [`${serverCacheTags.schools}-slug-${slug}`],
        },
      },
    );

    if (!school) {
      redirect("/");
    }

    return (
      <HasPermission
        resourceName="programs"
        action="create"
        args={[{} as any]}
        redirect
      >
        <section className="h-full space-y-5 !p-0">
          <div className="space-y-1 border-b pb-3">
            <h1 className="!text-2xl">Bulk Program upload for {school.name}</h1>
            <p className="text-muted-foreground text-sm">Upload Programs</p>
          </div>
          <UploadForm school={school} />
        </section>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
