import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IProgram, ISchool } from "@workspace/shared";
import { redirect } from "next/navigation";
import ProgramForm from "../../_components/program-form";

export default async function EditSchoolProgramPage({
  params,
}: {
  params: Promise<{ slug: string; pslug: string }>;
}) {
  try {
    const { slug, pslug } = await params;
    const { data: program } = await brandServerApi.httpClient.request<IProgram>(
      `/schools/${slug}/programs/${pslug}`,
      "GET",
      {
        next: {
          tags: [
            `${serverCacheTags.schools}-${slug}-${serverCacheTags.programs}-${pslug}`,
          ],
        },
      },
    );

    if (!program) {
      redirect("/");
    }

    return (
      <HasPermission
        resourceName="programs"
        action="update"
        args={[{} as any, {} as any]}
        redirect
      >
        <div className="space-y-5">
          <div className="space-y-1 border-b pb-3">
            <h1 className="!text-2xl">
              Update Program for {program.school?.name}
            </h1>
            <p className="text-muted-foreground text-sm">
              Update {program.name}
            </p>
          </div>
          <ProgramForm school={program.school!} program={program} />
        </div>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
