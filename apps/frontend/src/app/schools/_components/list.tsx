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
    <section className="grid grid-cols-1 gap-5 !p-0 md:grid-cols-5">
      <div className="space-y-10 md:col-span-4">
        <header>
          <h2>Latest Schools</h2>
        </header>
        <div className="hide-scrollbar grid max-h-screen grid-cols-1 items-start gap-8 overflow-x-hidden overflow-y-scroll md:grid-cols-2 lg:grid-cols-3">
          {data.data.map((school) => (
            <SchoolCard school={school} key={school.slug} />
          ))}
        </div>
        <SchoolPagination data={data} searchParams={searchParams} />
        {!data?.total || !data.data.length ? (
          <div className="text-muted-foreground flex flex-row items-center justify-center gap-2 rounded-md border py-4">
            <NotebookText size={15} />
            <p className="text-sm">No Data</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
