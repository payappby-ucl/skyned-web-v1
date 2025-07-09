/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../enum";
import {
  IBlogPostCronJobs,
  IIntakeCronJobs,
  ILogger,
  ISkynedCronJobs,
} from "../interfaces";
import SkynedRegistry from "../registry";
import { SkynedUtils } from "../utils";
import { intakeCronJobs } from "./intake";
import { logger } from "../infrastructure";
import { blogPostCronJobs } from "./blog-post";

/** Dependencies needed to instantiate class */
export interface ICronJobsDependencies {
  /** Intake cron jobs */
  intakeCronJobs: IIntakeCronJobs;
  /** logger */
  logger: ILogger;
  /** Blog post jobs */
  blogPostCronJobs: IBlogPostCronJobs;
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
    private readonly blogPostCronJobs: IBlogPostCronJobs,
  ) {}

  static factory({
    intakeCronJobs,
    logger,
    blogPostCronJobs,
  }: ICronJobsDependencies) {
    if (!CronJobs.instance) {
      CronJobs.instance = new CronJobs(
        logger,
        intakeCronJobs,
        blogPostCronJobs,
      );
    }
    return CronJobs.instance;
  }

  midNightCronJobs: ISkynedCronJobs["midNightCronJobs"] = async () => {
    try {
      // * Close intakes
      await this.intakeCronJobs.closeAllIntakesDueForClosure();

      // * Publish blog post
      await this.blogPostCronJobs.PublishPosts();
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
      blogPostCronJobs,
    }),
);
