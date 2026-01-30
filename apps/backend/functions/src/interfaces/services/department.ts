import { IAdmin, IDepartment } from "@workspace/shared";
import { IDepartmentRepository } from "../../infrastructure";

/** Represents department service */
export interface IDepartmentService {
  /** Get departments */
  getDepartments(
    user: IAdmin,
  ): ReturnType<IDepartmentRepository["getDepartments"]>;

  /** Gets Departments with only details needed for admin creation */
  getDepartmentsForAdminCreation(
    user: IAdmin,
  ): ReturnType<IDepartmentRepository["getDepartments"]>;

  /** Fetch departments in list */
  fetchDepartmentsInArrayListWithIds(ids: number[]): Promise<IDepartment[]>;

  /** Get Departments for nav */
  getDepartmentsForNavigation(): Promise<IDepartment[]>;
}
