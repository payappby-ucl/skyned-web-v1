import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";

export default async function ScholarshipsPage() {
  return (
    <HasPermission
      resourceName="scholarships"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <div>Hello</div>
    </HasPermission>
  );
}
