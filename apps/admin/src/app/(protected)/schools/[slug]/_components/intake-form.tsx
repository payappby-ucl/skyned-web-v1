"use client";

import { CreateIntakeSchema, IIntake } from "@workspace/shared";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback, useMemo, useState } from "react";
import { brandClientApi } from "@/src/lib/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
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
import { DatePicker } from "@workspace/ui/components/date-picker";
import { IntakeInput } from "@workspace/ui/components/intake-input";
import { createSchoolIntake, updateSchoolIntake } from "../../_actions";

interface Props {
  slug: string;
  intake?: IIntake;
  setEditIntake?: React.Dispatch<React.SetStateAction<IIntake | null>>;
}
const IntakeForm: React.FC<Props> = ({ intake, slug, setEditIntake }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const startYear = useMemo(() => new Date().getFullYear(), []);
  const endYear = useMemo(() => new Date().getFullYear() + 5, []);

  const form = useForm<CreateIntakeSchema>({
    resolver: zodResolver(CreateIntakeSchema),
    defaultValues: {
      intake:
        intake?.intake ||
        `${brandClientApi.date.formatDate(new Date(), "MMM").toUpperCase()} ${startYear}`,
      startDate: +new Date(intake?.startDate || Date.now()),
      deadline: +new Date(intake?.deadline || Date.now()),
    },
  });

  const onSubmit = useCallback(async (data: CreateIntakeSchema) => {
    try {
      let serverRes;
      if (intake) {
        serverRes = await updateSchoolIntake(intake.id, slug, {
          ...data,
          startDate: +brandClientApi.date.startOfDay(new Date(data.startDate)),
          deadline: +brandClientApi.date.endOfDay(new Date(data.deadline)),
        });
      } else {
        serverRes = await createSchoolIntake(slug, {
          ...data,
          startDate: +brandClientApi.date.startOfDay(new Date(data.startDate)),
          deadline: +brandClientApi.date.endOfDay(new Date(data.deadline)),
        });
      }
      brandClientApi.utils.handleServerActionResponse(serverRes);
      brandClientApi.utils.toast.success("Action successful");
      queryClient.invalidateQueries({
        queryKey: [`intakes-${slug}`],
      });
      form.reset();
      if (intake) {
        setEditIntake?.(null);
      }
      setOpen(false);
      router.refresh();
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  const deadlineWatch = form.watch("deadline");

  return (
    <Dialog
      open={!!intake || open}
      onOpenChange={(val) => {
        if (!val && intake) {
          setEditIntake?.(null);
        }

        setOpen(val);
      }}
    >
      {!intake ? (
        <DialogTrigger asChild>
          <Button variant="outline" type="button">
            <Plus />
            {intake ? "Update" : "Create"}
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-xl">
            {intake ? "Update" : "Create"} Intake
          </DialogTitle>
          {intake ? (
            <DialogDescription>
              Update {intake.school?.name}'s intake details
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="intake"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Intake</FormLabel>
                  <FormControl>
                    <IntakeInput
                      value={field.value}
                      onValueChange={field.onChange}
                      startYear={startYear}
                      endYear={endYear}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={
                        field.value ? new Date(field.value) : new Date()
                      }
                      mode="single"
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                      fromYear={startYear}
                      toYear={endYear}
                      display={
                        field.value
                          ? brandClientApi.date.formatDate(
                              new Date(field.value),
                              "MMM DD YYYY",
                            )
                          : ""
                      }
                      // popoverModal={true}
                    />
                  </FormControl>
                  <FormDescription>
                    Date in which school will stops collecting intakes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={
                        field.value ? new Date(field.value) : new Date()
                      }
                      mode="single"
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                      fromYear={startYear}
                      toYear={
                        deadlineWatch
                          ? new Date(deadlineWatch).getFullYear()
                          : endYear
                      }
                      display={
                        field.value
                          ? brandClientApi.date.formatDate(
                              new Date(field.value),
                              "MMM DD YYYY",
                            )
                          : ""
                      }
                      // popoverModal={true}
                    />
                  </FormControl>
                  <FormDescription>
                    Date in which school will start collecting intakes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton
              variant="brand"
              type="button"
              role="button"
              isLoading={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {intake ? "Update" : "Create"} Intake
            </FormButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default IntakeForm;
