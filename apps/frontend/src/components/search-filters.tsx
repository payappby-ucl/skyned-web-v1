"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Check, Earth, ListFilterPlus, MapPin, Search, X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { supportedCountries } from "../utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@workspace/ui/components/command";
import { brandClientApi } from "../lib/client";

interface Props {
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setInitial?: React.Dispatch<React.SetStateAction<boolean>>;
}

// * Country and State Filters
const CountryAndState: React.FC<{
  countryAndStateFilter: {
    country: string;
    state: string;
  };
  setCountryAndStateFilter: React.Dispatch<
    React.SetStateAction<{
      country: string;
      state: string;
    }>
  >;
}> = ({ countryAndStateFilter, setCountryAndStateFilter }) => {
  // * Country
  const [openState, setOpenState] = useState("");
  const countries = useMemo(() => supportedCountries, []);

  const selectedCountry = useMemo(
    () => countries.find((c) => c.value === countryAndStateFilter.country),
    [countryAndStateFilter, countries],
  );

  // * State
  const statesOfSelectedCountry = useMemo(() => {
    if (selectedCountry) {
      const states = brandClientApi.location.getStatesOfCountry(
        selectedCountry.value,
      );
      return states;
    }
    return [];
  }, [selectedCountry]);

  const [state, setState] = useState("");
  const [states, setStates] = useState<
    ReturnType<typeof brandClientApi.location.getStatesOfCountry>
  >(() => {
    if (countryAndStateFilter.state && countryAndStateFilter.country) {
      const statesIso = countryAndStateFilter.state.split(",");
      const currStates = statesIso
        .map((iso) =>
          brandClientApi.location.getState(countryAndStateFilter.country, iso),
        )
        .filter((s) => s !== undefined);

      return currStates;
    }
    return [];
  });

  const updateStates = useCallback(
    (
      state: ReturnType<
        typeof brandClientApi.location.getStatesOfCountry
      >[number],
    ) => {
      const stateCheck = states.find(
        (s) =>
          s.countryCode === state.countryCode && s.isoCode === state.isoCode,
      );

      let currStates = states;

      if (stateCheck) {
        currStates = states.filter((s) => s.isoCode !== stateCheck.isoCode);
      } else {
        currStates = [...states, state];
      }

      setStates(currStates);
      setCountryAndStateFilter((prev) => ({
        ...prev,
        state: currStates.map((s) => s.isoCode).join(","),
      }));

      setState("");
    },
    [states, state, setCountryAndStateFilter, countryAndStateFilter],
  );

  const clearStates = useCallback(() => {
    setStates([]);
    setState("");
    setOpenState("");
    setCountryAndStateFilter((prev) => ({
      ...prev,
      state: "",
    }));
  }, [state, states, openState, countryAndStateFilter]);

  return (
    <div className="border-border/30 divide-y rounded-lg border p-4 shadow-lg">
      <Accordion
        type="single"
        collapsible
        value={openState}
        onValueChange={setOpenState}
      >
        <AccordionItem value="country">
          <AccordionTrigger className="flex items-center">
            <p className="text-muted-foreground text-md flex flex-1 items-center gap-2 font-semibold">
              <Earth size={20} />
              Destination
            </p>
            {selectedCountry && !openState ? (
              <p className="bg-accent text-md rounded-full px-4 py-2 font-semibold">
                {selectedCountry.label}
              </p>
            ) : null}
          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2">
            {supportedCountries.map((country) => (
              <Button
                variant="outline"
                key={country.value}
                className={`${selectedCountry?.value === country.value ? "!bg-accent" : ""}`}
                onClick={() => {
                  setCountryAndStateFilter((prev) => ({
                    ...prev,
                    country: country.value,
                  }));
                  clearStates();
                }}
              >
                {country.label}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {selectedCountry ? (
        <div className="space-y-5 py-3">
          <p className="text-muted-foreground text-md flex flex-1 items-center gap-2 font-semibold">
            <MapPin size={20} /> State
          </p>

          <div className="relative">
            <Command className="*:data-[slot=command-input-wrapper]:bg-accent *:data-[slot=command-input-wrapper]:rounded-lg *:data-[slot=command-input-wrapper]:border-b-0 *:data-[slot=command-input-wrapper]:p-5">
              <CommandInput
                placeholder="Search states"
                value={state}
                onValueChange={setState}
              />
              {states.length ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {states.map((s) => (
                    <div
                      key={`selected-${s.countryCode}-${s.isoCode}`}
                      className="bg-accent flex w-fit items-center gap-2 rounded-full px-4 py-2"
                    >
                      <p className="text-sm">{s.name}</p>

                      <Button
                        variant="ghost"
                        className="bg-background !h-fit !w-fit rounded-full !p-1"
                        onClick={() => updateStates(s)}
                      >
                        <X className="size-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}

              {state ? (
                <div className="bg-background absolute top-10 z-50 mt-2 w-full rounded-lg p-2 shadow-sm">
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    {statesOfSelectedCountry.map((s) => (
                      <CommandItem
                        key={`${s.countryCode}-${s.isoCode}`}
                        asChild
                      >
                        <Button
                          variant="ghost"
                          onClick={() => updateStates(s)}
                          className="w-full items-center justify-between"
                        >
                          {s.name}

                          {states.find(
                            (st) =>
                              s.countryCode === st.countryCode &&
                              s.isoCode === st.isoCode,
                          ) ? (
                            <Check />
                          ) : null}
                        </Button>
                      </CommandItem>
                    ))}
                  </CommandList>
                </div>
              ) : null}
            </Command>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const SearchFilters: React.FC<Props> = ({
  filters,
  setFilters,
  setInitial,
}) => {
  const [open, setOpen] = useState(false);

  const [countryAndStateFilter, setCountryAndStateFilter] = useState<{
    country: string;
    state: string;
  }>({
    country: filters["country"] || "",
    state: filters["state"] || "",
  });

  const applyFilters = useCallback(() => {
    setInitial?.(false);
    setFilters((prev) => ({
      ...prev,
      ...countryAndStateFilter,
    }));

    setOpen(false);
  }, [countryAndStateFilter]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ListFilterPlus />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[100vw] md:max-w-[60vw] lg:w-[40vw] md:[&>button]:hidden">
        <SheetHeader className="justify-center">
          <SheetTitle className="!text-2xl">Filters</SheetTitle>
          <SheetDescription>Filter for programs and schools</SheetDescription>
        </SheetHeader>

        <div className="h-full overflow-y-scroll px-4">
          <CountryAndState
            countryAndStateFilter={countryAndStateFilter}
            setCountryAndStateFilter={setCountryAndStateFilter}
          />
        </div>

        <SheetFooter className="flex flex-row items-center gap-2 border-t">
          <Button variant="outline" className="flex-1">
            Reset
          </Button>
          <Button
            variant="brand"
            className="flex-1"
            onClick={() => applyFilters()}
          >
            Apply Filter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export { SearchFilters };
