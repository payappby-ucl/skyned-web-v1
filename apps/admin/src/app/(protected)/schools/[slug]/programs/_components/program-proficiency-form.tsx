"use client";

import ComputeEnglishProficiency from "@/src/components/compute-proficiency";
import { EnglishProficiencySchema } from "@workspace/shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
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
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import { Plus } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

interface Props {
  onChange(value: EnglishProficiencySchema): void;
  /** Already added proficiencies */
  proficiencies?: EnglishProficiencySchema[];
}

const ProgramProficiencyForm: React.FC<Props> = ({
  proficiencies,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const tests = useMemo(
    () =>
      ["ielts", "toefl", "duolingo", "pte"].filter((v) =>
        (proficiencies || []).every((p) => p.test !== v),
      ) as ("ielts" | "toefl" | "duolingo" | "pte")[],
    [proficiencies],
  );

  const form = useForm<EnglishProficiencySchema>({
    resolver: zodResolver(EnglishProficiencySchema),
    values: {
      test: tests[0] || "pte",
      score: 0,
    },
  });

  const onSubmit = useCallback(
    (data: EnglishProficiencySchema) => {
      onChange(data);
      form.reset();
      setOpen(false);
    },
    [proficiencies],
  );

  const test = form.watch("test");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Plus className="size-5.5 rounded-md border p-1" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-xl">Add Proficiency</DialogTitle>
          <DialogDescription>Add a proficiency</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* English Proficiency */}
            <FormField
              control={form.control}
              name="test"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);

                      form.setValue("score", 0);
                    }}
                    value={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger
                        id="englishProficiency"
                        className="w-full uppercase"
                      >
                        <SelectValue placeholder="Select Test" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tests.map((val) => (
                        <SelectItem key={val} value={val} className="uppercase">
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Minimum English Proficiency Score */}
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <p>Minimum Score</p>
                    {test ? (
                      <ComputeEnglishProficiency
                        onChange={field.onChange}
                        examType={test}
                      />
                    ) : null}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Minimum Score"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton
              type="button"
              role="button"
              onClick={form.handleSubmit(onSubmit)}
              variant="default"
            >
              <Plus /> Add
            </FormButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramProficiencyForm;
