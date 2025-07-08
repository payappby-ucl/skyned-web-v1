import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import BlogList from "./_components/blog-list";

export default async function BlogPage() {
  return (
    <HasPermission
      resourceName="blogs"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <BlogList />
    </HasPermission>
  );
}
