import HasPermission from "@/src/components/has-permission";
import CreateBlogForm from "../_components/form";

export default function NewBlogPost() {
  return (
    <HasPermission
      resourceName="blogs"
      action="create"
      args={[{} as any]}
      redirect
    >
      <div className="space-y-5">
        <div className="space-y-1 border-b pb-3">
          <h1 className="!text-2xl">Create Post</h1>
          <p className="text-muted-foreground text-sm">
            Create a new blog post
          </p>
        </div>
        <CreateBlogForm />
      </div>
    </HasPermission>
  );
}
