"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const country_state_city_1 = require("country-state-city");
__exportStar(require("./interface"), exports);
class Location {
    getCountries = () => {
        const countries = country_state_city_1.Country.getAllCountries();
        return countries;
    };
    getCountryByISOCode = (isoCode) => {
        const country = country_state_city_1.Country.getCountryByCode(isoCode);
        return country ?? null;
    };
    getCitiesOfState = (stateCode, countryCode) => {
        const cities = country_state_city_1.City.getCitiesOfState(countryCode, stateCode);
        return cities;
    };
    getState = (countryCode, stateCode) => {
        const state = country_state_city_1.State.getStateByCodeAndCountry(stateCode, countryCode);
        return state;
    };
}
exports.Location = Location;
