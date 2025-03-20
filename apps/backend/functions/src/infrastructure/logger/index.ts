/* eslint-disable operator-linebreak */
import { logger as FBLogger } from "firebase-functions";
import { ILogger } from "../../interfaces";
import { Exception } from "../../lib";
import SkynedRegistry from "../../registry";
import { RegistryKeysEnum } from "../../enum";

/**
 * Represents concrete logger class
 *
 * @class
 */

export class Logger implements ILogger {
  private static instance: ILogger | null = null;
  private logger = FBLogger;
  private constructor() {
    // * Private
  }

  /** Creates the logger instance */

  static factory() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  /** logs */

  log: ILogger["log"] = (data) => {
    this.logger.log(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };

  /** logs error */

  error: ILogger["error"] = (error) => {
    this.logger.error(Object.entries(error).map(([, value]) => value));
  };

  /** Info logs */

  info: ILogger["info"] = (data) => {
    this.logger.info(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };

  /** Warning logs */

  warn: ILogger["warn"] = (data) => {
    this.logger.warn(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };
}

/** Logger instance */
export const logger = SkynedRegistry.getSingleton(
  RegistryKeysEnum.LOGGER,
  Logger.factory,
);
