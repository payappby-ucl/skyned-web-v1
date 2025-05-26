"use client";

import { CreateAccommodationSchema, IAccommodation } from "@workspace/shared";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback, useState } from "react";
import {
  createSchoolAccommodation,
  updateSchoolAccommodation,
} from "../../_actions";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Editor } from "@workspace/ui/components/editor";
import { FormButton } from "@workspace/ui/components/form-button";

interface Props {
  slug: string;
  accommodation?: IAccommodation;
}
const AccommodationForm: React.FC<Props> = ({ accommodation, slug }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<CreateAccommodationSchema>({
    resolver: zodResolver(CreateAccommodationSchema),
    defaultValues: {
      description: accommodation?.description || "",
    },
  });

  const onSubmit = useCallback(async (data: CreateAccommodationSchema) => {
    try {
      let serverRes;
      if (accommodation) {
        serverRes = await updateSchoolAccommodation(slug, data);
      } else {
        serverRes = await createSchoolAccommodation(slug, data);
      }
      brandClientApi.utils.handleServerActionResponse(serverRes);
      brandClientApi.utils.toast.success("Action successfull");

      queryClient.invalidateQueries({
        queryKey: ["accommodations"],
      });
      form.reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <Plus />
          {accommodation ? "Update" : "Create"}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[calc(100vw-100px)]">
        <DialogHeader>
          <DialogTitle className="!text-2xl">
            {accommodation ? "Update" : "Create"} Accommodation
          </DialogTitle>
          {accommodation ? (
            <DialogDescription>
              Update {accommodation.school?.name}'s accommodation details
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Accommodation Description</FormLabel>
                  <FormControl>
                    <Editor
                      placeholder="Information about the accommodations provided by the school and possibly links to the school's accommodation page"
                      onChange={field.onChange}
                      invalid={fieldState.invalid}
                      content={field.value}
                      editable={!form.formState.isSubmitting}
                      className="h-[calc(100vh-250px)] max-h-[calc(100vh-250px)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton
              variant="brand"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              {accommodation ? "Update" : "Create"}
            </FormButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AccommodationForm;
