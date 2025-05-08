import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";

export default async function AdminsPage() {
  return (
    <HasPermission
      resourceName="admins"
      action="list"
      args={[]}
      alert={<Alert />}
    >
      <div>Admins page</div>
    </HasPermission>
  );
}
