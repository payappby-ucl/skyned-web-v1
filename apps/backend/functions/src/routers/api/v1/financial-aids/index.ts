import express from "express";
import { FinancialAidSchema } from "@workspace/shared";
import {
  IAuthMiddleware,
  IFinancialAidController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RateLimiterMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { financialAidController } from "../../../../controllers";
import { PageQuerySchema } from "../../../../zod-schemas";

/** Required dependencies for router initialization */
export interface FinancialAidRouterDependencies {
  controller: IFinancialAidController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to faq
 *
 * @class
 */
export class FinancialAidRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    controller: IFinancialAidController,
    authMiddleware: IAuthMiddleware,
  ) {
    this.router
      .route("/")
      .post(
        RateLimiterMiddleware.limit({
          minutes: 60,
          requestPerMinutes: 2,
        }),
        RequestValidationMiddleware.validate({
          body: FinancialAidSchema,
        }),
        authMiddleware.safeAuthenticate,
        controller.create,
      )
      .get(
        RequestValidationMiddleware.validate({
          query: PageQuerySchema.partial(),
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        controller.getFinancialAids,
      );

    // this.router.route("/:id").get(
    //   RequestValidationMiddleware.validate({
    //     params: IdSchema,
    //   }),
    //   authMiddleware.authenticate,
    //   authMiddleware.hasRole(["admin"]),
    //   faqController.getFaq,
    // );
  }

  /**
   * Creates the faq router instance
   */

  static factory({
    controller,
    authMiddleware,
  }: FinancialAidRouterDependencies) {
    if (!FinancialAidRouter.instance) {
      FinancialAidRouter.instance = new FinancialAidRouter(
        controller,
        authMiddleware,
      );
    }

    return FinancialAidRouter.instance;
  }
}

/**  Router instance */
export const financialAidRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.FINANCIAL_AID_ROUTER,
  () =>
    FinancialAidRouter.factory({
      controller: financialAidController,
      authMiddleware,
    }),
);
