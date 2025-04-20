import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import { IAdminController } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { SkynedUtils } from "../../../utils";

/** Required dependencies to create AdminController instance */
// export interface AdminControllerDependencies {}

/**
 * Concrete implementation for Admin controller
 *
 * @class
 */

export class AdminController implements IAdminController {
  private static instance: IAdminController | null = null;
  private constructor() {
    // * Private
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

  private _validateAdmin(req: Express.Request) {
    if (!req.skynedAuth.admin) {
      throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
    }

    return req.skynedAuth.admin;
  }

  getMe: IAdminController["getMe"] = async (req, res, next) => {
    try {
      const admin = this._validateAdmin(req);
      res._success(StatusCodes.OK, admin);
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
