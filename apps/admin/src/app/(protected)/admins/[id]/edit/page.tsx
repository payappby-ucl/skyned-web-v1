import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IAdmin } from "@workspace/shared";
import { redirect } from "next/navigation";
import AdminUpdateFrom from "../../_components/edit-form";

export default async function EditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const { data: admin } = await brandServerApi.httpClient.request<IAdmin>(
      `/admins/${id}`,
      "GET",
      {
        next: {
          tags: [`${serverCacheTags.admins}-id-${id}`],
        },
      },
    );

    if (!admin) {
      redirect("/");
    }

    return (
      <HasPermission
        resourceName="admins"
        action="update"
        secondaryComponent={<Alert />}
        args={[{} as any, admin]}
        redirect
      >
        <div>
          <div className="space-y-1 border-b pb-3">
            <h1 className="!text-2xl">Update Profile</h1>
            <p className="text-muted-foreground text-sm">
              Update {admin.firstName} {admin.lastName}'s profile
            </p>
          </div>
          <AdminUpdateFrom admin={admin} />
        </div>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
