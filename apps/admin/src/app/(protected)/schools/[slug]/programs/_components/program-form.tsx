"use client";

import {
  CreateProgramSchema,
  degreeTypes,
  educationLevels,
  EnglishProficiency,
  IIntake,
  IProgram,
  ISchool,
  timeframe,
  tuitionFeeType,
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { useFieldArray, useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback, useMemo, useState } from "react";
import AddIntakesForm from "./add-intakes-form";
import { brandClientApi } from "@/src/lib/client";
import { FormButton } from "@workspace/ui/components/form-button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { createProgram, updateProgram } from "../../../_actions";
import { Switch } from "@workspace/ui/components/switch";
import { IntakeStatus } from "@workspace/ui/components/intake-status";
import ProgramProficiencyForm from "./program-proficiency-form";
import { ProficiencyDisplay } from "@workspace/ui/components/proficiency-display";
import { Button } from "@workspace/ui/components/button";
import { Trash2 } from "lucide-react";
import FinancialAidsForm from "./financial-aids-form";
import { FinancialAidPartner } from "@workspace/ui/components/financial-aid-partner";

interface Props {
  /** School slug */
  school: ISchool;
  program?: IProgram;
}

const ProgramForm: React.FC<Props> = ({ program, school }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedIntakes, setSelectedIntakes] = useState<IIntake[]>(
    program?.intakes || [],
  );
  const form = useForm<CreateProgramSchema>({
    resolver: zodResolver(CreateProgramSchema),
    defaultValues: {
      type: "single",
      data: {
        name: program?.name || "",
        slug: program?.slug || "",
        faculty: program?.faculty || "",
        degreeType: program?.degreeType || (degreeTypes[0] as any),
        applicationFee: program?.applicationFee || 100,
        applicationFeeDiscount: program?.applicationFeeDiscount || 0,
        tuitionFee: program?.tuitionFee || 22500.99,
        tuitionFeeType: program?.tuitionFeeType || (tuitionFeeType[0] as any),
        timeframe: program?.timeframe || (timeframe[2] as any),
        duration: program?.duration || 18,
        minimumEducationLevel: program?.minimumEducationLevel || "primary",
        minimumEducationDegree: program?.minimumEducationDegree || 1,
        minimumEligibilityGpa: program?.minimumEligibilityGpa || 1,
        financialAids: program?.financialAids || [],
        proficiencies: program?.proficiencies || [],
        intakes: program?.intakes.map((itk) => itk.id) || [],
        overview: program?.overview || "",
        description: program?.description || "",
        requirements: program?.requirements || "",
        pgwp: program?.pgwp || false,
      },
    },
  });

  const onSubmit = useCallback(async (data: CreateProgramSchema) => {
    try {
      let res;
      if (program) {
        // * Update
        const serverRes = await updateProgram(school.slug, program.slug, data);
        res = brandClientApi.utils.handleServerActionResponse(serverRes);
      } else {
        // * Create
        const serverRes = await createProgram(school.slug, data);
        res = brandClientApi.utils.handleServerActionResponse(serverRes);
      }
      brandClientApi.utils.toast.success(res.message);

      if (!program) {
        queryClient.invalidateQueries({
          queryKey: [`programs-${school.slug}`],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [`schools-${school.slug}-programs-${program.slug}`],
        });
      }

      router.back();
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  // * Watch
  const mel = form.watch("data.minimumEducationLevel");
  // const melDegree = form.watch("data.minimumEducationDegree");
  const tf = form.watch("data.timeframe");

  // * Grading Schemes
  // const {
  //   gradingScale,
  //   setGradingScale,
  //   selectedGradingScheme,
  //   setSelectedGradingScheme,
  //   gradingSchemes,
  // } = useGradingScheme({
  //   mel,
  //   melDegree,
  // });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Program Name */}
        <FormField
          control={form.control}
          name="data.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                    form.setValue("data.slug", val);
                  }}
                  placeholder="Bachelor of Art in Fine Arts"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Faculty */}
        <FormField
          control={form.control}
          name="data.faculty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Faculty of Arts or the Faculty of Humanities"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Degree */}
        <FormField
          control={form.control}
          name="data.degreeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="degreeType" className="w-full capitalize">
                    <SelectValue placeholder="Select a degree" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {degreeTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Application Fee */}
        <FormField
          control={form.control}
          name="data.applicationFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Fee ({school.currency})</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Application Fee Discount */}
        <FormField
          control={form.control}
          name="data.applicationFeeDiscount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Fee Discount (%)</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} min={0} max={100} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tuition Fee */}
        <FormField
          control={form.control}
          name="data.tuitionFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tuition Fee ({school.currency})</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tuition Fee Type */}
        <FormField
          control={form.control}
          name="data.tuitionFeeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tuition Fee Coverage</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    id="tuitionFeeType"
                    className="w-full capitalize"
                  >
                    <SelectValue placeholder="Select a coverage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tuitionFeeType.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Timeframe */}
        <FormField
          control={form.control}
          name="data.timeframe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Timeframe</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="timeframe" className="w-full capitalize">
                    <SelectValue placeholder="Select a timeframe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeframe.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type + "'s"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Program Duration */}
        <FormField
          control={form.control}
          name="data.duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Length</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.1} min={1} />
              </FormControl>
              <FormDescription>Program length in {tf}'s</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Minimum Education Level */}
        <FormField
          control={form.control}
          name="data.minimumEducationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Education Level</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  form.setValue("data.minimumEducationDegree", 0);
                  // setSelectedGradingScheme("");
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    id="minimumEducationLevel"
                    className="w-full capitalize"
                  >
                    <SelectValue placeholder="Select a MEL" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "primary",
                    "secondary",
                    "undergraduate",
                    "postgraduate",
                  ].map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Minimum Education Degree */}
        <FormField
          control={form.control}
          name="data.minimumEducationDegree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Education Degree</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  // setSelectedGradingScheme("");
                }}
                value={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger
                    id="minimumEducationLevel"
                    className="w-full capitalize"
                  >
                    <SelectValue placeholder="Select a MEL Degree" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {educationLevels[mel]?.map(({ level, levelValue }) => (
                    <SelectItem
                      key={level}
                      value={`${levelValue}`}
                      className="capitalize"
                    >
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grade Point Average */}
        <FormField
          control={form.control}
          name="data.minimumEligibilityGpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Grading Point Average</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step={0.1}
                  max={100}
                  min={1}
                  placeholder="Minimum GPA"
                />
              </FormControl>
              <FormDescription>
                Minimum cumulative grade point average (%)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Grading Scheme */}
        {/* <FormItem>
          <FormLabel>Grading Scheme</FormLabel>
          <Select
            onValueChange={(val) => {
              const sch = val as typeof selectedGradingScheme;
              setSelectedGradingScheme(sch);

              if (sch) {
                if (sch === "others" || schemes[sch].averages) {
                  setGradingScale(null);
                } else {
                  const scale = schemes[sch];
                  setGradingScale({
                    max: scale.max,
                    min: scale.min,
                    step: scale.step,
                  });
                }
              }

              form.setValue("data.minimumEligibilityGpa", 0);
            }}
            value={selectedGradingScheme}
          >
            <FormControl>
              <SelectTrigger id="gradingScheme" className="w-full capitalize">
                <SelectValue placeholder="Select a grading scheme" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {gradingSchemes.map((scheme) => (
                <SelectItem key={scheme} value={scheme} className="capitalize">
                  {scheme.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem> */}

        {/* Grading Scale */}
        {/* {selectedGradingScheme && selectedGradingScheme === "others" ? (
          <FormItem>
            <FormLabel>Grading Scale</FormLabel>
            <Select
              onValueChange={(val) => {
                if (val) {
                  setGradingScale(JSON.parse(val));
                }
              }}
              value={gradingScale ? JSON.stringify(gradingScale) : ""}
            >
              <FormControl>
                <SelectTrigger id="gradingScale" className="w-full capitalize">
                  <SelectValue placeholder="Select a grading scale">
                    <p>{gradingScale?.max}</p>
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[
                  {
                    max: 4,
                    min: 1,
                    steps: 0.1,
                  },
                  {
                    max: 5,
                    min: 1,
                    steps: 0.1,
                  },
                  {
                    max: 7,
                    min: 1,
                    steps: 0.1,
                  },
                  {
                    max: 10,
                    min: 1,
                    steps: 0.1,
                  },
                  {
                    max: 20,
                    min: 1,
                    steps: 0.1,
                  },
                  {
                    max: 100,
                    min: 1,
                    steps: 0.1,
                  },
                ].map((scale) => (
                  <SelectItem
                    key={`${scale.max}`}
                    value={JSON.stringify(scale)}
                    className="capitalize"
                  >
                    {scale.max}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        ) : null} */}

        {/* Grade Point Average */}
        {/* {selectedGradingScheme &&
        (gradingScale ||
          (selectedGradingScheme !== "others" &&
            schemes[selectedGradingScheme].averages)) ? (
          gradingScale ? (
            <FormField
              control={form.control}
              name="data.minimumEligibilityGpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Grading Point Average</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step={gradingScale.step}
                      max={gradingScale.max}
                      min={gradingScale.min}
                      placeholder="Minimum GPA"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="data.minimumEligibilityGpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Grading Point Average</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger
                        id="minimumEligibilityGpa"
                        className="w-full capitalize"
                      >
                        <SelectValue placeholder="Select a GPA" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(selectedGradingScheme !== "others"
                        ? schemes[selectedGradingScheme].averages || []
                        : []
                      ).map((type) => (
                        <SelectItem
                          key={type.label}
                          value={`${type.value}`}
                          className="capitalize"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        ) : null} */}

        {/* Financial Aids */}
        <FormField
          control={form.control}
          name="data.financialAids"
          render={({ field }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2">
                <FormLabel>Financial Aids</FormLabel>
                <FinancialAidsForm
                  aids={field.value}
                  onChange={field.onChange}
                />
              </div>
              <FormControl>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                  {field.value.length ? (
                    field.value.map((aid) => (
                      <div
                        className="flex items-center rounded-md border px-4 py-1"
                        key={aid}
                      >
                        <div className="flex-1">
                          <FinancialAidPartner name={aid} />
                        </div>

                        <Button
                          type="button"
                          role="button"
                          variant="ghost"
                          onClick={() =>
                            field.onChange(field.value.filter((v) => v !== aid))
                          }
                        >
                          <Trash2 className="text-destructive" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center md:col-span-2 lg:col-span-4">
                      <p className="text-sm">No Financial Aid </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PGWP */}
        <FormField
          control={form.control}
          name="data.pgwp"
          render={({ field }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <FormLabel>PGWP</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                  <div className="flex-1">
                    <FormDescription>
                      Does this program offer Post Graduate Work Permit?
                    </FormDescription>
                  </div>

                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Proficiencies */}
        <FormField
          control={form.control}
          name="data.proficiencies"
          render={({ field }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2">
                <FormLabel>English Proficiencies</FormLabel>
                <ProgramProficiencyForm
                  proficiencies={field.value}
                  onChange={(data) => field.onChange([...field.value, data])}
                />
              </div>
              <FormControl>
                <div className="grid grid-cols-1 gap-1 rounded-lg border p-2 md:grid-cols-2 lg:grid-cols-4">
                  {field.value.length ? (
                    field.value.map(({ test, score }) => {
                      const cefr = EnglishProficiency.getCefr(test, score);

                      return (
                        <div className="flex items-center" key={test}>
                          <div className="flex-1">
                            <ProficiencyDisplay
                              key={test}
                              test={test}
                              name={cefr.name}
                              tags={cefr.tags}
                              score={score}
                              slim
                            />
                          </div>

                          <Button
                            type="button"
                            role="button"
                            variant="ghost"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((v) => v.test !== test),
                              )
                            }
                          >
                            <Trash2 className="text-destructive" />
                          </Button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center md:col-span-2 lg:col-span-4">
                      <p className="text-sm">No Proficiency Added</p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Intakes */}
        <FormField
          control={form.control}
          name="data.intakes"
          render={({ field }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2">
                <FormLabel>Intakes</FormLabel>
                <AddIntakesForm
                  schoolSlug={school.slug}
                  selectedIntakes={selectedIntakes}
                  onChange={(isSelected, intake) => {
                    if (isSelected) {
                      setSelectedIntakes((prev) => [...prev, intake]);
                      field.onChange([...field.value, intake.id]);
                    } else {
                      setSelectedIntakes(
                        selectedIntakes.filter((itk) => itk.id !== intake.id),
                      );
                      field.onChange(
                        field.value.filter((id) => id !== intake.id),
                      );
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-1 rounded-lg border p-2 md:grid-cols-2 lg:grid-cols-4">
                {field.value.length ? (
                  field.value.map((id) => {
                    const intake = selectedIntakes.find((itk) => itk.id === id);

                    return intake ? (
                      <div
                        key={`${id}`}
                        className="flex w-full items-center justify-between rounded-lg border px-4 py-2"
                      >
                        <p className="text-sm font-semibold">{intake.intake}</p>
                        <IntakeStatus
                          status={intake.status}
                          classNames="text-xs !px-2"
                        />
                      </div>
                    ) : null;
                  })
                ) : (
                  <div className="flex items-center justify-center md:col-span-2 lg:col-span-4">
                    <p className="text-sm">No Intake Added</p>
                  </div>
                )}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Overview */}
        <FormField
          control={form.control}
          name="data.overview"
          render={({ field }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <FormLabel htmlFor="overview">Overview</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Brief overview about this program`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Requirements */}
        <FormField
          control={form.control}
          name="data.requirements"
          render={({ field, fieldState }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <FormLabel htmlFor="description">Program Requirements</FormLabel>
              <FormControl>
                <Editor
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  content={field.value}
                  editable={!form.formState.isSubmitting}
                  className="max-h-[400px]"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Program requirements / prerequisites
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="data.description"
          render={({ field, fieldState }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Editor
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  content={field.value}
                  editable={!form.formState.isSubmitting}
                  className="max-h-[400px]"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Detailed description about this program
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="md:col-span-2 lg:col-span-3">
          <FormButton
            variant="brand"
            className="w-full md:w-fit"
            isLoading={form.formState.isSubmitting}
          >
            {program ? "Update" : "Create"} Program
          </FormButton>
        </div>
      </form>
    </Form>
  );
};

export default ProgramForm;
