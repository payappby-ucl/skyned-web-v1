import { Department } from "../types";
import { IAdmin } from "../interfaces";
export * from "./constants";
export declare const isInDepartment: (admin: IAdmin, departments: Department[]) => boolean;
