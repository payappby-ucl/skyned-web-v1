import express from "express";
import { RegisterSchema } from "@workspace/shared";
import { IAuthController, IRouter } from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { RequestValidationMiddleware } from "../../../../middleware";
import { authController } from "../../../../controllers";

/** Required dependencies for auth router initialization */
export interface AuthRouterDependencies {
  authController: IAuthController;
}

/**
 * Handles all routes related to authentication
 *
 * @class
 */
export class AuthRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(authController: IAuthController) {
    this.router.route("/register").post(
      RequestValidationMiddleware.validate({
        body: RegisterSchema,
      }),
      authController.sendEmailVerificationLink,
    );
  }

  /**
   * Creates the auth router instance
   */

  static factory({ authController }: AuthRouterDependencies) {
    if (!AuthRouter.instance) {
      AuthRouter.instance = new AuthRouter(authController);
    }

    return AuthRouter.instance;
  }
}

/** Authentication router instance */
export const authRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.AUTH_ROUTER,
  () =>
    AuthRouter.factory({
      authController,
    }),
);
