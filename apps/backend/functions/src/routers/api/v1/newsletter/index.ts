/* eslint-disable max-len */
import express from "express";
import { INewsletterController, IRouter } from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  RateLimiterMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { CommonSchema } from "@workspace/shared";
import { newsletterController } from "../../../../controllers";

/** Required dependencies for newsletter router initialization */
export interface NewsletterRouterDependencies {
  newsletterController: INewsletterController;
}

/**
 * Handles all routes related to newsletter
 *
 * @class
 */
export class NewsletterRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(newsletterController: INewsletterController) {
    this.router.route("/subscribe").post(
      RateLimiterMiddleware.limit({
        minutes: 60,
        requestPerMinutes: 2,
      }),
      RequestValidationMiddleware.validate({
        body: CommonSchema.pick({ email: true }),
      }),
      newsletterController.subscribeToNewsletter,
    );
  }

  /**
   * Creates the newsletter router instance
   */

  static factory({ newsletterController }: NewsletterRouterDependencies) {
    if (!NewsletterRouter.instance) {
      NewsletterRouter.instance = new NewsletterRouter(newsletterController);
    }

    return NewsletterRouter.instance;
  }
}

/** Newsletter router instance */
export const newsletterRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.NEWSLETTER_ROUTER,
  () =>
    NewsletterRouter.factory({
      newsletterController,
    }),
);
