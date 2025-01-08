import { logger } from "firebase-functions";
import { ILoggerService } from "./interface";
import { SkynedUtils } from "../../../lib";

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
    this.logger.log(SkynedUtils.pick(data, ["message", "stack", "statusCode"]));
  };

  error: ILoggerService["error"] = (error) => {
    this.logger.error(
      SkynedUtils.pick(error, ["message", "stack", "statusCode"]),
    );
  };

  info: ILoggerService["info"] = (data) => {
    this.logger.info(
      SkynedUtils.pick(data, ["message", "stack", "statusCode"]),
    );
  };

  warn: ILoggerService["warn"] = (data) => {
    this.logger.warn(
      SkynedUtils.pick(data, ["message", "stack", "statusCode"]),
    );
  };
}
