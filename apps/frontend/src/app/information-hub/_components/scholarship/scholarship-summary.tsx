import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IScholarshipSummary } from "@workspace/shared";
import ScholarshipSummaryList from "../scholarship-summary-list";
import Link from "next/link";

export default async function ScholarshipSummary() {
  const { data: scholarshipSummary } = await brandServerApi.httpClient.request<
    IScholarshipSummary[]
  >(`/scholarships/summary`, "GET", {
    next: {
      tags: [`${serverCacheTags.scholarships}-summary`],
    },
  });

  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-center">Scholarship Categories</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center">
          We offer scholarships across multiple categories to support different
          aspects of your educational journey.
        </p>
      </div>
      <div className="space-y-2">
        <Link
          href="/scholarships"
          aria-label="View all scholarships"
          className="text-md text-brand ml-auto block w-fit font-semibold underline"
        >
          View all
        </Link>

        <ScholarshipSummaryList summary={scholarshipSummary} />
      </div>
    </section>
  );
}
