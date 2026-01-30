"use client";

import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { Country } from "country-state-city";
import { SelectProps } from "@radix-ui/react-select";

const countries = Country.getAllCountries();
function CountryInput({ value, onValueChange, ...rest }: SelectProps) {
  const selectedCountry = useMemo(
    () => Country.getCountryByCode(value as string),
    [value],
  );

  return (
    <Select value={value} onValueChange={onValueChange} {...rest}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <p>{selectedCountry?.name || "Select Country"}</p>
          <span className="text-lg">{selectedCountry?.flag}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem
            key={`${country.isoCode}-${country.name}`}
            value={country.isoCode}
          >
            <p className="font-medium text-sm">
              {country.name} {country.flag}
            </p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { CountryInput };
