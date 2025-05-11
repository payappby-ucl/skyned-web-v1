import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import { Metadata } from "next";
import Script from "next/script";
import { WithContext, WebPage } from "schema-dts";
import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { addresses, contacts } from "@/src/utils";
import { redirect } from "next/navigation";
import { brandServerApi } from "@/src/lib/server";
import { IFaq } from "@workspace/shared";
import FAQs from "./_components/faq/faqs";
import Link from "next/link";

const title = "Frequently Asked Questions";
const description = `These are the most commonly asked questions about ${env.organization.name}`;

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/faqs",
  },
};

export default async function Faqs() {
  try {
    const { data } = await brandServerApi.httpClient.request<
      Pick<IFaq, "answer" | "question">[]
    >("/faqs/list", "GET", {
      next: {
        revalidate: 604800,
      },
    });

    const jsonLd: WithContext<WebPage> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${env.client.baseUrl}/faqs`,
      reviewedBy: organization,
      mainEntityOfPage: {
        "@type": "FAQPage",
        mainEntity: data.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <CustomBreadCrumb className="border-y" />
        <section>
          <div className="mx-auto max-w-2xl space-y-10">
            <div className="space-y-1 text-center">
              <h2>{title}</h2>
              <p>{description}</p>
              <p>
                Can't find what you're looking for?{" "}
                <Link
                  href="/contact"
                  aria-label="Link to contact page"
                  className="text-brand underline"
                >
                  Chat with our friendly team
                </Link>
              </p>
            </div>

            <FAQs faqs={data} />
          </div>
        </section>
      </>
    );
  } catch (error) {
    redirect("/");
  }
}
