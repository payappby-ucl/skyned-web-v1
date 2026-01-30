"use client";

import useGet from "@/src/hooks/use-get";
import { brandClientApi } from "@/src/lib/client";
import {
  IPaginatedResponse,
  IProgram,
  ISchool,
  ISuccessResponse,
} from "@workspace/shared";
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
import { ChevronsUpDownIcon, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ProgramComboboxSearch: React.FC<{
  setProgram: React.Dispatch<React.SetStateAction<IProgram | null>>;
  schoolSlug: string;
  value: string;
  onChange: (...event: any[]) => void;
}> = ({ value, onChange, schoolSlug, setProgram }) => {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null);

  const { data: programData, isLoading: programLoading } = useGet<IProgram>({
    queryKey: [`school-${schoolSlug}-programs-${value}`],
    url: `/schools/${schoolSlug}/programs/${value}`,
    enabled: value && !selectedProgram && schoolSlug ? true : false,
  });

  const { data, isLoading } = useGet<IPaginatedResponse<IProgram>>({
    queryKey: [`school-${schoolSlug}-program-search-${term}`],
    url: `/schools/${schoolSlug}/programs?financialAids=mpower,passage&term=${term}`,
    enabled: !!term,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        setSelectedProgram(null);
        setTerm(search);
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setProgram(selectedProgram || programData || null);
  }, [selectedProgram, programData]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-md text-sm"
          disabled={schoolSlug || !programData || !isLoading ? false : true}
        >
          {programLoading ? (
            <div className="flex items-center justify-center p-2">
              <Loader2Icon
                size={14}
                className="text-muted-foreground animate-spin"
              />
            </div>
          ) : selectedProgram || programData ? (
            <div className="space-y-[2px] font-semibold">
              <p>{(selectedProgram || programData)?.name}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm font-medium">
              Select Programs
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
            disabled={schoolSlug ? false : true}
          />
          <CommandList>
            {!isLoading ? (
              <CommandEmpty>No program found.</CommandEmpty>
            ) : (
              <div className="flex items-center justify-center p-2">
                <Loader2Icon
                  size={14}
                  className="text-muted-foreground animate-spin"
                />
              </div>
            )}

            <CommandGroup className="p-1">
              {data?.data?.map((program) => (
                <CommandItem
                  key={program.slug}
                  value={program.slug}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setSelectedProgram(program);
                    setOpen(false);
                  }}
                >
                  <p>{program.name}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProgramComboboxSearch;
