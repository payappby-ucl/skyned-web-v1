/* eslint-disable max-len */
import { IDepartment, ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents Department Controller Concrete implementation */
export interface IDepartmentController {
  /** Gets departments for admin creation. Returns only the department id and name */
  getDepartmentsForAdminCreation: RequestHandler<
    object,
    ISuccessResponse<Pick<IDepartment, "id" | "name">[]>
  >;

  /** Get Departments  */
  getDepartments: RequestHandler<object, ISuccessResponse<IDepartment[]>>;
}
