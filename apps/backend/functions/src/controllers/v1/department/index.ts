/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import { IDepartmentController, IDepartmentService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { departmentService } from "../../../services";
import { ControllerUtils } from "../utils";

/** Represents dependencies needed to create controller instance */
export interface IDepartmentControllerDependencies {
  departmentService: IDepartmentService;
}

/**
 * Concrete implementation of {IDepartmentController}
 * @class
 */

export class DepartmentController
  extends ControllerUtils
  implements IDepartmentController
{
  private static instance: IDepartmentController | null = null;
  private constructor(private readonly departmentService: IDepartmentService) {
    super();
  }
  /** creates {DepartmentController} instance */

  static factory({ departmentService }: IDepartmentControllerDependencies) {
    if (!DepartmentController.instance) {
      DepartmentController.instance = new DepartmentController(
        departmentService,
      );
    }

    return DepartmentController.instance;
  }

  getDepartmentsForAdminCreation: IDepartmentController["getDepartmentsForAdminCreation"] =
    async (req, res, next) => {
      try {
        const authUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(authUser, "departments", "list");
        const departments =
          await this.departmentService.getDepartmentsForAdminCreation(
            authUser.user,
          );

        res._success(StatusCodes.OK, departments);
      } catch (error) {
        next(error);
      }
    };
}

/** Instance of {DepartmentController} */
export const departmentController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.DEPARTMENT_CONTROLLER,
  () =>
    DepartmentController.factory({
      departmentService,
    }),
);
