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
    <search className="bg-brand-400/10 w-xl rounded-full px-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-1 py-2"
        >
          <div className="divide-brand-50/20 grid flex-1 grid-cols-2 gap-2 divide-x">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="What would you like to study?"
                      onChange={field.onChange}
                      value={field.value}
                      aria-label="What would you like to study?"
                      className="placeholder:text-brand-50/65 w-full border-0 !bg-transparent focus:!ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Where would you like to study?"
                      onChange={field.onChange}
                      value={field.value}
                      aria-label="Where would you like to study?"
                      className="placeholder:text-brand-50/65 w-full border-0 !bg-transparent focus:!ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button variant="brand" className="rounded-full px-10">
            Search
          </Button>
        </form>
      </Form>
    </search>
  );
};

export default HeroSearch;
