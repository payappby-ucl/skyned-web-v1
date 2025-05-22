import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { ISchool } from "@workspace/shared";
import { redirect } from "next/navigation";
import EditSchoolForm from "../../_components/edit-form";

export default async function EditSchoolPage({
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
        resourceName="schools"
        action="update"
        secondaryComponent={<Alert />}
        args={[{} as any, school]}
        redirect
      >
        <div className="space-y-5">
          <div className="space-y-1 border-b pb-3">
            <h1 className="!text-2xl">{school.name}</h1>
            <p className="text-muted-foreground text-sm">
              Update {school.name}'s profile
            </p>
          </div>

          <EditSchoolForm school={school} />
        </div>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
