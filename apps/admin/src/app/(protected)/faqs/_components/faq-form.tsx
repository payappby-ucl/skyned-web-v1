"use client";

import { brandClientApi } from "@/src/lib/client";
import { CreateFaqSchema, IFaq } from "@workspace/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Editor } from "@workspace/ui/components/editor";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback } from "react";
import { Button } from "@workspace/ui/components/button";
import { FormButton } from "@workspace/ui/components/form-button";

interface Props {
  faq?: IFaq;
}

const FaqForm: React.FC<Props> = ({ faq }) => {
  const form = useForm<CreateFaqSchema>({
    resolver: zodResolver(CreateFaqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
    },
  });

  const onSubmit = useCallback(async (data: CreateFaqSchema) => {
    try {
      console.log(data);
      brandClientApi.utils.toast.info("Currently under construction...");
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="question">Question</FormLabel>
              <FormControl>
                <Input
                  id="question"
                  {...field}
                  placeholder="Type your question"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="answer">Answer</FormLabel>
              <FormControl>
                <Editor
                  className="max-h-[60vh]"
                  content={field.value}
                  editable={!form.formState.isSubmitting}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton
          isLoading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          variant="brand"
          className="w-full md:w-fit"
        >
          {faq ? "Update" : "Create"} FAQ
        </FormButton>
      </form>
    </Form>
  );
};
export default FaqForm;
