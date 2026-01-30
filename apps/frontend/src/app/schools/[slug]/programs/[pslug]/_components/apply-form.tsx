"use client";
import { brandClientApi } from "@/src/lib/client";
import { supportedCountries } from "@/src/utils";
import {
  ApplyFormSchema,
  DEFAULT_COUNTRY_CODE,
  gender,
  highestLevelOfEducation,
  IProgram,
} from "@workspace/shared";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { CurrencyInput } from "@workspace/ui/components/currency-input";
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
import { PhoneInput } from "@workspace/ui/components/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useForm, useWatch, zodResolver } from "@workspace/ui/lib/utils";
import Link from "next/link";
import React, { useCallback } from "react";
import { submitLead } from "../_actions.ts";

interface Props {
  program: IProgram;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApplyForm: React.FC<Props> = ({ program, setOpen }) => {
  const form = useForm<ApplyFormSchema>({
    resolver: zodResolver(ApplyFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: gender.Female,
      phoneNumber: DEFAULT_COUNTRY_CODE,
      program: {
        slug: program.slug,
        schoolSlug: program.school?.slug || "",
      },
      education: {
        value: "",
        highestLevelOfEducation: "Bachelor's Degree",
      },
      employment: {
        employed: "No",
        job: "",
        yearsOfExperience: 1,
      },
      countryOfInterest: [],
      budget: {
        hasBudget: "No",
        budget: {
          currency: program.school?.currency || "CAD",
          amount: 0,
        },
      },
    },
  });

  const onSubmit = useCallback(async (data: ApplyFormSchema) => {
    try {
      const res = await submitLead(data);
      const resData = brandClientApi.utils.handleServerActionResponse(res);
      brandClientApi.utils.toast.success(resData.message);
      form.reset();
      brandClientApi.storage.localStorage.setItem("gate", "true");
      setOpen(false);
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  console.log(form);

  const [hel, isEmployed, hasBudget, countryOfInterest] = useWatch({
    control: form.control,
    name: [
      "education.highestLevelOfEducation",
      "employment.employed",
      "budget.hasBudget",
      "countryOfInterest",
    ],
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid max-w-2xl grid-cols-1 gap-5"
      >
        <fieldset className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
          {/* First name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 md:col-span-2">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll reach out to you via email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
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

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormDescription>
                  We'll reach out to you via phone number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* Education */}
        <fieldset className="grid grid-cols-1 gap-5">
          <legend className="text-md mb-4">Education</legend>
          {/* Highest Education Level */}
          <FormField
            control={form.control}
            name="education.highestLevelOfEducation"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="gender">
                  Highest level of education
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full" id="gender">
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {highestLevelOfEducation.map((hle) => (
                      <SelectItem key={hle} value={hle}>
                        {hle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Others */}
          {hel === "Others" ? (
            <FormField
              control={form.control}
              name="education.value"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Please specify you highest education level
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Highest education level" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </fieldset>

        {/* Employment */}
        <fieldset className="grid grid-cols-1 gap-5">
          <legend className="text-md mb-4">Employment status</legend>
          {/* Employed */}
          <FormField
            control={form.control}
            name="employment.employed"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="employment">
                  Are you currently employed?
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full" id="employment">
                      <SelectValue placeholder="Are you currently employed?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Yes", "No"].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEmployed === "Yes" ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="employment.job"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>What's your current job?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What's your current job?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employment.yearsOfExperience"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="Years of Experience" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}
        </fieldset>

        {/* Country of interest */}

        <FormLabel>
          Are you considering studies in any of the following countries?
        </FormLabel>
        {supportedCountries.map((country, index) => (
          <div className="flex items-center gap-2" key={country.label}>
            <Checkbox
              checked={countryOfInterest?.includes(country.label)}
              onCheckedChange={(checked) => {
                return checked
                  ? form.setValue("countryOfInterest", [
                      ...(countryOfInterest || []),
                      country.label,
                    ])
                  : form.setValue(
                      "countryOfInterest",
                      countryOfInterest?.filter((c) => c !== country.label),
                    );
              }}
            />
            <p className="text-sm font-semibold">{country.label}</p>
          </div>
        ))}

        {/* Budget */}
        <div className="grid grid-cols-1 gap-5">
          {/* Has Budget */}
          <FormField
            control={form.control}
            name="budget.hasBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="has-budget">
                  Do you have a study budget?
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full" id="has-budget">
                      <SelectValue placeholder="Do you have a study budget?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Yes", "No"].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget */}
          {hasBudget === "Yes" ? (
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
              {/* Currency */}
              <FormField
                control={form.control}
                name="budget.budget.currency"
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

              {/* Amount */}
              <FormField
                control={form.control}
                name="budget.budget.amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step={0.01} min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}
        </div>

        <Alert>
          <AlertDescription>
            <div>
              By submitting the information above, you agree to our{" "}
              <Link
                href="/terms"
                aria-label="Link to our terms and conditions"
                className="text-brand font-semibold hover:underline"
                target="_blank"
              >
                terms and conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                aria-label="Link to our privacy policy"
                className="text-brand font-semibold hover:underline"
                target="_blank"
              >
                privacy policies.
              </Link>{" "}
              We can also reach out to you via the provided email address and
              phone number and also share information related to you interest
              via your email address.
            </div>
          </AlertDescription>
        </Alert>

        <FormButton isLoading={form.formState.isSubmitting} variant="brand">
          Submit
        </FormButton>
      </form>
    </Form>
  );
};
