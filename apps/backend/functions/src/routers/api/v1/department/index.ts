import express from "express";
import {
  IAuthMiddleware,
  IDepartmentController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { authMiddleware } from "../../../../middleware";
import { departmentController } from "../../../../controllers";

/** Required dependencies for router initialization */
export interface DepartmentRouterDependencies {
  departmentController: IDepartmentController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to departments
 *
 * @class
 */
export class DepartmentRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    authMiddleware: IAuthMiddleware,
    departmentController: IDepartmentController,
  ) {
    this.router.route("/").get(
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      // TODO: Add Controller
    );

    this.router
      .route("/create")
      .get(
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        departmentController.getDepartmentsForAdminCreation,
      );
  }

  /**
   * Creates the auth router instance
   */

  static factory({
    departmentController,
    authMiddleware,
  }: DepartmentRouterDependencies) {
    if (!DepartmentRouter.instance) {
      DepartmentRouter.instance = new DepartmentRouter(
        authMiddleware,
        departmentController,
      );
    }

    return DepartmentRouter.instance;
  }
}

/** Router instance */
export const departmentRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.DEPARTMENT_ROUTER,
  () =>
    DepartmentRouter.factory({
      departmentController,
      authMiddleware,
    }),
);
