"use client";
import * as React from "react";
import { Country } from "country-state-city";
import { AsYouType } from "libphonenumber-js";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

function PhoneInput(
  props: React.ComponentProps<"input"> & { defaultcountry?: string },
) {
  const { value, defaultcountry } = props;

  const countries = React.useMemo(() => Country.getAllCountries(), []);

  const [selectedCountry, setSelectedCountry] = React.useState<{
    isoCode: string | undefined;
    flag: string | undefined;
    name: string | undefined;
    phonecode: string | undefined;
  } | null>(() => {
    const country = Country.getCountryByCode(defaultcountry || "NG");

    return {
      isoCode: country?.isoCode,
      flag: country?.flag,
      name: country?.name,
      phonecode: country?.phonecode,
    };
  });

  React.useEffect(() => {
    if (!value) {
      setSelectedCountry(null);
    }
    if (!selectedCountry) {
      const asYouType = new AsYouType();
      asYouType.input(value as string);
      const countryCode = asYouType.getCallingCode();
      if (countryCode) {
        const countryObject = countries.find(
          (c) => c.phonecode === countryCode,
        );
        if (countryObject) {
          setSelectedCountry({
            isoCode: countryObject.isoCode,
            flag: countryObject.flag,
            name: countryObject.name,
            phonecode: countryObject.phonecode,
          });
        }
      } else {
        setSelectedCountry(null);
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (selectedCountry?.phonecode) {
      const phoneCode = `+${selectedCountry.phonecode
        .substring(
          0,
          selectedCountry.phonecode.indexOf("-") >= 0
            ? selectedCountry.phonecode.indexOf("-")
            : selectedCountry.phonecode.length,
        )
        .replace("+", "")}`;

      const asYouType = new AsYouType();
      asYouType.input(value as string);
      const countryCode = asYouType.getCallingCode();

      const event = {
        target: {
          value: phoneCode,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      if (
        value &&
        countryCode &&
        (value as string).length > countryCode.length
      ) {
        const number = (value as string).replace(`+${countryCode}`, phoneCode);
        event.target.value = number;
      }

      props.onChange?.(event);
    }
  }, [selectedCountry]);

  const handleCountrySelectChange = React.useCallback((isoCode: string) => {
    const country = Country.getCountryByCode(isoCode);
    if (country) {
      setSelectedCountry({
        isoCode: country.isoCode,
        flag: country.flag,
        name: country.name,
        phonecode: country.phonecode,
      });
    }
  }, []);

  return (
    <div
      className="flex items-center border dark:bg-input/30 bg-transparent shadow-xs transition-[color,box-shadow] rounded-md has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-aria-invalid:dark:ring-destructive/40
    has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]
    "
    >
      <Select onValueChange={handleCountrySelectChange}>
        <SelectTrigger className="border-0 rounded-r-none border-r">
          <span className="text-lg">{selectedCountry?.flag}</span>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => {
            const phoneCode = `+${country.phonecode
              .substring(
                0,
                country.phonecode.indexOf("-") >= 0
                  ? country.phonecode.indexOf("-")
                  : country.phonecode.length,
              )
              .replace("+", "")}`;

            return (
              <SelectItem
                key={`${country.isoCode}-${country.name}`}
                value={country.isoCode}
              >
                <p className="font-medium text-sm">
                  {country.name} {country.flag}{" "}
                  <span className="text-muted-foreground">{phoneCode}</span>
                </p>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Input
        {...props}
        value={new AsYouType().input(value as string)}
        className="border-0 rounded-none focus:ring-0 aria-invalid:ring-0"
      />
    </div>
  );
}

export { PhoneInput };
