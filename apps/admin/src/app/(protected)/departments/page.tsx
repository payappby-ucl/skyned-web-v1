import Alert from "@/src/components/alert";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IDepartment } from "@workspace/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import DepartmentCard from "./_components/card";

export default async function DepartmentsPage() {
  try {
    // * Fetch All Departments
    const { data: departments } = await brandServerApi.httpClient.request<
      IDepartment[]
    >("/departments", "GET", {
      next: {
        tags: [`${serverCacheTags.departments}-navigation`],
      },
    });

    return (
      <section className="space-y-6 !p-0">
        <div className="space-y-1">
          <h1 className="!text-2xl">Departments</h1>
          <p className="text-muted-foreground text-sm">
            View and manage departments
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <DepartmentCard key={department.name} department={department} />
          ))}
        </div>
      </section>
    );
  } catch (error: any) {
    <Alert message={error.message} />;
  }
}
