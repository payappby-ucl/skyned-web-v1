export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <div>{name} Page</div>;
}
