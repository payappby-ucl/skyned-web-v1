import { Department } from "../types";
import { IAdmin } from "../interfaces";

export * from "./constants";
export * from "./education-level";
export * from "./degree-types";
export * from "./english-proficiency";
export * from "./financial-aid";

export const isInDepartment = (admin: IAdmin, departments: Department[]) => {
  return (
    admin.departments?.some((department) =>
      departments.includes(department.name),
    ) || false
  );
};
