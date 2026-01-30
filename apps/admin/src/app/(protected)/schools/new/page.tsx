import HasPermission from "@/src/components/has-permission";
import CreateSchoolForm from "../_components/form";

export default async function CreateSchoolPage() {
  return (
    <HasPermission
      resourceName="schools"
      action="create"
      args={[{} as any]}
      redirect
    >
      <div className="space-y-5">
        <div className="space-y-1 border-b pb-3">
          <h1 className="!text-2xl">Create School</h1>
          <p className="text-muted-foreground text-sm">
            Create a new school profile
          </p>
        </div>
        <CreateSchoolForm />
      </div>
    </HasPermission>
  );
}
