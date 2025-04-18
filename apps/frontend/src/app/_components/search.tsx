"use client";

import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback } from "react";
import { HeroSearchSchema } from "./schema";
import { brandClientApi } from "@/src/lib/client";
import {
  FormField,
  FormItem,
  Form,
  FormControl,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

const HeroSearch: React.FC = () => {
  const form = useForm<HeroSearchSchema>({
    resolver: zodResolver(HeroSearchSchema),
    defaultValues: {
      country: "",
      course: "",
    },
  });

  const onSubmit = useCallback(async (values: HeroSearchSchema) => {
    try {
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  return (
    <search className="bg-brand-400/10 w-full max-w-xl rounded-sm px-3 py-5 md:rounded-full md:px-3 md:py-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 py-2 md:flex-row md:gap-1"
        >
          <div className="divide-brand-50/20 grid w-full flex-1 grid-cols-1 gap-5 md:grid-cols-2 md:gap-2 md:!divide-x">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="md:rounded-0 border-brand-50/10 rounded-full border p-2 md:rounded-none md:border-0 md:p-0">
                  <FormControl>
                    <Input
                      placeholder="What would you like to study?"
                      onChange={field.onChange}
                      value={field.value}
                      aria-label="What would you like to study?"
                      className="placeholder:text-brand-50/65 w-full border-0 !bg-transparent text-center focus:!ring-0 md:text-left"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="md:rounded-0 border-brand-50/10 rounded-full border p-2 md:border-0 md:p-0">
                  <FormControl>
                    <Input
                      placeholder="Country"
                      onChange={field.onChange}
                      value={field.value}
                      aria-label="Country"
                      className="placeholder:text-brand-50/65 w-full border-0 !bg-transparent text-center focus:!ring-0 md:text-left"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="brand"
            className="w-full rounded-full px-10 md:w-fit"
          >
            Search
          </Button>
        </form>
      </Form>
    </search>
  );
};

export default HeroSearch;
