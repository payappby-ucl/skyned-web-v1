"use client";

import { brandClientApi } from "@/src/lib/client";
import {
  blogPostStatus,
  IBlogPost,
  UpdateBlogPostSchema,
} from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { Editor } from "@workspace/ui/components/editor";
import { FileInput } from "@workspace/ui/components/file-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { FormButton } from "@workspace/ui/components/form-button";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateBlogPost } from "../../_actions";

interface Props {
  post: IBlogPost;
}
const EditBlogForm: React.FC<Props> = ({ post }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<UpdateBlogPostSchema>({
    resolver: zodResolver(UpdateBlogPostSchema),
    defaultValues: {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: "",
      tags: post.tags?.map((tag) => tag.name) || [],
      categories: post.categories?.map((category) => category.name) || [],
      status: post.status,
      publishedAt: post.publishedAt
        ? (post.publishedAt as unknown as number)
        : undefined,
    },
  });

  const onSubmit = useCallback(async (data: UpdateBlogPostSchema) => {
    try {
      if (data.status !== "scheduled") {
        delete data.publishedAt;
      }

      if (data.publishedAt) {
        data.publishedAt = +brandClientApi.date.startOfDay(
          new Date(data.publishedAt),
        );
      }

      const serverRes = await updateBlogPost(post.slug, data);
      const res = brandClientApi.utils.handleServerActionResponse(serverRes);
      brandClientApi.utils.toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      router.replace("/blog");
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  // * Watch
  const coverImage = form.watch("coverImage");
  const status = form.watch("status");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 lg:grid-cols-5"
      >
        <div className="grid grid-cols-1 gap-5 lg:col-span-5 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Post Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                        form.setValue("slug", val);
                      }}
                      placeholder="Title"
                      id="title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel htmlFor="excerpt">Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Brief excerpt about this post`}
                      {...field}
                      id="excerpt"
                      className="lg:h-25"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cover Image */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field, fieldState }) => (
              <FormItem className="lg:col-span-3">
                <FormLabel>Cover Image</FormLabel>
                {
                  <div className="flex flex-col items-center gap-2 lg:flex-row">
                    {coverImage || post.coverImage ? (
                      <div
                        className={`flex w-full items-center justify-between rounded-md bg-gray-200 bg-cover bg-top bg-no-repeat bg-blend-screen ${coverImage ? "lg:w-full" : "lg:w-fit"} dark:bg-gray-900 dark:bg-blend-multiply`}
                        style={{
                          backgroundImage: `url(${coverImage || post.coverImage.url})`,
                        }}
                      >
                        <Image
                          src={coverImage || post.coverImage.url}
                          alt="Primary Image"
                          width={200}
                          height={200}
                          className="w-3xs h-max rounded-md object-cover object-top"
                        />
                        {coverImage ? (
                          <Button
                            role="button"
                            variant="outline"
                            size="icon"
                            className="mr-5"
                            onClick={() => field.onChange("")}
                          >
                            <Trash2 className="text-destructive size-5" />
                          </Button>
                        ) : null}
                      </div>
                    ) : null}

                    {!coverImage ? (
                      <div className="w-full flex-1">
                        <FormControl>
                          <FileInput
                            isInvalid={fieldState.invalid}
                            accept={{
                              "image/png": [".png"],
                              "image/jpeg": [".jpeg", ".jpg"],
                              "image/webp": [".webp"],
                            }}
                            extensions={[".png", ".jpeg", ".jpg", ".webp"]}
                            maxSize={2}
                            setError={(message) =>
                              form.setError("coverImage", {
                                message,
                              })
                            }
                            clearError={() => {
                              form.clearErrors();
                            }}
                            handleFile={async (file) => {
                              if (file) {
                                const dataUri =
                                  await brandClientApi.file.getDataUriFromFile(
                                    file,
                                  );
                                field.onChange(dataUri);
                              }
                            }}
                            message="Preferred dimension: 512 x 512"
                          />
                        </FormControl>
                      </div>
                    ) : null}
                  </div>
                }
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 items-start gap-5 space-y-5 md:grid-cols-2 lg:col-span-5">
          <div className="space-y-5">
            {/* Categories */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel htmlFor="categories">Categories</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comma separated categories eg Canada, Announcement"
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase();
                        field.onChange([...new Set(val.split(", "))]);
                      }}
                      value={(field.value || []).join(", ")}
                      id="categories"
                    />
                  </FormControl>
                  <FormDescription>
                    One category per post (Recommended)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured */}
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border p-3">
                  <div className="space-y-1">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>Is this a featured post?</FormDescription>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-5">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      // setSelectedGradingScheme("");
                    }}
                    value={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger id="status" className="w-full capitalize">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {blogPostStatus.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="capitalize"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publish At */}
            {status === "scheduled" ? (
              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={
                          field.value ? new Date(field.value) : new Date()
                        }
                        mode="single"
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        fromDate={new Date()}
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 10}
                        display={
                          field.value
                            ? brandClientApi.date.formatDate(
                                new Date(field.value),
                                "MMM DD YYYY",
                              )
                            : ""
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Date in which this post should be available for public
                      view
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {/* Keywords */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel htmlFor="tags">Keywords</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Comma separated keywords"
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase();
                        field.onChange([...new Set(val.split(", "))]);
                      }}
                      value={(field.value || []).join(", ")}
                      id="tags"
                    />
                  </FormControl>
                  <FormDescription>Used for SEO optimization</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-5 lg:col-span-5">
          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem className="">
                <FormLabel htmlFor="content">Content</FormLabel>
                <FormControl>
                  <Editor
                    onChange={field.onChange}
                    invalid={fieldState.invalid}
                    content={field.value}
                    editable={!form.formState.isSubmitting}
                    className="max-h-[400px] min-h-[350px]"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Post Content</FormDescription>
              </FormItem>
            )}
          />

          <FormButton variant="brand" isLoading={form.formState.isSubmitting}>
            Update Post
          </FormButton>
        </div>
      </form>
    </Form>
  );
};
export default EditBlogForm;
