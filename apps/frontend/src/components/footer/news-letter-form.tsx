"use client";

import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback } from "react";
import { NewsLetterFormSchema } from "./schema";
import { brandClientApi } from "@/src/lib/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { FormButton } from "@workspace/ui/components/form-button";
import { subscribeToNewsletter } from "./actions";

const NewsLetterForm: React.FC = () => {
  const form = useForm<NewsLetterFormSchema>({
    resolver: zodResolver(NewsLetterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(async (values: NewsLetterFormSchema) => {
    try {
      const { message } = await subscribeToNewsletter(values);
      brandClientApi.utils.toast.success(message);
      form.reset();
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background dark:bg-foreground border-brand/10 flex items-center gap-2 self-center rounded-full border p-1 lg:col-start-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1 border-0 shadow-none">
              <FormControl>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  aria-label="Email Address"
                  className="text-foreground dark:text-background border-0 !bg-transparent shadow-none focus:!ring-0"
                  placeholder="Email Address"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormButton
          isLoading={form.formState.isSubmitting}
          variant="brand"
          className="rounded-full"
        >
          Subscribe
        </FormButton>
      </form>
    </Form>
  );
};
export default NewsLetterForm;
