import express from "express";
import {
  IAdminController,
  IAuthMiddleware,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { authMiddleware } from "../../../../middleware";
import { adminController } from "../../../../controllers";

/** Required dependencies for admin router initialization */
export interface AdminRouterDependencies {
  adminController: IAdminController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to authentication
 *
 * @class
 */
export class AdminRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    adminController: IAdminController,
    authMiddleware: IAuthMiddleware,
  ) {
    this.router
      .route("/me")
      .get(
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        adminController.getMe,
      );
  }

  /**
   * Creates the auth router instance
   */

  static factory({ adminController, authMiddleware }: AdminRouterDependencies) {
    if (!AdminRouter.instance) {
      AdminRouter.instance = new AdminRouter(adminController, authMiddleware);
    }

    return AdminRouter.instance;
  }
}

/** Authentication router instance */
export const adminRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ADMIN_ROUTER,
  () =>
    AdminRouter.factory({
      adminController,
      authMiddleware,
    }),
);
