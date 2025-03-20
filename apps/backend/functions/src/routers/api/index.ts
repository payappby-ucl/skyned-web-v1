import express from "express";
import { v1Router } from "./v1";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { IRouter } from "../../interfaces";

/**
 * Dependencies required for API Router instance
 */
interface Dependencies {
  /** Version one router instance */
  v1Router: IRouter;
}

/**
 * The API router class
 *
 * @class
 */
export class ApiRouter implements IRouter {
  private static instance: IRouter | null = null;

  /**
   * The router
   */
  router = express.Router();

  private constructor(v1Router: IRouter) {
    this.router.use("/v1", v1Router.router);
  }

  /**
   * Factory method to create API router instance
   *
   * @param {Dependencies} dependencies
   * @returns The API router instance
   */

  static factory(dependencies: Dependencies) {
    if (!ApiRouter.instance) {
      const { v1Router } = dependencies;
      ApiRouter.instance = new ApiRouter(v1Router);
    }

    return ApiRouter.instance;
  }
}

/** The API router instance */
export const apiRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.API_ROUTER,
  () => ApiRouter.factory({ v1Router }),
);
