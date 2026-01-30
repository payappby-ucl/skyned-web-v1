import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import FinancialAidsList from "./_components/financial-aids-list";

export default async function FinancialAidsPage() {
  return (
    <HasPermission
      resourceName="loans"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <FinancialAidsList />
    </HasPermission>
  );
}
