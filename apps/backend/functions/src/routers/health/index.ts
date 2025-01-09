import express from "express";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { IRouter } from "../../interface";
import { IHealthController, healthController } from "../../controllers";

interface Dependencies {
  healthController: IHealthController;
}
export class HealthRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(healthController: IHealthController) {
    this.router.route("/").get(healthController.isHealthy);
  }

  static factory(dependencies: Dependencies) {
    if (!HealthRouter.instance) {
      const { healthController } = dependencies;
      HealthRouter.instance = new HealthRouter(healthController);
    }

    return HealthRouter.instance;
  }
}

export const healthRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.HEALTH_ROUTER,
  () => HealthRouter.factory({ healthController }),
);
