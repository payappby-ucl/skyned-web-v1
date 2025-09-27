import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import ScholarshipLinks from "./_components/links";

export default async function ScholarshipsPage() {
  return (
    <HasPermission
      resourceName="scholarships"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <section className="space-y-5 !p-0">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="!text-3xl">Scholarships & Awards</h1>
          <ScholarshipLinks />
        </header>
      </section>
    </HasPermission>
  );
}
