import { Country } from "country-state-city";
import { ILocation } from "./interface";

export * from "./interface";
export class Location implements ILocation {
  getCountries: ILocation["getCountries"] = () => {
    const countries = Country.getAllCountries();
    return countries;
  };

  getCountryByISOCode: ILocation["getCountryByISOCode"] = (isoCode) => {
    const country = Country.getCountryByCode(isoCode);
    return country ?? null;
  };
}
