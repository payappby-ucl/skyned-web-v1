import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import ProgramList from "../_components/program-list";

export default async function SchoolProgramsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    return (
      <HasPermission
        resourceName="programs"
        action="list"
        secondaryComponent={<Alert />}
        args={[]}
        redirect
      >
        <ProgramList slug={slug} />
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
