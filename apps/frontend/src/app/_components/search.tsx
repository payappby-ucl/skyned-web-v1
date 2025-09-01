"use client";

import { cn, useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback, useMemo } from "react";
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
import {
  CommandInput,
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@workspace/ui/components/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@workspace/ui/components/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { supportedCountries } from "@/src/utils";

const HeroSearch: React.FC = () => {
  const router = useRouter();
  const countries = useMemo(() => supportedCountries, []);

  const form = useForm<HeroSearchSchema>({
    resolver: zodResolver(HeroSearchSchema),
    defaultValues: {
      country: "",
      course: "",
    },
  });

  const onSubmit = useCallback(async (data: HeroSearchSchema) => {
    try {
      const searchParams = new URLSearchParams();
      if (data.country) {
        searchParams.set("country", data.country);
      }

      if (data.course) {
        searchParams.set("term", data.course);
      }

      router.push(`/search?${searchParams.toString()}`);
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
                      placeholder="What do you want to study?"
                      onChange={field.onChange}
                      value={field.value}
                      aria-label="What do you want to study?"
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
                <FormItem className="md:rounded-0 border-brand-50/10 rounded-full border p-2 md:rounded-none md:border-0 md:p-0">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="ghost"
                            role="combobox"
                            className={cn(
                              "placeholder:text-brand-50/65 w-full justify-between border-0 !bg-transparent text-center text-sm font-medium hover:text-inherit focus:!ring-0 md:text-left",
                              !field.value && "text-brand-50/65",
                            )}
                          >
                            {field.value
                              ? countries.find(
                                  (country) => country.value === field.value,
                                )?.label
                              : "Select country"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search country..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {countries.map((country) => (
                                <CommandItem
                                  value={country.label}
                                  key={country.value}
                                  onSelect={() => {
                                    form.setValue("country", country.value);
                                  }}
                                >
                                  {country.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      country.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
