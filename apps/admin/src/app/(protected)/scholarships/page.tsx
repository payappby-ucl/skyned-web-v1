import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import ScholarshipList from "./_components/list";

export default async function ScholarshipsPage() {
  return (
    <HasPermission
      resourceName="scholarships"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <ScholarshipList />
    </HasPermission>
  );
}
