import { ICity, ICountry, IState } from "country-state-city";

export interface ILocation {
  getCountries(): ICountry[];
  getCountryByISOCode(isoCode: string): ICountry | null;

  getCitiesOfState(stateCode: string, countryCode: string): ICity[];
  getState(countryCode: string, stateCode: string): IState | undefined;
}
