import HasPermission from "@/src/components/has-permission";
import AdminForm from "../_components/form";

export default async function CreateAdminPage() {
  return (
    <HasPermission resourceName="admins" action="create" args={[{} as any]}>
      <div>
        <div className="space-y-1 border-b pb-3">
          <h1 className="!text-2xl">Create Account</h1>
          <p className="text-muted-foreground text-sm">
            Create an account for a staff
          </p>
        </div>
        <AdminForm />
      </div>
    </HasPermission>
  );
}
