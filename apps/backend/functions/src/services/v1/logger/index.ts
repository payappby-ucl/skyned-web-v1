/* eslint-disable operator-linebreak */
import { logger } from "firebase-functions";
import { ILoggerService } from "./interface";
import { Exception } from "../../../lib";

export class LoggerService implements ILoggerService {
  private static instance: ILoggerService | null = null;
  private logger = logger;
  private constructor() {
    // * Private
  }
  static factory() {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }

    return LoggerService.instance;
  }

  log: ILoggerService["log"] = (data) => {
    this.logger.log(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };

  error: ILoggerService["error"] = (error) => {
    this.logger.error(Object.entries(error).map(([, value]) => value));
  };

  info: ILoggerService["info"] = (data) => {
    this.logger.info(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };

  warn: ILoggerService["warn"] = (data) => {
    this.logger.warn(
      data instanceof Exception
        ? Object.entries(data).map(([, value]) => value)
        : data,
    );
  };
}
