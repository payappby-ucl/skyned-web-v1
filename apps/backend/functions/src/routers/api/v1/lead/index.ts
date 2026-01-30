import express from "express";
import {
  IAuthMiddleware,
  ILeadController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { leadController } from "../../../../controllers";
import { ApplyFormSchema } from "@workspace/shared";

/** Required dependencies for lead router initialization */
export interface LeadRouterDependencies {
  /** Auth Middleware */
  authMiddleware: IAuthMiddleware;
  /** Lead Controller */
  controller: ILeadController;
}

/**
 * Handles all routes related to lead
 *
 * @class
 */
export class LeadRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    authMiddleware: IAuthMiddleware,
    controller: ILeadController,
  ) {
    // * Collects lead information
    this.router.route("/").post(
      RequestValidationMiddleware.validate({
        body: ApplyFormSchema,
      }),
      authMiddleware.safeAuthenticate,
      controller.sendLeadToComms,
    );
  }

  /**
   * Creates the lead router instance
   */

  static factory({ authMiddleware, controller }: LeadRouterDependencies) {
    if (!LeadRouter.instance) {
      LeadRouter.instance = new LeadRouter(authMiddleware, controller);
    }

    return LeadRouter.instance;
  }
}

/** Authentication router instance */
export const leadRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.LEAD_ROUTER,
  () =>
    LeadRouter.factory({
      authMiddleware,
      controller: leadController,
    }),
);
