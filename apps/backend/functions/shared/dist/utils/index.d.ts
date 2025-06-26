import { Department } from "../types";
import { IAdmin } from "../interfaces";
export * from "./constants";
export * from "./education-level";
export * from "./degree-types";
export * from "./english-proficiency";
export declare const isInDepartment: (admin: IAdmin, departments: Department[]) => boolean;
