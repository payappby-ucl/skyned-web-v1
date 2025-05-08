import { ICountry } from "country-state-city";
export interface ILocation {
    getCountries(): ICountry[];
    getCountryByISOCode(isoCode: string): ICountry | null;
}
