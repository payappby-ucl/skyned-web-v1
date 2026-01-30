import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import CategoryList from "./_components/category-list";

export default async function BlogCategories() {
  return (
    <HasPermission
      resourceName="categories"
      action="list"
      args={[]}
      secondaryComponent={<Alert />}
      redirect
    >
      <CategoryList />
    </HasPermission>
  );
}
