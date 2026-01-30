import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import InquiryList from "./_components/inquiry-list";

export default async function InquiriesPage() {
  return (
    <HasPermission
      resourceName="inquiries"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <InquiryList />
    </HasPermission>
  );
}
