"use client";

import {
  ComputeEnglishProficiencySchema,
  EnglishProficiency,
} from "@workspace/shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import { ArrowBigRight, Speech } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { brandClientApi } from "../lib/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

interface Props {
  examType: "ielts" | "toefl" | "duolingo" | "pte";
  onChange?: (...event: any[]) => void;
}

const ComputeEnglishProficiency: React.FC<Props> = ({ onChange, examType }) => {
  const [open, setOpen] = useState(false);
  const [cefr, setCefr] = useState<ReturnType<
    typeof EnglishProficiency.computeExaminationScore
  > | null>(null);

  const examValidationOptions = useMemo(
    () => EnglishProficiency.examinations.find((ex) => ex.name === examType),
    [examType],
  );

  const form = useForm<ComputeEnglishProficiencySchema>({
    resolver: zodResolver(ComputeEnglishProficiencySchema),
    values: {
      examType,
      score: ["ielts", "toefl"].includes(examType)
        ? {
            listening: 0,
            speaking: 0,
            reading: 0,
            writing: 0,
          }
        : 0,
    },
  });

  const onSubmit = useCallback((data: ComputeEnglishProficiencySchema) => {
    try {
      if (
        ["ielts", "toefl"].includes(data.examType) &&
        typeof data.score !== "number"
      ) {
        const result = EnglishProficiency.computeExaminationScore({
          test: data.examType as "ielts" | "toefl",
          reading: data.score.reading,
          listening: data.score.listening,
          writing: data.score.writing,
          speaking: data.score.speaking,
        });

        setCefr(result);
      }

      if (
        ["pte", "duolingo"].includes(data.examType) &&
        typeof data.score === "number"
      ) {
        const result = EnglishProficiency.computeExaminationScore({
          test: data.examType as "pte" | "duolingo",
          score: data.score,
        });

        setCefr(result);
      }
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          setCefr(null);
        }

        setOpen(val);
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Speech className="size-3" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Compute CEFR</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-base">English Proficiency</DialogTitle>
          <DialogDescription>
            Common European Framework of Reference for Languages (CEFR)
          </DialogDescription>
        </DialogHeader>
        {cefr ? (
          <div className="flex flex-col items-center gap-2">
            <p className="font-semibold uppercase">{examType}</p>
            <h4 className="flex items-center gap-2 rounded-md border p-2">
              {cefr.total} <ArrowBigRight /> {cefr.cefr.name}
            </h4>
            <div className="flex items-center gap-2">
              {cefr.cefr.tags.map((tag) => (
                <p key={tag} className="rounded-md border px-4 py-1 text-sm">
                  {tag}
                </p>
              ))}
            </div>
          </div>
        ) : null}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {["ielts", "toefl"].includes(examType) ? (
              <>
                <FormField
                  control={form.control}
                  name="score.listening"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listening</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!cefr}
                          placeholder="Listening"
                          min={examValidationOptions?.min}
                          max={examValidationOptions?.max}
                          step={examValidationOptions?.steps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="score.reading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reading</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!cefr}
                          placeholder="Reading"
                          min={examValidationOptions?.min}
                          max={examValidationOptions?.max}
                          step={examValidationOptions?.steps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="score.speaking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaking</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!cefr}
                          placeholder="Speaking"
                          min={examValidationOptions?.min}
                          max={examValidationOptions?.max}
                          step={examValidationOptions?.steps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="score.writing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writing</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!cefr}
                          placeholder="Writing"
                          min={examValidationOptions?.min}
                          max={examValidationOptions?.max}
                          step={examValidationOptions?.steps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="score"
                render={({ field: { value, ...rest } }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Score</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Score"
                        value={value as number}
                        {...rest}
                        disabled={!!cefr}
                        min={examValidationOptions?.min}
                        max={examValidationOptions?.max}
                        step={examValidationOptions?.steps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="md:col-span-2">
              {!cefr ? (
                <Button
                  role="button"
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Compute CEFR
                </Button>
              ) : (
                <div className="flex flex-col items-center gap-2 md:flex-row">
                  <Button
                    role="button"
                    type="button"
                    variant="outline"
                    className="w-full md:flex-1"
                    onClick={() => {
                      form.reset();
                      setCefr(null);
                    }}
                  >
                    Clear
                  </Button>

                  <Button
                    role="button"
                    type="button"
                    variant="brand"
                    className="w-full md:flex-1"
                    onClick={() => {
                      onChange?.(cefr.total);
                      form.reset();
                      setCefr(null);
                      setOpen(false);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ComputeEnglishProficiency;
