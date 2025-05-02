import express from "express";
import { CreateFaqSchema } from "@workspace/shared";
import {
  IAuthMiddleware,
  IFaqController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { faqController } from "../../../../controllers";

/** Required dependencies for faq router initialization */
export interface FaqRouterDependencies {
  faqController: IFaqController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to faq
 *
 * @class
 */
export class FaqRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    faqController: IFaqController,
    authMiddleware: IAuthMiddleware,
  ) {
    this.router.route("/").post(
      RequestValidationMiddleware.validate({
        body: CreateFaqSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      faqController.createFaq,
    );
    //   .get(
    //     RequestValidationMiddleware.validate({
    //       query: PageQuerySchema.partial(),
    //     }),
    //     authMiddleware.authenticate,
    //     authMiddleware.hasRole(["admin"]),
    //     contactController.getContactUsMessages,
    //   );

    // this.router.route("/:id").delete(
    //   RequestValidationMiddleware.validate({
    //     params: IdSchema,
    //   }),
    //   authMiddleware.authenticate,
    //   authMiddleware.hasRole(["admin"]),
    //   contactController.deleteContactUsMessage,
    // );
  }

  /**
   * Creates the faq router instance
   */

  static factory({ faqController, authMiddleware }: FaqRouterDependencies) {
    if (!FaqRouter.instance) {
      FaqRouter.instance = new FaqRouter(faqController, authMiddleware);
    }

    return FaqRouter.instance;
  }
}

/**  Router instance */
export const faqRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.FAQ_ROUTER,
  () =>
    FaqRouter.factory({
      faqController,
      authMiddleware,
    }),
);
