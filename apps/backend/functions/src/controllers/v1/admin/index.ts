/* eslint-disable brace-style */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import { IAdminController } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ControllerUtils } from "../utils";

/** Required dependencies to create AdminController instance */
// export interface AdminControllerDependencies {}

/**
 * Concrete implementation for Admin controller
 *
 * @class
 */

export class AdminController
  extends ControllerUtils
  implements IAdminController
{
  private static instance: IAdminController | null = null;
  private constructor() {
    super();
  }

  /**
   * Creates the AdminController instance
   */

  static factory() {
    if (!AdminController.instance) {
      AdminController.instance = new AdminController();
    }

    return AdminController.instance;
  }

  getMe: IAdminController["getMe"] = async (req, res, next) => {
    try {
      const { user } = this._validateAdmin(req);
      res._success(StatusCodes.OK, user);
    } catch (error) {
      next(error);
    }
  };
}

/** AdminController instance */
export const adminController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ADMIN_CONTROLLER,
  () => AdminController.factory(),
);
