import Alert from "@/src/components/alert";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IDepartment } from "@workspace/shared";
import StaffPieChart from "./pie";

export default async function DepartmentsPie() {
  try {
    // * Fetch All Departments
    const { data: departments } = await brandServerApi.httpClient.request<
      IDepartment[]
    >("/departments", "GET", {
      next: {
        tags: [`${serverCacheTags.departments}-navigation`],
      },
    });

    return <StaffPieChart departments={departments} />;
  } catch (error) {
    return <Alert />;
  }
}
