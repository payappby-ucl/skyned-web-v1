"use client";

import { brandClientApi } from "@/src/lib/client";
import {
  CreateSchoolSchema,
  currencies,
  institutionType,
  ownershipType,
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
import { createSchool } from "../_actions";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const CreateSchoolForm: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateSchoolSchema>({
    resolver: zodResolver(CreateSchoolSchema),
    defaultValues: {
      logo: "",
      schoolImage: "",
      name: "",
      slug: "",
      country: "CA",
      state: "",
      city: "",
      address: "",
      overview: "",
      link: "",
      institutionType: institutionType.university,
      ownershipType: ownershipType.public,
      currency: currencies.CAD,
    },
  });

  const onSubmit = useCallback(async (data: CreateSchoolSchema) => {
    try {
      const serverRes = await createSchool(data);
      const res = brandClientApi.utils.handleServerActionResponse(serverRes);
      brandClientApi.utils.toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["schools"],
      });

      router.replace("/schools");
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
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="logo"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>School's logo</FormLabel>
                {logo ? (
                  <div
                    className={`flex items-center justify-between rounded-md bg-gray-200 bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-gray-900 dark:bg-blend-multiply`}
                    style={{
                      backgroundImage: `url(${logo})`,
                    }}
                  >
                    <Image
                      src={logo}
                      alt="Primary Image"
                      width={200}
                      height={200}
                      className="h-[169px] w-[169px] rounded-md object-cover object-top"
                    />

                    <Button
                      role="button"
                      variant="outline"
                      size="icon"
                      className="mr-5"
                      onClick={() => field.onChange("")}
                    >
                      <Trash2 className="text-destructive size-5" />
                    </Button>
                  </div>
                ) : (
                  <FormControl>
                    <FileInput
                      isInvalid={fieldState.invalid}
                      accept={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpeg", ".jpg"],
                        "image/webp": [".webp"],
                      }}
                      extensions={[".png", ".jpeg", ".jpg", ".webp"]}
                      maxSize={1}
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
                            await brandClientApi.file.getDataUriFromFile(file);

                          field.onChange(dataUri);
                        }
                      }}
                      message="Preferred dimension: 512 x 512"
                    />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schoolImage"
            render={({ field, fieldState }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>School's cover image</FormLabel>
                {schoolImage ? (
                  <div
                    className={`flex items-center justify-between rounded-md bg-gray-200 bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-gray-900 dark:bg-blend-multiply`}
                    style={{
                      backgroundImage: `url(${schoolImage})`,
                    }}
                  >
                    <Image
                      src={schoolImage}
                      alt="Primary Image"
                      width={200}
                      height={200}
                      className="h-[169px] w-[169px] rounded-md object-cover object-top"
                    />

                    <Button
                      role="button"
                      variant="outline"
                      size="icon"
                      className="mr-5"
                      onClick={() => field.onChange("")}
                    >
                      <Trash2 className="text-destructive size-5" />
                    </Button>
                  </div>
                ) : (
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
                            await brandClientApi.file.getDataUriFromFile(file);

                          field.onChange(dataUri);
                        }
                      }}
                      message="High quality"
                    />
                  </FormControl>
                )}
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
              <FormItem className="lg:col-span-2">
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
          Create School Profile
        </FormButton>
      </form>
    </Form>
  );
};

export default CreateSchoolForm;
