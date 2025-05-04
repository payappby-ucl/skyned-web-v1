import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { IFaq } from "@workspace/shared";
import { redirect } from "next/navigation";
import FaqForm from "../_components/faq-form";
import { serverCacheTags } from "@/src/utils";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;

    const { data: faq } = await brandServerApi.httpClient.request<IFaq | null>(
      `/faq/${id}`,
      "GET",
      {
        next: {
          tags: [`${serverCacheTags.faq}-id-${id}`],
        },
      },
    );

    if (!faq) {
      redirect("/faqs");
    }

    return (
      <HasPermission
        resourceName="faqs"
        action="read"
        args={[faq]}
        alert={<Alert />}
      >
        <div className="space-y-5">
          <h1 className="text-center !text-2xl">Update FAQ</h1>
          <div className="mx-auto max-w-3xl">
            <FaqForm faq={faq} />
          </div>
        </div>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
