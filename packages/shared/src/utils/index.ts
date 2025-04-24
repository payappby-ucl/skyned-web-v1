import { Department } from "../types";
import { IAdmin } from "../interfaces";

export * from "./constants";

export const isInDepartment = (admin: IAdmin, departments: Department[]) => {
  return (
    admin.departments?.some((department) =>
      departments.includes(department.name),
    ) || false
  );
};
