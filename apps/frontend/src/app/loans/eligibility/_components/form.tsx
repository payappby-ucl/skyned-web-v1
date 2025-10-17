"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  FormDescription,
} from "@workspace/ui/components/form";
import { CountryInput } from "@workspace/ui/components/country-input";
import { FormButton } from "@workspace/ui/components/form-button";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  DollarSign,
  GraduationCap,
  MapPin,
  Trash2,
} from "lucide-react";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import {
  computeFinancialAidEligibility,
  DEFAULT_PHONE_NUMBER_COUNTRY_CODE,
  financialAids,
  FinancialAidSchema,
  IProgram,
} from "@workspace/shared";
import { useCallback } from "react";
import { brandClientApi } from "@/src/lib/client";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { PhoneInput } from "@workspace/ui/components/phone-input";
import useFinancialAidEligibility from "@/src/hooks/use-financial-aid-eligibility";
import SchoolComboboxSearch from "./school-combobox-search";
import ProgramComboboxSearch from "./program-combobox-search";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { DatePicker } from "@workspace/ui/components/date-picker";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileInput } from "@workspace/ui/components/file-input";
import { submitFinancialAidApplication } from "../../_actions";

const FinancialAidEligibilityForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<IProgram | null>(null);
  const [eligibilityDecision, setEligibilityDecision] = useState<
    | {
        isEligible: false;
        message: string;
      }
    | {
        isEligible: true;
        partners: ("mpower" | "passage")[];
        recommendation: "mpower" | "passage" | null;
      }
    | null
  >(null);

  const { financialAidEligibility, saveFinancialAidEligibility, loading } =
    useFinancialAidEligibility();

  const form = useForm<FinancialAidSchema>({
    resolver: zodResolver(FinancialAidSchema),
    defaultValues: {
      citizenship: financialAidEligibility?.citizenship || "",
      canadianResident: financialAidEligibility?.canadianResident || "yes",
      firstName: financialAidEligibility?.firstName || "",
      lastName: financialAidEligibility?.lastName || "",
      email: financialAidEligibility?.email || "",
      phoneNumber:
        financialAidEligibility?.phoneNumber ||
        DEFAULT_PHONE_NUMBER_COUNTRY_CODE,
      schoolSlug: financialAidEligibility?.schoolSlug || "",
      programSlug: financialAidEligibility?.programSlug || "",
      studyLevel: financialAidEligibility?.studyLevel || "graduate",
      pgwp: financialAidEligibility?.pgwp || "yes",
      hasOfferLetter: financialAidEligibility?.hasOfferLetter || "yes",
      loanType: financialAidEligibility?.loanType || "tuition",
      livingExpensesCoverage:
        financialAidEligibility?.livingExpensesCoverage || "yes",
      programStarted: financialAidEligibility?.programStarted || "no",
      gpa: financialAidEligibility?.gpa || 1,
      nextSchoolTerm: financialAidEligibility?.nextSchoolTerm || Date.now(),
      identification: financialAidEligibility?.identification || "",
      proofOfAddress: financialAidEligibility?.proofOfAddress || "",
      resume: financialAidEligibility?.resume || "",
      transcript: financialAidEligibility?.transcript || "",
      bankStatement: financialAidEligibility?.bankStatement || "",
      immigrationDocument: financialAidEligibility?.immigrationDocument || "",
    },
  });

  const handleStep1 = useCallback(async () => {
    try {
      const isValid = await form.trigger(["citizenship", "canadianResident"]);
      if (isValid) {
        const data = form.getValues();
        saveFinancialAidEligibility(data);
        setStep(2);
      }
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, [financialAidEligibility]);

  const handleStep2 = useCallback(async () => {
    try {
      const isValid = await form.trigger([
        "citizenship",
        "canadianResident",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "schoolSlug",
        "programSlug",
        "pgwp",
        "hasOfferLetter",
        "studyLevel",
      ]);

      if (isValid) {
        const data = form.getValues();
        saveFinancialAidEligibility(data);
        setStep(3);
      }
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, [financialAidEligibility]);

  const handleStep3 = useCallback(async () => {
    try {
      const isValid = await form.trigger([
        "citizenship",
        "canadianResident",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "schoolSlug",
        "programSlug",
        "pgwp",
        "hasOfferLetter",
        "studyLevel",
        "loanType",
        "livingExpensesCoverage",
      ]);

      if (isValid) {
        const data = form.getValues();
        if (data.loanType === "tuition" && !data.livingExpensesCoverage) {
          throw new Error("Select expenses coverage");
        }
        saveFinancialAidEligibility(data);
        setStep(4);
      }
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, [financialAidEligibility]);

  const handleStep4 = useCallback(async () => {
    try {
      const isValid = await form.trigger([
        "citizenship",
        "canadianResident",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "schoolSlug",
        "programSlug",
        "pgwp",
        "hasOfferLetter",
        "studyLevel",
        "loanType",
        "livingExpensesCoverage",
        "programStarted",
        "gpa",
        "nextSchoolTerm",
      ]);

      if (isValid) {
        const data = form.getValues();
        saveFinancialAidEligibility(data);

        // * Process recommendation before moving to next screen
        if (program) {
          setEligibilityDecision(
            computeFinancialAidEligibility(
              program,
              data,
            ) as typeof eligibilityDecision,
          );
        } else {
          setEligibilityDecision(null);
        }

        setStep(5);
      }
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, [financialAidEligibility, program]);

  const handleStep5 = useCallback(
    async (partner: (typeof financialAids)[number]) => {
      try {
        form.setValue("partner", partner);
        const isValid = await form.trigger([
          "citizenship",
          "canadianResident",
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "schoolSlug",
          "programSlug",
          "pgwp",
          "hasOfferLetter",
          "studyLevel",
          "loanType",
          "livingExpensesCoverage",
          "programStarted",
          "gpa",
          "nextSchoolTerm",
          "partner",
        ]);

        if (isValid) {
          const data = form.getValues();
          saveFinancialAidEligibility(data);
          setStep(6);
        }
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    },
    [financialAidEligibility, program],
  );

  const onSubmit = useCallback(async (data: FinancialAidSchema) => {
    try {
      const res = await submitFinancialAidApplication(data);
      const resData = brandClientApi.utils.handleServerActionResponse(res);
      brandClientApi.utils.toast.success(resData.message);
      brandClientApi.storage.localStorage.deleteItem(
        "financial-aid-eligibility",
      );
      form.reset();
      setStep(7);
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  const [
    schoolSlug,
    loanType,
    programStarted,
    identification,
    proofOfAddress,
    resume,
    transcript,
    bankStatement,
    immigrationDocument,
  ] = form.watch([
    "schoolSlug",
    "loanType",
    "programStarted",
    "identification",
    "proofOfAddress",
    "resume",
    "transcript",
    "bankStatement",
    "immigrationDocument",
  ]);

  return (
    <Form {...form}>
      <form
        className="md:min-w-2xl w-full space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Step 1 */}
        {step === 1 ? (
          <>
            <header className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary h-5 w-5" />
                <h1 className="!text-xl">Where Are You From?</h1>
              </div>
              <p className="text-muted-foreground text-md">
                Help us determine your eligibility based on your citizenship and
                location.
              </p>
            </header>

            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What country are you a citizen of?</FormLabel>
                  <FormControl>
                    <CountryInput
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
              name="canadianResident"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Are you currently living in Canada? </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        id="residency"
                        className="w-full capitalize"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["yes", "no"].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton
              type="button"
              role="button"
              className="!px-5"
              onClick={() => handleStep1()}
            >
              Continue <ArrowRight />
            </FormButton>
          </>
        ) : null}

        {/* Step 2 */}
        {step === 2 ? (
          <>
            <header className="space-y-2">
              {step > 1 ? (
                <Button
                  type="button"
                  role="button"
                  variant="ghost"
                  className="!p-0 hover:cursor-pointer hover:!bg-transparent"
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  <ArrowLeft />
                  Back
                </Button>
              ) : null}

              <div className="flex items-center gap-2">
                <GraduationCap className="text-primary h-5 w-5" />
                <h1 className="!text-xl">About Your Program</h1>
              </div>
              <p className="text-muted-foreground text-md">
                Tell us about your educational program and institution.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your last name" />
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
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Provide your email address"
                      />
                    </FormControl>
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
                      <PhoneInput
                        placeholder="Enter your phone number"
                        id="phoneNumber"
                        defaultcountry="NG"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* School Combobox */}
            <FormField
              control={form.control}
              name="schoolSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What school will you be attending?</FormLabel>
                  <FormControl>
                    <SchoolComboboxSearch
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Program Combobox */}
            <FormField
              control={form.control}
              name="programSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What program are you enrolling in?</FormLabel>
                  <FormControl>
                    <ProgramComboboxSearch
                      setProgram={setProgram}
                      schoolSlug={schoolSlug}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Study Level */}
            <FormField
              control={form.control}
              name="studyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What level of study?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        id="studyLevel"
                        className="w-full capitalize"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["graduate", "undergraduate"].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PGWP */}
            <FormField
              control={form.control}
              name="pgwp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is your program PGWP-eligible?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        id="post-graduate-work-permit"
                        className="w-full capitalize"
                      >
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["yes", "no", "not sure"].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Offer Letter */}
            <FormField
              control={form.control}
              name="hasOfferLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Do you already have an offer/admission letter?
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        id="offer-letter"
                        className="w-full capitalize"
                      >
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["yes", "no"].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton
              type="button"
              role="button"
              className="!px-5"
              disabled={!program}
              onClick={() => handleStep2()}
            >
              Continue <ArrowRight />
            </FormButton>
          </>
        ) : null}

        {/* Step 3 */}
        {step === 3 ? (
          <>
            <header className="space-y-2">
              {step > 1 ? (
                <Button
                  type="button"
                  role="button"
                  variant="ghost"
                  className="!p-0 hover:cursor-pointer hover:!bg-transparent"
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  <ArrowLeft />
                  Back
                </Button>
              ) : null}

              <div className="flex items-center gap-2">
                <DollarSign className="text-primary h-5 w-5" />
                <h1 className="!text-xl">What Do You Need Covered?</h1>
              </div>
              <p className="text-muted-foreground text-md">
                Help us understand your financial requirements for studying
                abroad.
              </p>
            </header>

            {/* Loan Type */}
            <FormField
              control={form.control}
              name="loanType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What type of loan are you looking for?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        id="loanType"
                        className="w-full capitalize"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["tuition", "tuition + living expenses"].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {loanType === "tuition" ? (
              <FormField
                control={form.control}
                name="livingExpensesCoverage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you have enough funds to cover living expenses on your
                      own?{" "}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          id="livingExpensesCoverage"
                          className="w-full capitalize"
                        >
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["yes", "no"].map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {loanType === "tuition + living expenses" ? (
              <div className="bg-primary/10 border-primary/20 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-primary mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-primary text-sm font-medium">
                      Comprehensive Coverage
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Passage may offer both tuition and living coverage. We'll
                      verify your eligibility shortly.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <FormButton
              type="button"
              role="button"
              className="!px-5"
              onClick={() => handleStep3()}
            >
              Continue <ArrowRight />
            </FormButton>
          </>
        ) : null}

        {/* Step 4 */}
        {step === 4 ? (
          <>
            <header className="space-y-2">
              {step > 1 ? (
                <Button
                  type="button"
                  role="button"
                  variant="ghost"
                  className="!p-0 hover:cursor-pointer hover:!bg-transparent"
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  <ArrowLeft />
                  Back
                </Button>
              ) : null}

              <div className="flex items-center gap-2">
                <Calendar className="text-primary h-5 w-5" />
                <h1 className="!text-xl">Enrollment Status</h1>
              </div>
              <p className="text-muted-foreground text-md">
                Tell us about your current enrollment status and academic
                performance.
              </p>
            </header>

            {/* Program Started */}
            <FormField
              control={form.control}
              name="programStarted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you already started your program?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        id="program-started"
                        className="w-full capitalize"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["yes", "no"].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {programStarted === "yes" ? (
              <FormField
                control={form.control}
                name="gpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's your current GPA?</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step={0.1}
                        max={100}
                        min={1}
                        placeholder="eg 3.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="nextSchoolTerm"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>When does your next school term start?</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={
                        field.value ? new Date(field.value) : new Date()
                      }
                      mode="single"
                      onSelect={(val) => {
                        if (val) {
                          field.onChange(+val);
                        } else {
                          field.onChange(Date.now());
                        }
                      }}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton
              type="button"
              role="button"
              className="!px-5"
              onClick={() => handleStep4()}
            >
              Continue <ArrowRight />
            </FormButton>
          </>
        ) : null}

        {/* Step 5 */}
        {step === 5 ? (
          <>
            {!eligibilityDecision ? (
              <div className="space-y-5">
                <p className="bg-destructive/10 border-destructive/10 text-destructive text-md rounded-lg border px-6 py-4">
                  Something went wrong, please start eligibility check afresh
                </p>
                <Button
                  variant="outline"
                  type="button"
                  role="button"
                  className="w-full"
                  onClick={() => {
                    brandClientApi.storage.localStorage.deleteItem(
                      "financial-aid-eligibility",
                    );
                    router.refresh();
                  }}
                >
                  Restart Eligibility Check
                </Button>
              </div>
            ) : eligibilityDecision.isEligible ? (
              <div className="space-y-5">
                <header className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="text-primary h-5 w-5" />
                    <h1 className="!text-xl">You're Eligible!</h1>
                  </div>
                  <p className="text-muted-foreground text-md">
                    Based on your profile, here are your loan options.
                  </p>
                </header>

                <div className="space-y-4">
                  {eligibilityDecision.partners.includes("mpower") ? (
                    <div className="rounded-lg border bg-green-600/10 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-green-600">
                            MPOWER Loan
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Based on your GPA, program start date, and school.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {eligibilityDecision.partners.includes("passage") ? (
                    <div className="rounded-lg border bg-green-600/10 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-green-600">
                            Passage Loan
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Based on your program, country, and financial needs.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {eligibilityDecision.recommendation ? (
                  <div className="rounded-lg border border-sky-600/20 bg-sky-600/5 p-4">
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-5 w-5 text-sky-600" />
                      <div>
                        <p className="text-sm font-medium text-sky-600">
                          Our Recommendation
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          We recommend{" "}
                          <strong>{eligibilityDecision.recommendation}</strong>{" "}
                          as your best match based on your profile. You can
                          continue with this recommendation or explore both
                          options.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {eligibilityDecision.partners.includes("mpower") ? (
                    <FormButton
                      type="button"
                      role="button"
                      onClick={() => handleStep5("mpower")}
                    >
                      Proceed with MPOWER
                    </FormButton>
                  ) : null}

                  {eligibilityDecision.partners.includes("passage") ? (
                    <FormButton
                      type="button"
                      role="button"
                      onClick={() => handleStep5("passage")}
                    >
                      Proceed with Passage
                    </FormButton>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <header className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="text-primary h-5 w-5" />
                    <h1 className="!text-xl">You're not Eligible!</h1>
                  </div>
                </header>

                <p className="bg-destructive/10 border-destructive/10 text-destructive text-md rounded-lg border px-6 py-4">
                  {eligibilityDecision.message}
                </p>
                <Button
                  type="button"
                  role="button"
                  asChild
                  onClick={() =>
                    brandClientApi.storage.localStorage.deleteItem(
                      "financial-aid-eligibility",
                    )
                  }
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            )}
          </>
        ) : null}

        {/* Step 6 */}
        {step === 6 ? (
          <>
            <header className="space-y-2">
              {step > 1 ? (
                <Button
                  type="button"
                  role="button"
                  variant="ghost"
                  className="!p-0 hover:cursor-pointer hover:!bg-transparent"
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  <ArrowLeft />
                  Back
                </Button>
              ) : null}

              <div className="flex items-center gap-2">
                <DollarSign className="text-primary h-5 w-5" />
                <h1 className="!text-xl">Upload Your Documents</h1>
              </div>
              <p className="text-muted-foreground text-md">
                To finalize your pre-approval, we need a few documents.
              </p>
            </header>

            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
              {/* Identification */}
              <FormField
                control={form.control}
                name="identification"
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* <FormLabel>Identification</FormLabel> */}
                    {identification ? (
                      <div
                        className={`flex items-center justify-between rounded-lg border px-4`}
                      >
                        <p className="text-sm font-semibold">Identification</p>
                        <Button
                          type="button"
                          role="button"
                          variant="ghost"
                          size="icon"
                          className="!p-0"
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
                            "application/pdf": [".pdf"],
                          }}
                          extensions={[".pdf"]}
                          maxSize={2}
                          setError={(message) =>
                            form.setError("identification", {
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
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                    <FormDescription>
                      Passport or government-issued ID
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Proof of address */}
              <FormField
                control={form.control}
                name="proofOfAddress"
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* <FormLabel>Proof of Address</FormLabel> */}
                    {proofOfAddress ? (
                      <div
                        className={`flex items-center justify-between rounded-lg border px-4`}
                      >
                        <p className="text-sm font-semibold">
                          Proof of Address
                        </p>
                        <Button
                          type="button"
                          role="button"
                          variant="ghost"
                          size="icon"
                          className="!p-0"
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
                            "application/pdf": [".pdf"],
                          }}
                          extensions={[".pdf"]}
                          maxSize={2}
                          setError={(message) =>
                            form.setError("proofOfAddress", {
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
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                    <FormDescription>Proof of Address</FormDescription>
                  </FormItem>
                )}
              />

              {/* Resume */}
              <FormField
                control={form.control}
                name="resume"
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* <FormLabel>Resume</FormLabel> */}
                    {resume ? (
                      <div
                        className={`flex items-center justify-between rounded-lg border px-4`}
                      >
                        <p className="text-sm font-semibold">Resume</p>
                        <Button
                          type="button"
                          role="button"
                          variant="ghost"
                          size="icon"
                          className="!p-0"
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
                            "application/pdf": [".pdf"],
                          }}
                          extensions={[".pdf"]}
                          maxSize={2}
                          setError={(message) =>
                            form.setError("resume", {
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
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                    <FormDescription>Resume / CV</FormDescription>
                  </FormItem>
                )}
              />

              {/* Transcript */}
              <FormField
                control={form.control}
                name="transcript"
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* <FormLabel>Transcript</FormLabel> */}
                    {transcript ? (
                      <div
                        className={`flex items-center justify-between rounded-lg border px-4`}
                      >
                        <p className="text-sm font-semibold">
                          Transcript / GPA Report
                        </p>
                        <Button
                          type="button"
                          role="button"
                          variant="ghost"
                          size="icon"
                          className="!p-0"
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
                            "application/pdf": [".pdf"],
                          }}
                          extensions={[".pdf"]}
                          maxSize={2}
                          setError={(message) =>
                            form.setError("transcript", {
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
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                    <FormDescription>Transcript / GPA Report</FormDescription>
                  </FormItem>
                )}
              />

              {/* Bank Statement */}
              {loanType === "tuition" ? (
                <FormField
                  control={form.control}
                  name="bankStatement"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      {/* <FormLabel>Bank Statement</FormLabel> */}
                      {bankStatement ? (
                        <div
                          className={`flex items-center justify-between rounded-lg border px-4`}
                        >
                          <p className="text-sm font-semibold">
                            Bank Statement / Scholarship Letter
                          </p>
                          <Button
                            type="button"
                            role="button"
                            variant="ghost"
                            size="icon"
                            className="!p-0"
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
                              "application/pdf": [".pdf"],
                            }}
                            extensions={[".pdf"]}
                            maxSize={2}
                            setError={(message) =>
                              form.setError("bankStatement", {
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
                          />
                        </FormControl>
                      )}
                      <FormMessage />
                      <FormDescription>
                        Bank Statement / Scholarship Letter
                      </FormDescription>
                    </FormItem>
                  )}
                />
              ) : null}

              {/* Immigration Document */}
              <FormField
                control={form.control}
                name="immigrationDocument"
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* <FormLabel>Immigration Document</FormLabel> */}
                    {immigrationDocument ? (
                      <div
                        className={`flex items-center justify-between rounded-lg border px-4`}
                      >
                        <p className="text-sm font-semibold">
                          Immigration Document
                        </p>
                        <Button
                          type="button"
                          role="button"
                          variant="ghost"
                          size="icon"
                          className="!p-0"
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
                            "application/pdf": [".pdf"],
                          }}
                          extensions={[".pdf"]}
                          maxSize={2}
                          setError={(message) =>
                            form.setError("immigrationDocument", {
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
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                    <FormDescription>Immigration Document</FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> We will review your documents within 3-5
                business days. If anything is missing, we'll contact you.
              </p>
            </div>

            <FormButton
              type="submit"
              className="!px-5"
              isLoading={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              Submit & Continue <ArrowRight />
            </FormButton>
          </>
        ) : null}

        {/* Step 7 */}
        {step === 7 ? (
          <>
            <header className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <h1 className="!text-xl">You're Almost There!</h1>
              </div>
              <p className="text-muted-foreground text-md">
                Thank you for submitting your documents. Our team is reviewing
                them.
              </p>
            </header>
            <div className="space-y-10 text-center">
              <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle className="text-primary h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Application Submitted Successfully!
                </h3>
                <p className="text-muted-foreground">
                  You'll be notified as soon as your loan offer is ready.
                </p>
              </div>

              <div className="grid gap-3">
                <Button
                  variant="outline"
                  type="button"
                  role="button"
                  onClick={() => router.replace("/loans")}
                  className="w-full bg-transparent"
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </form>
    </Form>
  );
};
export default FinancialAidEligibilityForm;
