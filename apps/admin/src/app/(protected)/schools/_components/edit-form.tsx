"use client";

import { brandClientApi } from "@/src/lib/client";
import {
  institutionType,
  ISchool,
  ownershipType,
  UpdateSchoolSchema,
} from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { CountryInput } from "@workspace/ui/components/country-input";
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
import { StateInput } from "@workspace/ui/components/state-input";
import { SuggestionInput } from "@workspace/ui/components/suggestion-input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CurrencyInput } from "@workspace/ui/components/currency-input";
import { updateSchool } from "../_actions";

interface Props {
  school: ISchool;
}

const EditSchoolForm: React.FC<Props> = ({ school }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<UpdateSchoolSchema>({
    resolver: zodResolver(UpdateSchoolSchema),
    defaultValues: {
      logo: "",
      schoolImage: "",
      name: school.name,
      slug: school.slug,
      country: school.country,
      state: school.state,
      city: school.city,
      address: school.address,
      overview: school.overview,
      link: school.link,
      institutionType: school.institutionType,
      ownershipType: school.ownershipType,
      currency: school.currency,
    },
  });

  const onSubmit = useCallback(async (data: UpdateSchoolSchema) => {
    try {
      const serverRes = await updateSchool(school.slug, data);
      const res = brandClientApi.utils.handleServerActionResponse(serverRes);
      brandClientApi.utils.toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["schools", `schools-slug-${school.slug}`],
      });

      router.replace(`/schools/${data.slug}`);
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  // * Watch
  const logo = form.watch("logo");
  const schoolImage = form.watch("schoolImage");
  const country = form.watch("country");
  const state = form.watch("state");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="logo"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>School's logo</FormLabel>

                {
                  <div className="flex flex-col items-center gap-2 lg:flex-row">
                    {logo || school.logo ? (
                      <div
                        className={`flex w-full items-center justify-between rounded-md bg-gray-200 bg-cover bg-top bg-no-repeat bg-blend-screen ${logo ? "lg:w-full" : "lg:w-fit"} dark:bg-gray-900 dark:bg-blend-multiply`}
                        style={{
                          backgroundImage: `url(${logo || school.logo.url})`,
                        }}
                      >
                        <Image
                          src={logo || school.logo.url}
                          alt="Primary Image"
                          width={200}
                          height={200}
                          className="h-[169px] w-[169px] rounded-md object-cover object-top"
                        />
                        {logo ? (
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

                    {!logo ? (
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
                              form.setError("logo", {
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

          <FormField
            control={form.control}
            name="schoolImage"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>School's cover image</FormLabel>
                {
                  <div className="flex flex-col items-center gap-2 lg:flex-row">
                    {schoolImage || school.schoolImage ? (
                      <div
                        className={`flex w-full items-center justify-between rounded-md bg-gray-200 bg-cover bg-top bg-no-repeat bg-blend-screen ${schoolImage ? "lg:w-full" : "lg:w-fit"} dark:bg-gray-900 dark:bg-blend-multiply`}
                        style={{
                          backgroundImage: `url(${schoolImage || school.schoolImage.url})`,
                        }}
                      >
                        <Image
                          src={schoolImage || school.schoolImage.url}
                          alt="Primary Image"
                          width={200}
                          height={200}
                          className="h-[169px] w-[169px] rounded-md object-cover object-top"
                        />
                        {schoolImage ? (
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

                    {!schoolImage ? (
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
                              form.setError("schoolImage", {
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
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">School name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                      form.setValue("slug", val);
                    }}
                    placeholder="Name"
                    id="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institutionType"
            render={({ field }) => (
              <FormItem className="self-start">
                <FormLabel htmlFor="institutionType">
                  Institution Type
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="institutionType"
                    className="w-full capitalize"
                  >
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[institutionType.university, institutionType.college].map(
                      (type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownershipType"
            render={({ field }) => (
              <FormItem className="self-start">
                <FormLabel htmlFor="ownershipType">Ownership Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="ownershipType"
                    className="w-full capitalize"
                  >
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[ownershipType.private, ownershipType.public].map(
                      (type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="link">School website address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="School's website" id="link" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="currency">Currency</FormLabel>
                <FormControl>
                  <CurrencyInput
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountryInput
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Country the school is located in
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province / State</FormLabel>
                <FormControl>
                  <StateInput
                    value={field.value}
                    onValueChange={field.onChange}
                    country={country}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Province / State the school is located in
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="city">City</FormLabel>
                <FormControl>
                  <SuggestionInput
                    placeholder="City"
                    {...field}
                    id="city"
                    listName="cities"
                    suggestions={
                      country && state
                        ? brandClientApi.location
                            .getCitiesOfState(state, country)
                            .map((city) => city.name)
                        : []
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-1">
                <FormLabel htmlFor="address">Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="School's address"
                    id="address"
                    autoComplete="street-address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="overview"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel htmlFor="overview">Overview</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Brief overview about ${form.getValues("name")}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormButton
          variant="brand"
          className="w-full md:w-fit"
          isLoading={form.formState.isSubmitting}
        >
          Update Profile
        </FormButton>
      </form>
    </Form>
  );
};

export default EditSchoolForm;
