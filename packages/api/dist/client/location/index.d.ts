import { ILocation } from "./interface";
export * from "./interface";
export declare class Location implements ILocation {
    getCountries: ILocation["getCountries"];
    getCountryByISOCode: ILocation["getCountryByISOCode"];
    getCitiesOfState: ILocation["getCitiesOfState"];
    getState: ILocation["getState"];
}
