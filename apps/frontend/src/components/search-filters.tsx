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
import {
  AwardIcon,
  BadgeCheck,
  BellElectric,
  Book,
  Check,
  Earth,
  GlobeLock,
  GraduationCap,
  House,
  Landmark,
  ListFilterPlus,
  LucideIcon,
  MapPin,
  X,
} from "lucide-react";
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
import {
  degreeTypes,
  financialAids,
  institutionType,
  ownershipType,
} from "@workspace/shared";
import { Switch } from "@workspace/ui/components/switch";
import { Badge } from "@workspace/ui/components/badge";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Input } from "@workspace/ui/components/input";

// * Reuseable Command Filter
interface WithName {
  name: string;
}
interface InputProps<T extends WithName> {
  placeholder?: string;
  value: string | undefined;
  onValueChange: ((search: string) => void) | undefined;
  list: T[];
  selectedList: T[];
  update: (listItem: T) => void;
}
function ComboInputPopover<T extends WithName>({
  placeholder = "Search...",
  value,
  onValueChange,
  list,
  selectedList,
  update,
}: InputProps<T>) {
  return (
    <div className="relative">
      <Command className="*:data-[slot=command-input-wrapper]:bg-accent *:data-[slot=command-input-wrapper]:rounded-lg *:data-[slot=command-input-wrapper]:border-b-0 *:data-[slot=command-input-wrapper]:p-5">
        <CommandInput
          placeholder={placeholder}
          value={value}
          onValueChange={onValueChange}
        />
        {selectedList.length ? (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {selectedList.map((s, index) => (
              <div
                key={`selected-list-${s.name}-${index}`}
                className="bg-accent flex w-fit items-center gap-2 rounded-full px-4 py-2"
              >
                <p className="text-sm">{s.name}</p>

                <Button
                  variant="ghost"
                  className="bg-background !h-fit !w-fit rounded-full !p-1"
                  onClick={() => update?.(s)}
                >
                  <X className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : null}

        {value ? (
          <div className="bg-background absolute top-10 z-50 mt-2 w-full rounded-lg p-2 shadow-sm">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {list.map((s, index) => (
                <CommandItem key={`list-${s.name}-${index}`} asChild>
                  <Button
                    variant="ghost"
                    onClick={() => update?.(s)}
                    className="w-full items-center justify-between"
                  >
                    {s.name}

                    {selectedList.find((ls) => ls.name === s.name) ? (
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
  );
}

// * Reusable Accordion Filter
interface AList {
  label: string;
  value: string;
}
interface AccordionProps {
  name: string;
  Icon: LucideIcon;
  title: string;
  list: ReadonlyArray<AList>;
  selected?: Readonly<AList>;
  update(item: AList): void;
}
function AccordionFilter({
  name,
  list,
  selected,
  update,
  Icon,
  title,
}: AccordionProps) {
  const [openState, setOpenState] = useState("");

  return (
    <Accordion
      type="single"
      collapsible
      value={openState}
      onValueChange={setOpenState}
    >
      <AccordionItem value={name}>
        <AccordionTrigger className="flex items-center">
          <p className="text-muted-foreground text-md flex flex-1 items-center gap-2 font-semibold">
            <Icon size={20} />
            {title}
          </p>
          {selected && !openState ? (
            <p className="bg-accent text-md rounded-full px-4 py-2 font-semibold capitalize">
              {selected.label}
            </p>
          ) : null}
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {list.map((listItem) => (
            <Button
              variant="outline"
              key={listItem.value}
              className={`capitalize ${selected?.value === listItem.value ? "!bg-accent" : ""}`}
              onClick={() => {
                setOpenState("");
                update(listItem);
              }}
            >
              {listItem.label}
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// * Reusable Boolean Filter
interface BooleanProps {
  title: string;
  description?: string;
  Icon: LucideIcon;
  value: boolean;
  onChange:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((checked: boolean) => void);
}
function BooleanFilter({
  title,
  description,
  Icon,
  value,
  onChange,
}: BooleanProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground text-md flex items-center gap-2 font-semibold">
        <Icon size={20} />
        <div>
          <p>{title}</p>
          {description ? <p className="text-xs">{description}</p> : null}
        </div>
      </div>

      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}

// * Reusable Multi-select Filter

interface MultiSelectProps {
  title: string;
  Icon: LucideIcon;
  list: ReadonlyArray<AList>;
  selected?: ReadonlyArray<AList>;
  update(item: AList): void;
}

function MultiselectFilter({
  title,
  Icon,
  list,
  selected,
  update,
}: MultiSelectProps) {
  return (
    <div className="border-border/40 space-y-5 rounded-lg border p-4 shadow-sm">
      <div className="text-muted-foreground text-md flex items-center gap-2 font-semibold">
        <Icon size={20} />
        <p>{title}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {list.map((item) => (
          <Button
            key={item.label}
            variant={`${selected?.find((s) => s.value === item.label) ? "secondary" : "outline"}`}
            className="text-sm font-semibold"
            onClick={() => update(item)}
          >
            {item.value}
          </Button>
        ))}
      </div>
    </div>
  );
}

// *COMPONENTS

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
    setCountryAndStateFilter((prev) => ({
      ...prev,
      state: "",
    }));
  }, [state, states, countryAndStateFilter]);

  return (
    <div className="border-border/40 divide-y rounded-lg border p-4 shadow-sm">
      <AccordionFilter
        name="country"
        title="Destination"
        Icon={Earth}
        list={supportedCountries}
        selected={selectedCountry}
        update={(item) => {
          setCountryAndStateFilter((prev) => ({
            ...prev,
            country: item.value,
          }));
          clearStates();
        }}
      />

      {selectedCountry ? (
        <div className="space-y-5 py-3">
          <p className="text-muted-foreground text-md flex flex-1 items-center gap-2 font-semibold">
            <MapPin size={20} /> State
          </p>

          <ComboInputPopover
            placeholder="Search states"
            list={statesOfSelectedCountry}
            selectedList={states}
            value={state}
            onValueChange={setState}
            update={updateStates}
          />
        </div>
      ) : null}
    </div>
  );
};

// * Institution and Ownership Filters
const InstitutionAndOwnership: React.FC<{
  institutionAndOwnershipFilter: {
    institutionType: string;
    ownershipType: string;
  };
  setInstitutionAndOwnershipFilter: React.Dispatch<
    React.SetStateAction<{
      institutionType: string;
      ownershipType: string;
    }>
  >;
}> = ({ institutionAndOwnershipFilter, setInstitutionAndOwnershipFilter }) => {
  // * Ownership Type
  const ownershipTypes = useMemo(
    () =>
      [ownershipType.private, ownershipType.public].map((type) => ({
        label: type,
        value: type,
      })),
    [],
  );

  const selectedOwnershipType = useMemo(
    () =>
      ownershipTypes.find(
        (type) => type.value === institutionAndOwnershipFilter.ownershipType,
      ),
    [institutionAndOwnershipFilter, ownershipTypes],
  );

  // * Institution Type
  const institutionTypes = useMemo(
    () =>
      [institutionType.university, institutionType.college].map((type) => ({
        label: type,
        value: type,
      })),
    [],
  );

  const selectedInstitutionType = useMemo(
    () =>
      institutionTypes.find(
        (type) => type.value === institutionAndOwnershipFilter.institutionType,
      ),
    [institutionAndOwnershipFilter, institutionTypes],
  );

  return (
    <div className="border-border/40 divide-y rounded-lg border p-4 shadow-sm">
      <AccordionFilter
        name="institutionType"
        title="Institution"
        Icon={Landmark}
        list={institutionTypes}
        selected={selectedInstitutionType}
        update={(item) => {
          setInstitutionAndOwnershipFilter((prev) => ({
            ...prev,
            institutionType: item.value,
          }));
        }}
      />

      <AccordionFilter
        name="ownershipType"
        title="Ownership"
        Icon={GlobeLock}
        list={ownershipTypes}
        selected={selectedOwnershipType}
        update={(item) => {
          setInstitutionAndOwnershipFilter((prev) => ({
            ...prev,
            ownershipType: item.value,
          }));
        }}
      />
    </div>
  );
};

// * MEL and Degree Type Filters
const MelAndDegreeType: React.FC<{
  melAndDegreeTypeFilter: {
    minimumEducationLevel: string;
    degreeType: string;
  };
  setMelAndDegreeTypeFilter: React.Dispatch<
    React.SetStateAction<{
      minimumEducationLevel: string;
      degreeType: string;
    }>
  >;
}> = ({ melAndDegreeTypeFilter, setMelAndDegreeTypeFilter }) => {
  // * MEL
  const mel = useMemo(
    () =>
      ["primary", "secondary", "undergraduate", "postgraduate"].map((type) => ({
        label: type,
        value: type,
      })),
    [],
  );

  const selectedMel = useMemo(
    () =>
      mel.find((c) => c.value === melAndDegreeTypeFilter.minimumEducationLevel),
    [melAndDegreeTypeFilter, mel],
  );

  // * Degree Type
  const degreeList = useMemo(
    () => degreeTypes.map((type) => ({ name: type })),
    [],
  );
  const [value, onValueChange] = useState("");
  const selectedList = useMemo(() => {
    if (melAndDegreeTypeFilter.degreeType) {
      return melAndDegreeTypeFilter.degreeType
        .split(",")
        .map((v) => ({ name: v as (typeof degreeTypes)[number] }));
    }
    return [];
  }, [melAndDegreeTypeFilter]);

  const update = useCallback(
    (type: (typeof degreeList)[number]) => {
      const listCheck = selectedList.find((s) => s.name === type.name);

      let currList = selectedList;

      if (listCheck) {
        currList = selectedList.filter((s) => s.name !== type.name);
      } else {
        currList = [...selectedList, type];
      }

      setMelAndDegreeTypeFilter((prev) => ({
        ...prev,
        degreeType: currList.map((s) => s.name).join(","),
      }));

      onValueChange("");
    },
    [degreeList, selectedList, melAndDegreeTypeFilter, value],
  );

  return (
    <div className="border-border/40 divide-y rounded-lg border p-4 shadow-sm">
      <AccordionFilter
        name="mel"
        title="Minimum Education Level"
        Icon={GraduationCap}
        list={mel}
        selected={selectedMel}
        update={(item) => {
          setMelAndDegreeTypeFilter((prev) => ({
            ...prev,
            minimumEducationLevel: item.value,
          }));
        }}
      />

      <div className="space-y-5 py-3">
        <p className="text-muted-foreground text-md flex flex-1 items-center gap-2 font-semibold">
          <AwardIcon size={20} /> Degree Award
        </p>

        <ComboInputPopover
          placeholder="Search degree awards"
          list={degreeList}
          selectedList={selectedList}
          value={value}
          onValueChange={onValueChange}
          update={update}
        />
      </div>
    </div>
  );
};

// * Intakes Filter
const IntakesFilter: React.FC<{
  intakesFilter: {
    intakes: string;
  };
  setIntakesFilter: React.Dispatch<
    React.SetStateAction<{
      intakes: string;
    }>
  >;
}> = ({ intakesFilter, setIntakesFilter }) => {
  const intakeList = useMemo(() => {
    const list = [];

    for (let i = 0; i <= 11; i++) {
      list.push(dayjs().add(i, "month").format("MMM YYYY").toUpperCase());
    }

    return list.map((intake) => ({
      label: intake,
      value: intake,
    }));
  }, []);

  const selected = useMemo(() => {
    return intakesFilter.intakes.split(",").map((intake) => ({
      label: intake,
      value: intake,
    }));
  }, [intakesFilter]);

  const update = useCallback(
    (val: (typeof intakeList)[number]) => {
      let intakes = [
        ...new Set([
          ...(intakesFilter.intakes ? intakesFilter.intakes.split(",") : []),
        ]),
      ];

      if (intakes.includes(val.value)) {
        intakes = intakes.filter((v) => v !== val.value);
      } else {
        intakes.push(val.value);
      }

      setIntakesFilter({
        intakes: intakes.join(","),
      });
    },
    [intakesFilter],
  );

  return (
    <MultiselectFilter
      title="Intakes"
      Icon={BellElectric}
      list={intakeList}
      selected={selected}
      update={update}
    />
  );
};

// * Financial Aids Filter

interface Props {
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  schoolLevel?: boolean;
  setInitial?: React.Dispatch<React.SetStateAction<boolean>>;
  scrollTo?: string;
}

const SearchFilters: React.FC<Props> = ({
  filters,
  setFilters,
  setInitial,
  schoolLevel,
  scrollTo,
}) => {
  const router = useRouter();

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [termFilter, setTermFilter] = useState({
    term: filters["term"] || "",
  });

  const [countryAndStateFilter, setCountryAndStateFilter] = useState<{
    country: string;
    state: string;
  }>({
    country: filters["country"] || "",
    state: filters["state"] || "",
  });

  const [institutionAndOwnershipFilter, setInstitutionAndOwnershipFilter] =
    useState<{
      institutionType: string;
      ownershipType: string;
    }>({
      institutionType: filters["institutionType"] || "",
      ownershipType: filters["ownershipType"] || "",
    });

  const [accommodationFilter, setAccommodationFilter] = useState(
    filters["accommodation"] ? true : false,
  );

  const [melAndDegreeTypeFilter, setMelAndDegreeTypeFilter] = useState<{
    minimumEducationLevel: string;
    degreeType: string;
  }>({
    minimumEducationLevel: filters["minimumEducationLevel"] || "",
    degreeType: filters["degreeType"] || "",
  });

  const [pgwpFilter, setPgwpFilter] = useState(filters["pgwp"] ? true : false);

  const [financialAidsFilter, setFinancialAidsFilter] = useState(
    filters["financialAids"] || "",
  );

  const [intakesFilter, setIntakesFilter] = useState<{
    intakes: string;
  }>({
    intakes: filters["intakes"] || "",
  });

  const applyFilters = useCallback(() => {
    setInitial?.(false);
    let flts: Partial<typeof filters> = {
      ...filters,
      ...termFilter,
      ...countryAndStateFilter,
      ...institutionAndOwnershipFilter,
      ...{ accommodation: accommodationFilter },
      ...{ pgwp: pgwpFilter },
      ...{ financialAids: financialAidsFilter },
      ...melAndDegreeTypeFilter,
      ...intakesFilter,
    };

    if (!accommodationFilter) {
      flts = brandClientApi.utils.exclude(flts, ["accommodation"]);
    }

    if (!pgwpFilter) {
      flts = brandClientApi.utils.exclude(flts, ["pgwp"]);
    }

    if (!financialAidsFilter) {
      flts = brandClientApi.utils.exclude(flts, ["financialAids"]);
    }

    setFilters((prev) => {
      let flts: Partial<typeof filters> = {
        ...prev,
        page: 1,
        ...termFilter,
        ...countryAndStateFilter,
        ...institutionAndOwnershipFilter,
        ...{ accommodation: accommodationFilter },
        ...{ pgwp: pgwpFilter },
        ...{ financialAids: financialAidsFilter },
        ...melAndDegreeTypeFilter,
        ...intakesFilter,
      };

      if (!accommodationFilter) {
        flts = brandClientApi.utils.exclude(flts, ["accommodation"]);
      }

      if (!pgwpFilter) {
        flts = brandClientApi.utils.exclude(flts, ["pgwp"]);
      }

      if (!financialAidsFilter) {
        flts = brandClientApi.utils.exclude(flts, ["financialAids"]);
      }

      return flts;
    });

    const queries = new URLSearchParams();
    Object.entries(flts).forEach(([key, value]) => {
      if (value) {
        queries.append(key, value);
      }
    });

    window.history.pushState({}, "", `${pathname}?${queries.toString()}`);

    setOpen(false);
  }, [
    termFilter,
    countryAndStateFilter,
    institutionAndOwnershipFilter,
    accommodationFilter,
    pgwpFilter,
    financialAidsFilter,
    melAndDegreeTypeFilter,
    intakesFilter,
    filters,
  ]);

  const resetFilters = useCallback(() => {
    setTermFilter({
      term: "",
    });
    setCountryAndStateFilter({
      country: "",
      state: "",
    });
    setInstitutionAndOwnershipFilter({
      institutionType: "",
      ownershipType: "",
    });
    setAccommodationFilter(false);
    setPgwpFilter(false);
    setFinancialAidsFilter("");
    setMelAndDegreeTypeFilter({
      minimumEducationLevel: "",
      degreeType: "",
    });
    setIntakesFilter({
      intakes: "",
    });
    setFilters({
      limit: filters["limit"],
      page: 0,
    });
  }, [
    termFilter,
    countryAndStateFilter,
    institutionAndOwnershipFilter,
    accommodationFilter,
    pgwpFilter,
    financialAidsFilter,
    melAndDegreeTypeFilter,
    intakesFilter,
    filters,
  ]);

  const filterCount = useMemo(() => {
    const count =
      Object.entries(filters).filter(([Key, val]) => !!val).length - 2;

    if (count > 0) return count;
    return 0;
  }, [filters]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ListFilterPlus />
          Filters
          {filterCount ? (
            <Badge
              variant="destructive"
              className="size-5 rounded-full font-bold"
            >
              {filterCount}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[100vw] md:max-w-[60vw] lg:w-[40vw] md:[&>button]:hidden">
        <SheetHeader className="justify-center">
          <SheetTitle className="!text-2xl">Filters</SheetTitle>
          <SheetDescription>Filter for programs and schools</SheetDescription>
        </SheetHeader>

        <div className="h-full space-y-5 overflow-y-scroll px-4">
          <div className="border-border/40 space-y-5 rounded-lg border p-4 py-5 shadow-sm">
            <p className="text-muted-foreground text-md flex flex-1 items-center gap-2 font-semibold">
              <Book size={20} /> Interest
            </p>

            <Input
              name="term"
              placeholder="What do you want to study?"
              value={termFilter.term}
              onChange={(e) =>
                setTermFilter({
                  term: e.target.value,
                })
              }
              className="bg-accent selection:text-foreground border-0 !ring-0 selection:bg-inherit"
            />
          </div>

          {!schoolLevel ? (
            <>
              {/* Country and State Filters */}
              <CountryAndState
                countryAndStateFilter={countryAndStateFilter}
                setCountryAndStateFilter={setCountryAndStateFilter}
              />

              {/* Institution and Ownership type Filters */}
              <InstitutionAndOwnership
                institutionAndOwnershipFilter={institutionAndOwnershipFilter}
                setInstitutionAndOwnershipFilter={
                  setInstitutionAndOwnershipFilter
                }
              />

              {/* Accommodation Filter */}
              <div className="border-border/40 divide-y rounded-lg border p-4 shadow-sm">
                <BooleanFilter
                  title="On-campus Accommodation"
                  Icon={House}
                  value={accommodationFilter}
                  onChange={setAccommodationFilter}
                />
              </div>
            </>
          ) : null}

          {/* Mel and Degree type */}
          <MelAndDegreeType
            melAndDegreeTypeFilter={melAndDegreeTypeFilter}
            setMelAndDegreeTypeFilter={setMelAndDegreeTypeFilter}
          />

          {/* PGWP Filter */}
          <div className="border-border/40 divide-y rounded-lg border p-4 shadow-sm">
            <BooleanFilter
              title="Post Graduate Work Permit"
              Icon={BadgeCheck}
              description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                    distinctio."
              value={pgwpFilter}
              onChange={setPgwpFilter}
            />
          </div>

          {/* Financial Aid Filter */}
          <div className="border-border/40 divide-y rounded-lg border p-4 shadow-sm">
            <BooleanFilter
              title="Financial Aids"
              Icon={BadgeCheck}
              description="Programs with financial aids support"
              value={financialAidsFilter ? true : false}
              onChange={(checked: boolean) => {
                if (checked) {
                  setFinancialAidsFilter(financialAids.join(","));
                } else {
                  setFinancialAidsFilter("");
                }
              }}
            />
          </div>

          {/* Intakes */}
          <IntakesFilter
            intakesFilter={intakesFilter}
            setIntakesFilter={setIntakesFilter}
          />
        </div>

        <SheetFooter className="flex flex-row items-center gap-2 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => resetFilters()}
          >
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
