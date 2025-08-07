import express from "express";
import {
  IAdminController,
  IAuthMiddleware,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { adminController } from "../../../../controllers";
import { CreateAdminSchema, UpdateAdminSchema } from "@workspace/shared";
import {
  AdminIdSchema,
  DateRangeSchema,
  PageQuerySchema,
} from "../../../../zod-schemas";

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
      .route("/")
      .post(
        RequestValidationMiddleware.validate({
          body: CreateAdminSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        adminController.createAdmin,
      )
      .get(
        RequestValidationMiddleware.validate({
          query: PageQuerySchema.partial(),
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        adminController.getAdminList,
      );

    this.router
      .route("/me")
      .get(
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        adminController.getMe,
      );

    // * Analytics
    this.router
      .route("/dashboard/kpis")
      .get(
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        adminController.getKPIs,
      );

    this.router.route("/dashboard/trends").get(
      RequestValidationMiddleware.validate({
        query: DateRangeSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      adminController.getTrends,
    );

    this.router
      .route("/:adminId")
      .get(
        RequestValidationMiddleware.validate({
          params: AdminIdSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        adminController.getAdminProfile,
      )
      .put(
        RequestValidationMiddleware.validate({
          params: AdminIdSchema,
          body: UpdateAdminSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        adminController.updateAdminProfile,
      );

    // * Suspend / Release Admin
    this.router.route("/:adminId/activate").patch(
      RequestValidationMiddleware.validate({
        params: AdminIdSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      adminController.activateAccount,
    );

    this.router.route("/:adminId/deactivate").patch(
      RequestValidationMiddleware.validate({
        params: AdminIdSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      adminController.deactivateAccount,
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
