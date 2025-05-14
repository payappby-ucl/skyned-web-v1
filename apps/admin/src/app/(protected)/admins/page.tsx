import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import AdminList from "./_components/admin-list";

export default async function AdminsPage() {
  return (
    <HasPermission
      resourceName="admins"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <AdminList />
    </HasPermission>
  );
}
