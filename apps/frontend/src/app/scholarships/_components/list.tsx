"use client";

import { IPaginatedResponse, IScholarship } from "@workspace/shared";
import { Award } from "lucide-react";
import React from "react";
import ScholarshipPost from "./scholarship-post";
import ScholarshipPagination from "./pagination";

interface Props {
  data: IPaginatedResponse<IScholarship>;
  searchParams: URLSearchParams;
}

const ScholarshipList: React.FC<Props> = ({ data, searchParams }) => {
  return (
    <section className="space-y-5 !p-0">
      {data?.data.length ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((scholarship) => (
              <ScholarshipPost
                scholarship={scholarship}
                key={scholarship.slug}
              />
            ))}
          </div>

          <ScholarshipPagination data={data} searchParams={searchParams} />
        </div>
      ) : null}
      {!data?.total || !data.data.length ? (
        <div className="text-muted-foreground flex flex-row items-center justify-center gap-2 py-4">
          <Award size={15} />
          <p className="text-sm">No Data</p>
        </div>
      ) : null}
    </section>
  );
};

export default ScholarshipList;
