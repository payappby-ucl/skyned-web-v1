/* eslint-disable operator-linebreak */
import { logger as FBLogger } from "firebase-functions";
import { ILogger } from "./interface";
import { Exception } from "../../lib";
import SkynedRegistry from "../../registry";
import { RegistryKeysEnum } from "../../enum";

export * from "./interface";
export class Logger implements ILogger {
  private static instance: ILogger | null = null;
  private logger = FBLogger;
  private constructor() {
    // * Private
  }
  static factory() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  log: ILogger["log"] = (data) => {
    this.logger.log(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };

  error: ILogger["error"] = (error) => {
    this.logger.error(Object.entries(error).map(([, value]) => value));
  };

  info: ILogger["info"] = (data) => {
    this.logger.info(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };

  warn: ILogger["warn"] = (data) => {
    this.logger.warn(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };
}

export const logger = SkynedRegistry.getSingleton(
  RegistryKeysEnum.LOGGER,
  Logger.factory,
);
