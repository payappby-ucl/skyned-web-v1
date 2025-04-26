import express from "express";
import { ContactUsSchema } from "@workspace/shared";
import {
  IAuthMiddleware,
  IContactController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RateLimiterMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { contactController } from "../../../../controllers";
import { PageQuerySchema } from "../../../../zod-schemas";

/** Required dependencies for auth router initialization */
export interface ContactRouterDependencies {
  contactController: IContactController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to contact us
 *
 * @class
 */
export class ContactRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    contactController: IContactController,
    authMiddleware: IAuthMiddleware,
  ) {
    this.router
      .route("/")
      .get(
        RequestValidationMiddleware.validate({
          query: PageQuerySchema.partial(),
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        contactController.getContactUsMessages,
      )
      .post(
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

  static factory({
    contactController,
    authMiddleware,
  }: ContactRouterDependencies) {
    if (!ContactRouter.instance) {
      ContactRouter.instance = new ContactRouter(
        contactController,
        authMiddleware,
      );
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
      authMiddleware,
    }),
);
