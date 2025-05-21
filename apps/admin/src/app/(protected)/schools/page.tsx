import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";

export default async function SchoolsPage() {
  return (
    <HasPermission
      resourceName="schools"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <p>Schools Page</p>
    </HasPermission>
  );
}
