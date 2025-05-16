import { IAdmin } from "interfaces";
import { department, gender } from "../utils/constants";

export type ProfileType = Pick<
  IAdmin,
  | "adminId"
  | "firstName"
  | "middleName"
  | "lastName"
  | "email"
  | "jobTitle"
  | "primaryImage"
  | "nationality"
>;

export type Gender = (typeof gender)[keyof typeof gender];
export type Department = (typeof department)[keyof typeof department];
export type ServerActionReturnType<T> =
  | { success: true; data: T }
  | { success: false; message: string };
