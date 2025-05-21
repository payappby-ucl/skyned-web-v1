import { City, Country } from "country-state-city";
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

  getCitiesOfState: ILocation["getCitiesOfState"] = (
    stateCode,
    countryCode,
  ) => {
    const cities = City.getCitiesOfState(countryCode, stateCode);

    return cities;
  };
}
