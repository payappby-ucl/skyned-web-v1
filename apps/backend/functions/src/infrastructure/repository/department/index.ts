/* eslint-disable brace-style */
import { IRepository } from "../../../interfaces";
import { DBUtils } from "../utils";
import { IDepartmentRepository } from "./interface";

export * from "./interface";

/**
 * Concrete implementation of {IDepartmentRepository}
 * @class
 */

export class DepartmentRepository
  extends DBUtils
  implements IDepartmentRepository
{
  constructor(
    private readonly db: IRepository["db"],
    // private readonly validationUtility: IValidationUtility,
  ) {
    super();
  }

  getDepartments: IDepartmentRepository["getDepartments"] = (args) => {
    return this.db.department.findMany(args);
  };
}
