import { IPaginatedResponse, ISchool } from "@workspace/shared";
import { NotebookText } from "lucide-react";
import SchoolCard from "./card";
import SchoolPagination from "./pagination";

interface Props {
  data: IPaginatedResponse<ISchool>;
  searchParams: URLSearchParams;
}
export function SchoolList({ data, searchParams }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((school) => (
          <div key={school.slug}>
            <SchoolCard school={school} />
          </div>
        ))}
      </div>
      <SchoolPagination data={data} searchParams={searchParams} />
      {!data?.total || !data.data.length ? (
        <div className="text-muted-foreground flex flex-row items-center justify-center gap-2 rounded-md border py-4">
          <NotebookText size={15} />
          <p className="text-sm">No Data</p>
        </div>
      ) : null}
    </>
  );
}
