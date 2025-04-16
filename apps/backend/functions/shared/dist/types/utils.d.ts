import { IAdmin } from "interfaces";
export type ProfileType = Pick<IAdmin, "adminId" | "firstName" | "middleName" | "lastName" | "email" | "jobTitle" | "primaryImage" | "nationality">;
