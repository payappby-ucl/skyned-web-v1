import { IAdmin } from "interfaces";
import { currencies, department, gender, institutionType, ownershipType } from "../utils/constants";
export type ProfileType = Pick<IAdmin, "adminId" | "firstName" | "middleName" | "lastName" | "email" | "jobTitle" | "primaryImage" | "nationality">;
export type Gender = (typeof gender)[keyof typeof gender];
export type Department = (typeof department)[keyof typeof department];
export type InstitutionType = (typeof institutionType)[keyof typeof institutionType];
export type OwnershipType = (typeof ownershipType)[keyof typeof ownershipType];
export type CurrencyType = (typeof currencies)[keyof typeof currencies];
export type ServerActionReturnType<T> = {
    success: true;
    data: T;
} | {
    success: false;
    message: string;
};
