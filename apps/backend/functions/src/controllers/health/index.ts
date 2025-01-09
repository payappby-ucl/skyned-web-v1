import { StatusCodes } from "http-status-codes";
import { IHealthController } from "./interface";
import SkynedRegistry from "../../registry";
import { RegistryKeysEnum } from "../../enum";

export * from "./interface";
export class HealthController implements IHealthController {
  private static instance: IHealthController | null = null;
  private constructor() {
    // * Private
  }
  static factory() {
    if (!HealthController.instance) {
      HealthController.instance = new HealthController();
    }

    return HealthController.instance;
  }

  isHealthy: IHealthController["isHealthy"] = async (req, res, next) => {
    try {
      res._success(StatusCodes.OK, {
        message: "Skyned Server is healthy.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export const healthController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.HEALTH_CONTROLLER,
  HealthController.factory,
);
