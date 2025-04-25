import express from "express";
import { ContactUsSchema } from "@workspace/shared";
import { IContactController, IRouter } from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  RateLimiterMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { contactController } from "../../../../controllers";

/** Required dependencies for auth router initialization */
export interface ContactRouterDependencies {
  contactController: IContactController;
}

/**
 * Handles all routes related to contact us
 *
 * @class
 */
export class ContactRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(contactController: IContactController) {
    this.router.route("/").post(
      RateLimiterMiddleware.limit({
        minutes: 60,
        requestPerMinutes: 2,
      }),
      RequestValidationMiddleware.validate({
        body: ContactUsSchema,
      }),
      contactController.createAndSendContactMessage,
    );
  }

  /**
   * Creates the contact router instance
   */

  static factory({ contactController }: ContactRouterDependencies) {
    if (!ContactRouter.instance) {
      ContactRouter.instance = new ContactRouter(contactController);
    }

    return ContactRouter.instance;
  }
}

/** Authentication router instance */
export const contactRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.CONTACT_ROUTER,
  () =>
    ContactRouter.factory({
      contactController,
    }),
);
