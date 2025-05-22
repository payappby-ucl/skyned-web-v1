"use client";

import { useEffect, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { SelectProps } from "@radix-ui/react-select";
import { State } from "country-state-city";

function StateInput({ country, ...props }: SelectProps & { country: string }) {
  const states = useMemo(() => State.getStatesOfCountry(country), [country]);

  const selectedState = useMemo(
    () => State.getStateByCodeAndCountry(props.value as string, country),
    [props.value, country],
  );

  useEffect(() => {
    props.onValueChange?.(selectedState?.isoCode || "");
  }, [country]);

  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <p>{selectedState?.name}</p>
        </div>
      </SelectTrigger>
      <SelectContent>
        {states.map((state) => (
          <SelectItem
            key={`${state.isoCode}-${state.name}`}
            value={state.isoCode}
          >
            <p className="font-medium text-sm">{state.name}</p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { StateInput };
