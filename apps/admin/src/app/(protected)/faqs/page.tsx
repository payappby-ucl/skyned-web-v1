import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import FaqList from "./_components/faq-list";

export default async function FaqsPage() {
  return (
    <HasPermission
      resourceName="faqs"
      action="list"
      args={[]}
      alert={<Alert />}
    >
      <FaqList />
    </HasPermission>
  );
}
