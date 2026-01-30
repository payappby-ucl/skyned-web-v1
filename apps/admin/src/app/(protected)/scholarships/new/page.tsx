import HasPermission from "@/src/components/has-permission";
import CreateScholarshipForm from "../_components/create-scholarship-form";

export default async function CreateScholarshipPage() {
  return (
    <HasPermission
      resourceName="scholarships"
      action="create"
      args={[{} as any]}
      redirect
    >
      <div className="space-y-5">
        <div className="space-y-1 border-b pb-3">
          <h1 className="!text-2xl">Create Scholarship</h1>
          <p className="text-muted-foreground text-sm">
            Create a new scholarship
          </p>
        </div>
        <CreateScholarshipForm />
      </div>
    </HasPermission>
  );
}
