/* eslint-disable max-len */
import express from "express";
import { IOurTeamController, IRouter } from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { ourTeamController } from "../../../../controllers";
import { RequestValidationMiddleware } from "../../../../middleware";
import { PageQuerySchema } from "../../../../zod-schemas";

/** Required dependencies for our team router initialization */
export interface OurTeamRouterDependencies {
  ourTeamController: IOurTeamController;
}

/**
 * Handles all routes related to out team
 *
 * @class
 */
export class OurTeamRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(ourTeamController: IOurTeamController) {
    this.router.route("/").get(
      RequestValidationMiddleware.validate({
        query: PageQuerySchema.pick({
          limit: true,
        }).partial(),
      }),
      ourTeamController.getOurTeam,
    );
  }

  /**
   * Creates the our team router instance
   */

  static factory({ ourTeamController }: OurTeamRouterDependencies) {
    if (!OurTeamRouter.instance) {
      OurTeamRouter.instance = new OurTeamRouter(ourTeamController);
    }

    return OurTeamRouter.instance;
  }
}

/** OurTeam router instance */
export const ourTeamRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.OUR_TEAM_ROUTER,
  () =>
    OurTeamRouter.factory({
      ourTeamController,
    }),
);
