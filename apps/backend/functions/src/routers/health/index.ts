import express from "express";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { IHealthController, IRouter } from "../../interfaces";
import { healthController } from "../../controllers";

/**
 * Represent a dependencies needed to create the health router
 */
export interface HealthRouterDependencies {
  /** Handles health check */
  healthController: IHealthController;
}

/**
 * Represents health router
 *
 * @class
 */
export class HealthRouter implements IRouter {
  private static instance: IRouter | null = null;

  /**
   * The Router
   */
  router = express.Router();

  private constructor(healthController: IHealthController) {
    this.router.route("/").get(healthController.isHealthy);
  }

  /**
   * Creates the health router instance
   */

  static factory(dependencies: HealthRouterDependencies) {
    if (!HealthRouter.instance) {
      const { healthController } = dependencies;
      HealthRouter.instance = new HealthRouter(healthController);
    }

    return HealthRouter.instance;
  }
}

/** Creates/Gets the health router instance */
export const healthRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.HEALTH_ROUTER,
  () => HealthRouter.factory({ healthController }),
);
