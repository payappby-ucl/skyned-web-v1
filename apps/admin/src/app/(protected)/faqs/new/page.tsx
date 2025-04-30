import HasPermission from "@/src/components/has-permission";
import FaqForm from "../_components/faq-form";
import Alert from "@/src/components/alert";

export default async function CreateFaqPage() {
  return (
    <HasPermission
      resourceName="faqs"
      action="create"
      args={[{ question: "", answer: "" }]}
      alert={<Alert />}
    >
      <div className="space-y-5">
        <h1 className="text-center !text-2xl">Create FAQ</h1>
        <div className="mx-auto max-w-3xl">
          <FaqForm />
        </div>
      </div>
    </HasPermission>
  );
}
