import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import TagList from "./_components/tag-list";

export default async function BlogCategories() {
  return (
    <HasPermission
      resourceName="tags"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <TagList />
    </HasPermission>
  );
}
