import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import SchoolList from "./_components/school-list";

export default async function SchoolsPage() {
  return (
    <HasPermission
      resourceName="schools"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <SchoolList />
    </HasPermission>
  );
}
