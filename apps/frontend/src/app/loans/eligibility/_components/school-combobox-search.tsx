"use client";

import useGet from "@/src/hooks/use-get";
import { brandClientApi } from "@/src/lib/client";
import {
  IPaginatedResponse,
  ISchool,
  ISuccessResponse,
} from "@workspace/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from "@workspace/ui/components/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@workspace/ui/components/popover";
import { ChevronsUpDownIcon, Loader2Icon, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

const SchoolComboboxSearch: React.FC<{
  value: string;
  onChange: (...event: any[]) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<ISchool | null>(null);

  const { data: schoolData, isLoading: schoolLoading } = useGet<ISchool>({
    queryKey: [`school-${value}`],
    url: `/schools/${value}`,
    enabled: !!value && !selectedSchool,
  });

  const { data, isLoading } = useGet<IPaginatedResponse<ISchool>>({
    queryKey: [`school-search-${term}`],
    url: `/schools?financialAids=mpower,passage&term=${term}`,
    enabled: !!term,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        setSelectedSchool(null);
        setTerm(search);
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-md text-sm"
          disabled={isLoading || schoolLoading}
        >
          {schoolLoading ? (
            <div className="flex items-center justify-center p-2">
              <Loader2Icon
                size={14}
                className="text-muted-foreground animate-spin"
              />
            </div>
          ) : selectedSchool || schoolData ? (
            <div className="flex items-center gap-2">
              <Avatar className="size-5">
                <AvatarFallback className="uppercase">
                  {(selectedSchool || schoolData)?.name[0]}
                </AvatarFallback>
                <AvatarImage src={(selectedSchool || schoolData)?.logo.url} />
              </Avatar>
              <div className="space-y-[2px] font-semibold">
                <p>{(selectedSchool || schoolData)?.name}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm font-medium">
              Select School
            </p>
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput
            placeholder="Start typing..."
            value={search}
            onValueChange={(val) => setSearch(val)}
          />
          <CommandList>
            {!isLoading && !schoolLoading ? (
              <CommandEmpty>No school found.</CommandEmpty>
            ) : (
              <div className="flex items-center justify-center p-2">
                <Loader2Icon
                  size={14}
                  className="text-muted-foreground animate-spin"
                />
              </div>
            )}

            <CommandGroup className="p-1">
              {data?.data?.map((school) => (
                <CommandItem
                  key={school.slug}
                  value={school.slug}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setSelectedSchool(school);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback className="uppercase">
                        {school.name[0]}
                      </AvatarFallback>
                      <AvatarImage src={school.logo.url} />
                    </Avatar>
                    <div className="space-y-[2px] font-semibold">
                      <p>{school.name}</p>
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin size={15} />
                        <span className="capitalize">
                          {
                            brandClientApi.location.getState(
                              school.country,
                              school.state,
                            )?.name
                          }
                          ,
                        </span>
                        <span className="capitalize">
                          {
                            brandClientApi.location.getCountryByISOCode(
                              school.country,
                            )?.name
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SchoolComboboxSearch;
