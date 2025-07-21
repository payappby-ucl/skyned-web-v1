"use client";

import { brandClientApi } from "@/src/lib/client";
import {
  CreateProgramSchema,
  degreeTypes,
  educationLevels,
  EnglishProficiency,
  IIntake,
  ISchool,
  timeframe,
  tuitionFeeType,
} from "@workspace/shared";
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
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import UploadGuideline from "./program-template";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormButton } from "@workspace/ui/components/form-button";
import { Download, Trash2, Upload } from "lucide-react";
import { getActiveIntakes } from "../_actions/server";
import {
  generateProgramUploadTemplate,
  generateUploadFormData,
} from "../_actions/client";
import { useAuthContext } from "@/src/components/providers/auth-provider";
import { Input } from "@workspace/ui/components/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { Editor } from "@workspace/ui/components/editor";
import { Button } from "@workspace/ui/components/button";
import { ProficiencyDisplay } from "@workspace/ui/components/proficiency-display";
import ProgramProficiencyForm from "../../_components/program-proficiency-form";
import { IntakeStatus } from "@workspace/ui/components/intake-status";
import AddIntakesForm from "../../_components/add-intakes-form";
import { useRouter } from "next/navigation";
import { createProgram } from "../../../../_actions";

interface Props {
  school: ISchool;
}
const UploadForm: React.FC<Props> = ({ school }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { auth } = useAuthContext();
  const [activeIntakes, setActiveIntakes] = useState<IIntake[] | null>(null);

  const form = useForm<CreateProgramSchema>({
    resolver: zodResolver(CreateProgramSchema),
    defaultValues: {
      type: "bulk",
      data: [],
    },
  });

  const onSubmit = useCallback(async (data: CreateProgramSchema) => {
    try {
      const programs = data.data as Extract<CreateProgramSchema["data"], any[]>;
      while (programs.length) {
        let batch;
        if (programs.length > 500) {
          batch = programs.splice(0, 500);
        } else {
          batch = programs.splice(0);
        }

        const serverRes = await createProgram(school.slug, {
          type: data.type,
          data: batch,
        });
        brandClientApi.utils.handleServerActionResponse(serverRes);
        brandClientApi.utils.toast.success(
          `${batch.length} programs uploaded.`,
        );
      }

      brandClientApi.utils.toast.success("Upload Completed");

      queryClient.invalidateQueries({
        queryKey: [`programs-${school.slug}`],
      });
      form.reset();
      router.back();
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  // * Watched
  const programData = form.watch("data");

  // * Template Operations
  const downloadTemplateMutation = useMutation({
    mutationFn: async () => {
      try {
        const serverRes = await getActiveIntakes(school.slug);
        const res = brandClientApi.utils.handleServerActionResponse(serverRes);

        const intakes = res.data;

        if (!intakes.length) {
          throw new Error(
            "No active (open, likely open) intakes found. Please add intakes",
          );
        }

        await generateProgramUploadTemplate({
          school,
          intakes,
          creator: `${auth.user?.firstName} ${auth.user?.lastName}`,
        });
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    },
  });

  useEffect(() => {
    const fetchActiveIntakes = async () => {
      try {
        const serverRes = await getActiveIntakes(school.slug);
        const res = brandClientApi.utils.handleServerActionResponse(serverRes);

        const intakes = res.data;
        setActiveIntakes(intakes);
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    };
    if (!activeIntakes && school) {
      fetchActiveIntakes();
    }
  }, [school]);

  console.log(form);

  return (
    <section className="h-full !p-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="data"
            render={({ field, fieldState }) => (
              <FormItem>
                {Array.isArray(field.value) && field.value.length ? (
                  <Table>
                    <TableCaption>
                      Please Review carefully before uploading.
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Degree</TableHead>
                        <TableHead>
                          Application Fee ({school.currency})
                        </TableHead>
                        <TableHead>Application Fee Discount (%)</TableHead>
                        <TableHead>Tuition Fee ({school.currency})</TableHead>
                        <TableHead>Tuition Fee Coverage</TableHead>
                        <TableHead>Timeframe</TableHead>
                        <TableHead>Program Length</TableHead>
                        <TableHead>Minimum Education Level</TableHead>
                        <TableHead>Minimum Education Degree</TableHead>
                        <TableHead>Minimum Grading Point Average</TableHead>
                        <TableHead>PGWP</TableHead>
                        <TableHead>English Proficiencies</TableHead>
                        <TableHead>Intakes</TableHead>
                        <TableHead>Overview</TableHead>
                        <TableHead>Program Requirements</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {field.value.map((v, idx) => {
                        // * Watch
                        const mel = form.watch(
                          `data.${idx}.minimumEducationLevel`,
                        );

                        return (
                          <FormField
                            key={`program_item_${idx}`}
                            control={form.control}
                            name={`data.${idx}`}
                            render={({ field }) => (
                              <TableRow>
                                {/* Name */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.name`}
                                    render={({ field }) => (
                                      <FormItem className="min-w-[300px]">
                                        <FormControl>
                                          <Input
                                            {...field}
                                            onChange={(e) => {
                                              const val = e.target.value;
                                              field.onChange(val);
                                              form.setValue(
                                                `data.${idx}.slug`,
                                                val,
                                              );
                                            }}
                                            placeholder="Program Name"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Faculty */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.faculty`}
                                    render={({ field }) => (
                                      <FormItem className="min-w-[300px]">
                                        <FormControl>
                                          <Input
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Faculty"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Degree */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.degreeType`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger
                                                id="degreeType"
                                                className="w-full capitalize"
                                              >
                                                <SelectValue placeholder="Select a degree" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {degreeTypes.map((type) => (
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
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Application Fee */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.applicationFee`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="number"
                                            step={0.01}
                                            min={0}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Application Fee Discount */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.applicationFeeDiscount`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="number"
                                            step={0.01}
                                            min={0}
                                            max={100}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Tuition Fee */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.tuitionFee`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="number"
                                            step={0.01}
                                            min={0}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Tuition Fee Coverage */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.tuitionFeeType`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
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
                                              <SelectItem
                                                key={type}
                                                value={type}
                                                className="capitalize"
                                              >
                                                {type.replaceAll("_", " ")}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Timeframe */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.timeframe`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger
                                              id="timeframe"
                                              className="w-full capitalize"
                                            >
                                              <SelectValue placeholder="Select a timeframe" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {timeframe.map((type) => (
                                              <SelectItem
                                                key={type}
                                                value={type}
                                                className="capitalize"
                                              >
                                                {type + "'s"}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Duration*/}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.duration`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="number"
                                            step={0.1}
                                            min={1}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Minimum Education Level */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.minimumEducationLevel`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          onValueChange={(val) => {
                                            field.onChange(val);
                                            form.setValue(
                                              `data.${idx}.minimumEducationDegree`,
                                              0,
                                            );
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
                                              <SelectItem
                                                key={type}
                                                value={type}
                                                className="capitalize"
                                              >
                                                {type.replaceAll("_", " ")}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Minimum Education Degree */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.minimumEducationDegree`}
                                    render={({ field }) => (
                                      <FormItem>
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
                                            {educationLevels[mel].map(
                                              ({ level, levelValue }) => (
                                                <SelectItem
                                                  key={level}
                                                  value={`${levelValue}`}
                                                  className="capitalize"
                                                >
                                                  {level}
                                                </SelectItem>
                                              ),
                                            )}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Grade Point Average */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.minimumEligibilityGpa`}
                                    render={({ field }) => (
                                      <FormItem>
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
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/*PGWP */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.pgwp`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                                            <div className="flex-1">
                                              <FormDescription>
                                                Does this program offer Post
                                                Graduate Work Permit?
                                              </FormDescription>
                                            </div>

                                            <Switch
                                              checked={field.value}
                                              onCheckedChange={field.onChange}
                                            />
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Proficiencies */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.proficiencies`}
                                    render={({ field }) => (
                                      <FormItem className="min-w-[200px]">
                                        <FormControl>
                                          <div className="flex flex-wrap items-center gap-2">
                                            {field.value.length ? (
                                              field.value.map(
                                                ({ test, score }) => {
                                                  const cefr =
                                                    EnglishProficiency.getCefr(
                                                      test,
                                                      score,
                                                    );

                                                  return (
                                                    <div
                                                      className="flex items-center"
                                                      key={test}
                                                    >
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
                                                            field.value.filter(
                                                              (v) =>
                                                                v.test !== test,
                                                            ),
                                                          )
                                                        }
                                                      >
                                                        <Trash2 className="text-destructive" />
                                                      </Button>
                                                    </div>
                                                  );
                                                },
                                              )
                                            ) : (
                                              <div className="flex items-center justify-center gap-2 md:col-span-2 lg:col-span-4">
                                                <p className="text-sm">
                                                  No Proficiency Added
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        </FormControl>
                                        <ProgramProficiencyForm
                                          proficiencies={field.value}
                                          onChange={(data) =>
                                            field.onChange([
                                              ...field.value,
                                              data,
                                            ])
                                          }
                                        />
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/*Intakes */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.intakes`}
                                    render={({ field }) => (
                                      <FormItem className="min-w-[200px]">
                                        <div className="flex max-h-[200px] flex-wrap items-center gap-2 overflow-y-scroll">
                                          {field.value.length ? (
                                            field.value.map((id) => {
                                              const intake = (
                                                activeIntakes || []
                                              ).find((itk) => itk.id === id);

                                              return intake ? (
                                                <div
                                                  key={`${id}`}
                                                  className="flex w-full items-center justify-between rounded-lg border px-4 py-2"
                                                >
                                                  <p className="text-sm font-semibold">
                                                    {intake.intake}
                                                  </p>
                                                  <IntakeStatus
                                                    status={intake.status}
                                                    classNames="text-xs !px-2"
                                                  />
                                                </div>
                                              ) : null;
                                            })
                                          ) : (
                                            <div className="flex items-center justify-center md:col-span-2 lg:col-span-4">
                                              <p className="text-sm">
                                                No Intake Added
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <AddIntakesForm
                                            schoolSlug={school.slug}
                                            selectedIntakes={(
                                              activeIntakes || []
                                            ).filter((itk) =>
                                              field.value.includes(itk.id),
                                            )}
                                            onChange={(isSelected, intake) => {
                                              if (
                                                !activeIntakes?.find(
                                                  (it) => it.id === intake.id,
                                                )
                                              ) {
                                                setActiveIntakes((prev) => [
                                                  ...(prev || []),
                                                  intake,
                                                ]);
                                              }

                                              if (isSelected) {
                                                field.onChange([
                                                  ...field.value,
                                                  intake.id,
                                                ]);
                                              } else {
                                                field.onChange(
                                                  field.value.filter(
                                                    (id) => id !== intake.id,
                                                  ),
                                                );
                                              }
                                            }}
                                          />
                                        </div>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Overview */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.overview`}
                                    render={({ field }) => (
                                      <FormItem className="min-w-[500px]">
                                        <FormControl>
                                          <Textarea
                                            placeholder={`Brief overview about this program`}
                                            {...field}
                                            className="h-[235px]"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Requirements */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.requirements`}
                                    render={({ field, fieldState }) => (
                                      <FormItem className="min-w-[800px]">
                                        <FormControl>
                                          <Editor
                                            onChange={field.onChange}
                                            invalid={fieldState.invalid}
                                            content={field.value}
                                            editable={
                                              !form.formState.isSubmitting
                                            }
                                            className="max-h-[200px] !min-h-[200px]"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                {/* Description */}
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`${field.name}.description`}
                                    render={({ field, fieldState }) => (
                                      <FormItem className="min-w-[800px]">
                                        <FormControl>
                                          <Editor
                                            onChange={field.onChange}
                                            invalid={fieldState.invalid}
                                            content={field.value}
                                            editable={
                                              !form.formState.isSubmitting
                                            }
                                            className="max-h-[200px] !min-h-[200px]"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                              </TableRow>
                            )}
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    <UploadGuideline>
                      <FormButton
                        type="button"
                        role="button"
                        variant="outline"
                        className="text-sm"
                        isLoading={downloadTemplateMutation.isPending}
                        onClick={() => downloadTemplateMutation.mutate()}
                      >
                        <Download /> Download Template
                      </FormButton>
                    </UploadGuideline>
                    <FormControl>
                      <FileInput
                        isInvalid={fieldState.invalid}
                        accept={{
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                            [".xlsx"],
                          "application/vnd.ms-excel": [".xls"],
                        }}
                        extensions={[".xlsx", ".xls"]}
                        maxSize={10}
                        setError={(message) =>
                          form.setError("data", {
                            message,
                          })
                        }
                        clearError={() => {
                          form.clearErrors();
                        }}
                        handleFile={async (file) => {
                          if (file) {
                            const data = await generateUploadFormData(file);

                            field.onChange(
                              data.map((d) => ({
                                ...d,
                                intakes: d.intakes.filter((itk) =>
                                  (activeIntakes || []).find(
                                    (it) => it.id === itk,
                                  ),
                                ),
                              })),
                            );
                          }
                        }}
                      />
                    </FormControl>
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
          {Array.isArray(programData) && programData.length ? (
            <div className="flex items-center gap-4">
              <FormButton
                variant="brand"
                isLoading={form.formState.isSubmitting}
              >
                <Upload />
                Upload Programs
              </FormButton>
              <Button
                type="button"
                role="button"
                variant="outline"
                disabled={form.formState.isSubmitting}
                onClick={() => {
                  form.reset();
                }}
                className="text-muted-foreground"
              >
                <Trash2 />
                Clear Form
              </Button>
            </div>
          ) : null}
        </form>
      </Form>
    </section>
  );
};
export default UploadForm;
