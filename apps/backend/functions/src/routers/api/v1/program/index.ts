/* eslint-disable max-len */
import express from "express";
import {
  IProgramController,
  IRouter,
  IAuthMiddleware,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { programController } from "../../../../controllers";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { PageQuerySchema, ProgramQuerySchema } from "../../../../zod-schemas";

/** Required dependencies for router initialization */
export interface ProgramRouterDependencies {
  authMiddleware: IAuthMiddleware;
  controller: IProgramController;
}

/**
 * Handles all routes related to programs
 *
 * @class
 */
export class ProgramRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    authMiddleware: IAuthMiddleware,
    controller: IProgramController,
  ) {
    this.router.route("/").get(
      RequestValidationMiddleware.validate({
        query: PageQuerySchema.merge(ProgramQuerySchema).partial(),
      }),
      authMiddleware.safeAuthenticate,
      controller.listPrograms,
    );
  }

  /**
   * Creates the our team router instance
   */

  static factory({ controller, authMiddleware }: ProgramRouterDependencies) {
    if (!ProgramRouter.instance) {
      ProgramRouter.instance = new ProgramRouter(authMiddleware, controller);
    }

    return ProgramRouter.instance;
  }
}

/** OurTeam router instance */
export const programRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.PROGRAM_ROUTER,
  () =>
    ProgramRouter.factory({
      controller: programController,
      authMiddleware,
    }),
);
