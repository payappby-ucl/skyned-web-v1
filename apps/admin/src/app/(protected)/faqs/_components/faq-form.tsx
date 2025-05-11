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
import { FormButton } from "@workspace/ui/components/form-button";
import { createFaq, updateFaq } from "../_actions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  faq?: IFaq;
}

const FaqForm: React.FC<Props> = ({ faq }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<CreateFaqSchema>({
    resolver: zodResolver(CreateFaqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
    },
  });

  const onSubmit = useCallback(async (data: CreateFaqSchema) => {
    try {
      if (faq) {
        await updateFaq(faq.id, data);
        brandClientApi.utils.toast.success("FAQ Updated.");
      } else {
        await createFaq(data);
        brandClientApi.utils.toast.success("FAQ Created.");
      }

      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });

      router.replace("/faqs");
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
