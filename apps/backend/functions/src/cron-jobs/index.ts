/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../enum";
import { IIntakeCronJobs, ILogger, ISkynedCronJobs } from "../interfaces";
import SkynedRegistry from "../registry";
import { SkynedUtils } from "../utils";
import { intakeCronJobs } from "./intake";
import { logger } from "../infrastructure";

/** Dependencies needed to instantiate class */
export interface ICronJobsDependencies {
  /** Intake cron jobs */
  intakeCronJobs: IIntakeCronJobs;
  /** logger */
  logger: ILogger;
}

/**
 * Concrete representation for CronJob
 * @class
 */

export class CronJobs implements ISkynedCronJobs {
  private static instance: ISkynedCronJobs | null = null;

  private constructor(
    private readonly logger: ILogger,
    private readonly intakeCronJobs: IIntakeCronJobs,
  ) {}

  static factory({ intakeCronJobs, logger }: ICronJobsDependencies) {
    if (!CronJobs.instance) {
      CronJobs.instance = new CronJobs(logger, intakeCronJobs);
    }
    return CronJobs.instance;
  }

  midNightCronJobs: ISkynedCronJobs["midNightCronJobs"] = async () => {
    try {
      // * Close intakes
      await this.intakeCronJobs.closeAllIntakesDueForClosure();

      // * Publish blog post
    } catch (error: any) {
      const newError = SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message,
      );
      newError.stack = error.stack;

      this.logger.error(newError);
      this.logger.log({
        ...newError,
        message: newError.message,
      });
    }
  };
}

/** concrete instance of {CronJobs} */
export const cronJobs = SkynedRegistry.getSingleton(
  RegistryKeysEnum.CRON_JOBS,
  () =>
    CronJobs.factory({
      intakeCronJobs,
      logger,
    }),
);
