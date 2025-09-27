"use client";

import { brandClientApi } from "@/src/lib/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  IScholarship,
  UpdateScholarshipSchema,
  scholarshipCategories,
} from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { updateScholarship } from "../../_actions";

interface Props {
  scholarship: IScholarship;
}

const UpdateScholarshipForm: React.FC<Props> = ({ scholarship }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<UpdateScholarshipSchema>({
    resolver: zodResolver(UpdateScholarshipSchema),
    defaultValues: {
      title: scholarship.title || "",
      subtitle: scholarship.subtitle || "",
      slug: scholarship.slug || "",
      overview: scholarship.overview || "",
      category:
        (scholarship.category as (typeof scholarshipCategories)[number]) ||
        "accommodation",
      description: scholarship.description || "",
      featured: scholarship.featured || false,
      banner: "",
      eligibilityRequirements: scholarship.eligibilityRequirements || [""],
    },
  });

  const onSubmit = useCallback(
    async (data: UpdateScholarshipSchema) => {
      try {
        const serverRes = await updateScholarship(scholarship.slug, data);
        const res = brandClientApi.utils.handleServerActionResponse(serverRes);
        brandClientApi.utils.toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["scholarships"],
        });

        router.replace("/scholarships");
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    },
    [scholarship],
  );

  // * Watch
  const [banner, eligibilityRequirements] = form.watch([
    "banner",
    "eligibilityRequirements",
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 lg:grid-cols-5"
      >
        <div className="space-y-5 lg:col-span-5">
          <div className="space-y-5">
            <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
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

              {/* Subtitle */}
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="subtitle">Subtitle</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Subtitle" id="subtitle" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Overview */}
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel htmlFor="overview">Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Brief overview about this post`}
                      {...field}
                      id="overview"
                      className="lg:h-25"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Banner Image */}
          <FormField
            control={form.control}
            name="banner"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Banner</FormLabel>
                {
                  <div className="flex flex-col items-center gap-2 lg:flex-row">
                    {banner || scholarship.banner ? (
                      <div
                        className={`flex w-full items-center justify-between rounded-md bg-gray-200 bg-cover bg-top bg-no-repeat bg-blend-screen ${banner ? "lg:w-full" : "lg:w-fit"} dark:bg-gray-900 dark:bg-blend-multiply`}
                        style={{
                          backgroundImage: `url(${banner || scholarship.banner.url})`,
                        }}
                      >
                        <Image
                          src={banner || scholarship.banner.url}
                          alt="Primary Image"
                          width={200}
                          height={200}
                          className="w-3xs h-max rounded-md object-cover object-top"
                        />
                        {banner ? (
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

                    {!banner ? (
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
                            maxSize={5}
                            setError={(message) =>
                              form.setError("banner", {
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

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:col-span-5">
          <div className="space-y-5">
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
                      {scholarshipCategories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="capitalize"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <FormDescription>
                      Is this a featured scholarship?
                    </FormDescription>
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
            {/* Eligibility Requirements */}
            <h4 className="mb-1 text-sm">Eligibility Requirements</h4>
            {eligibilityRequirements.map((requirement, index) => (
              <FormField
                key={`eligibilityRequirements-${index}`}
                control={form.control}
                name={`eligibilityRequirements.${index}`}
                render={({ field: stringField }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormControl>
                        <Input
                          {...stringField}
                          placeholder="Enter Eligibility Requirement"
                        />
                      </FormControl>

                      {eligibilityRequirements.length > 1 ? (
                        <Button
                          role="button"
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            form.setValue(
                              "eligibilityRequirements",
                              eligibilityRequirements.filter(
                                (_, idx) => idx !== index,
                              ),
                            )
                          }
                        >
                          <Trash2 className="text-destructive" />
                        </Button>
                      ) : null}

                      {index === eligibilityRequirements.length - 1 ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          role="button"
                          type="button"
                          onClick={() =>
                            form.setValue("eligibilityRequirements", [
                              ...eligibilityRequirements,
                              "",
                            ])
                          }
                        >
                          <Plus />
                        </Button>
                      ) : null}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="space-y-5 lg:col-span-5">
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FormItem className="">
                <FormLabel htmlFor="description">Description</FormLabel>
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
                <FormDescription>Scholarship Description</FormDescription>
              </FormItem>
            )}
          />

          <FormButton variant="brand" isLoading={form.formState.isSubmitting}>
            Update Scholarship
          </FormButton>
        </div>
      </form>
    </Form>
  );
};

export default UpdateScholarshipForm;
