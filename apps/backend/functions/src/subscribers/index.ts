import { RegistryKeysEnum } from "../enum";
import SkynedRegistry from "../registry";
import { ISubscriber } from "./interface";
import {
  IActivityLogService,
  IEmailService,
  ILogger,
  IMarketing,
} from "../interfaces";
import { logger, marketing } from "../infrastructure";
import { StatusCodes } from "http-status-codes";
import { SkynedUtils } from "../utils";
import { emailService, activityLogService } from "../services";
import { env } from "../config";

export * from "./interface";
export interface SubscriberDependencies {
  /** For logging */
  logger: ILogger;

  /** Marketing infrastructure */
  marketing: IMarketing;
  /** email service */
  emailService: IEmailService;
  /** Activity log service */
  activityLogService: IActivityLogService;
}
/** Concrete implementation of subscriber */

export class Subscriber implements ISubscriber {
  private static instance: ISubscriber | null = null;
  private constructor(
    private readonly logger: ILogger,
    private readonly marketing: IMarketing,
    private readonly emailService: IEmailService,
    private readonly activityLogService: IActivityLogService,
  ) {}

  static factory({
    logger,
    marketing,
    emailService,
    activityLogService,
  }: SubscriberDependencies) {
    if (!Subscriber.instance) {
      Subscriber.instance = new Subscriber(
        logger,
        marketing,
        emailService,
        activityLogService,
      );
    }

    return Subscriber.instance;
  }

  sendMail: ISubscriber["sendMail"] = async (event) => {
    try {
      const data = event.data.message.json;
      await this.emailService.send(data);
      return;
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

  createActivityLog: ISubscriber["createActivityLog"] = async (event) => {
    try {
      const data = event.data.message.json;
      await this.activityLogService.create(data);
      return;
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

  createContactForMarketing: ISubscriber["createContactForMarketing"] = async (
    event,
  ) => {
    try {
      const data = event.data.message.json;

      let { contactId } = await this.marketing.createContact(data);

      if (typeof contactId === "string") {
        contactId = parseInt(contactId);
      }

      await this.marketing.addContactToAudience({
        contactId,
        audienceId: env.marketing.systemIo.subscriptionTagId,
      });
      return;
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

/** Concrete instance */
export const subscriber = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SUBSCRIBER,
  () =>
    Subscriber.factory({ logger, marketing, emailService, activityLogService }),
);
