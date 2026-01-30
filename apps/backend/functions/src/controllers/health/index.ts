import { StatusCodes } from "http-status-codes";
import { IHealthController } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { RegistryKeysEnum } from "../../enum";

/**
 * Represents Health Controller
 *
 * @class
 */

export class HealthController implements IHealthController {
  private static instance: IHealthController | null = null;
  private constructor() {
    // * Private
  }

  /**
   * Creates the health controller instance
   */

  static factory() {
    if (!HealthController.instance) {
      HealthController.instance = new HealthController();
    }

    return HealthController.instance;
  }

  /**
   * Handles route to check if the server is running
   */

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

/** Creates/Gets the health controller instance */
export const healthController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.HEALTH_CONTROLLER,
  HealthController.factory,
);
