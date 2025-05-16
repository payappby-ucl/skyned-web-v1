"use client";

import { brandClientApi } from "@/src/lib/client";
import {
  CreateAdminSchema,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_PHONE_NUMBER_COUNTRY_CODE,
  gender,
  IAdmin,
  IDepartment,
  socialMedia,
} from "@workspace/shared";
import { Editor } from "@workspace/ui/components/editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { PhoneInput } from "@workspace/ui/components/phone-input";
import { CountryInput } from "@workspace/ui/components/country-input";
import { FileInput } from "@workspace/ui/components/file-input";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useFieldArray, useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback, useMemo } from "react";
import { FormButton } from "@workspace/ui/components/form-button";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { ExternalLink, Trash2 } from "lucide-react";
import SocialForm from "./social-form";
import getSocialIcon from "@/src/components/social-icons";
import Link from "next/link";
import useGet from "@/src/hooks/use-get";
import { createAdmin } from "../_actions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  admin?: IAdmin;
}

const AdminForm: React.FC<Props> = ({ admin }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<CreateAdminSchema>({
    resolver: zodResolver(CreateAdminSchema),
    defaultValues: {
      firstName: admin?.firstName || "",
      middleName: admin?.middleName || "",
      lastName: admin?.lastName || "",
      email: admin?.email || "",
      gender: admin?.gender || gender.Male,
      nationality: admin?.nationality || DEFAULT_COUNTRY_CODE,
      countryOfResidence: admin?.countryOfResidence || DEFAULT_COUNTRY_CODE,
      about: admin?.about || "",
      jobTitle: admin?.jobTitle || "",
      phoneNumber:
        admin?.phoneNumber?.number || DEFAULT_PHONE_NUMBER_COUNTRY_CODE,
      socials: admin?.socials || [],
      primaryImage: "",
      secondaryImage: "",
      departments:
        admin?.departments?.map((d) => ({
          id: d.id,
          name: d.name,
        })) || [],
    },
  });

  const onSubmit = useCallback(async (data: CreateAdminSchema) => {
    try {
      const serverRes = await createAdmin(data);
      brandClientApi.utils.handleServerActionResponse(serverRes);
      brandClientApi.utils.toast.success("Profile Created.");
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
      router.replace("/admins");
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  // * socials array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socials",
  });

  // * Watched Fields
  const primaryImage = form.watch("primaryImage");
  const secondaryImage = form.watch("secondaryImage");
  const socials = form.watch("socials");

  // * Socials not add
  const unAddedSocials = useMemo(
    () =>
      [
        socialMedia.facebook,
        socialMedia.instagram,
        socialMedia.linkedin,
        socialMedia.pinterest,
        socialMedia.tiktok,
        socialMedia.x,
      ].filter((social) => (socials || []).every((s) => s.name !== social)),
    [socials],
  );

  // * Load Departments from backend
  const { data } = useGet<Pick<IDepartment, "id" | "name">[]>({
    queryKey: ["getDepartmentsForAdminCreation"],
    url: "/departments/create",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 py-5"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="primaryImage"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Primary Image</FormLabel>

                {primaryImage ? (
                  <div
                    className={`flex items-center justify-between rounded-md bg-gray-200 bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-gray-900 dark:bg-blend-multiply`}
                    style={{
                      backgroundImage: `url(${primaryImage})`,
                    }}
                  >
                    <Image
                      src={primaryImage}
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
                      }}
                      extensions={[".png", ".jpeg", ".jpg"]}
                      maxSize={2}
                      setError={(message) =>
                        form.setError("primaryImage", {
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
                      message="Preferred dimension: 200x200"
                    />
                  </FormControl>
                )}

                <FormMessage />
                <FormDescription>Used as profile image</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryImage"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Secondary Image</FormLabel>

                {secondaryImage ? (
                  <div
                    className={`flex items-center justify-between rounded-md bg-gray-200 bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-gray-900 dark:bg-blend-multiply`}
                    style={{
                      backgroundImage: `url(${secondaryImage})`,
                    }}
                  >
                    <Image
                      src={secondaryImage}
                      alt="Secondary Image"
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
                      }}
                      extensions={[".png", ".jpeg", ".jpg"]}
                      maxSize={2}
                      setError={(message) =>
                        form.setError("secondaryImage", {
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
                      message="Preferred dimension: 200x200"
                    />
                  </FormControl>
                )}

                <FormMessage />
                <FormDescription>Optional</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormControl>
                    <Input id="firstName" placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      id="middleName"
                      placeholder="Middle name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormControl>
                    <Input id="lastName" placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
                  <FormControl>
                    <Input id="jobTitle" placeholder="Job Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is used for display on the public site and has no
                    effect on access control
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormControl>
                    <Input id="email" placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email must end with @skynedconsults.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full" id="gender">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[gender.Male, gender.Female, gender.Others].map(
                        (gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="nationality">Nationality</FormLabel>
                  <FormControl>
                    <CountryInput
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <FormField
              control={form.control}
              name="countryOfResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="countryOfResidence">
                    Country of Residence
                  </FormLabel>
                  <FormControl>
                    <CountryInput
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="departments"
          render={() => (
            <FormItem>
              <FormLabel>Departments</FormLabel>
              <div className="flex flex-wrap items-center gap-3">
                {data?.map((department) => (
                  <FormField
                    key={department.id}
                    control={form.control}
                    name="departments"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 rounded-md border px-4 py-2">
                        <FormControl>
                          <Checkbox
                            className="data-[state=checked]:!bg-brand dark:data-[state=checked]:!bg-foreground"
                            checked={
                              !!field.value?.find((v) => v.id === department.id)
                            }
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, department])
                                : field.onChange(
                                    field.value.filter(
                                      (v) => v.id !== department.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>
                          {department.name.replaceAll("_", " ")}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
              <FormDescription>Add staff to a department</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socials"
          render={() => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Socials</FormLabel>
                <SocialForm socials={unAddedSocials} append={append} />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {fields.map((field, index) => {
                  const Icon = getSocialIcon({
                    name: field.name,
                  });
                  return (
                    <div
                      key={field.id}
                      className="flex items-center justify-between gap-3 rounded-md border px-4 py-2"
                    >
                      <Icon size={15} />
                      <p className="text-md flex-1 capitalize">{field.name}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="icon"
                          type="button"
                        >
                          <Link href={field.url} target="_blank">
                            <ExternalLink />
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          type="button"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="text-destructive" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <FormDescription>Social media handles</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className="space-y-5 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Socials</p>
            <SocialForm socials={unAddedSocials} append={append} />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {fields.map((field, index) => {
              const Icon = getSocialIcon({
                name: field.name,
              });
              return (
                <div
                  key={field.id}
                  className="flex items-center justify-between gap-3 rounded-md border px-4 py-2"
                >
                  <Icon size={15} />
                  <p className="text-md flex-1 capitalize">{field.name}</p>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="icon" type="button">
                      <Link href={field.url} target="_blank">
                        <ExternalLink />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      type="button"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

        <FormField
          control={form.control}
          name="about"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="about">About</FormLabel>
              <FormControl>
                <Editor
                  placeholder="Tell us something about this staff..."
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  content={field.value}
                  editable={!form.formState.isSubmitting}
                  className="max-h-[400px]"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                A bit of details about this staff. (Optional)
              </FormDescription>
            </FormItem>
          )}
        />

        <FormButton
          variant="brand"
          className="w-full md:w-fit"
          isLoading={form.formState.isSubmitting}
        >
          Create Account
        </FormButton>
      </form>
    </Form>
  );
};

export default AdminForm;
