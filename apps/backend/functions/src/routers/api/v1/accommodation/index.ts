/* eslint-disable max-len */
import express from "express";
import { IAccommodationController, IRouter } from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { accommodationController } from "../../../../controllers";
import { RequestValidationMiddleware } from "../../../../middleware";
import { PageQuerySchema } from "../../../../zod-schemas";

/** Required dependencies for router initialization */
export interface AccommodationRouterDependencies {
  accommodationController: IAccommodationController;
}

/**
 * Handles all routes related to out team
 *
 * @class
 */
export class AccommodationRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(accommodationController: IAccommodationController) {
    this.router.route("/").get(
      RequestValidationMiddleware.validate({
        query: PageQuerySchema.pick({
          limit: true,
        }).partial(),
      }),
      accommodationController.getAccommodations,
    );
  }

  /**
   * Creates the router instance
   */

  static factory({ accommodationController }: AccommodationRouterDependencies) {
    if (!AccommodationRouter.instance) {
      AccommodationRouter.instance = new AccommodationRouter(
        accommodationController,
      );
    }

    return AccommodationRouter.instance;
  }
}

/** Router instance */
export const accommodationRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ACCOMMODATION_ROUTER,
  () =>
    AccommodationRouter.factory({
      accommodationController,
    }),
);
