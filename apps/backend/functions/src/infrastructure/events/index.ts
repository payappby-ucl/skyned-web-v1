/* eslint-disable max-len */
import { EventEmitter } from "node:events";
import {
  IActivityLogService,
  IEmailService,
  IEvents,
  ILogger,
  IMarketing,
} from "../../interfaces";
import SkynedRegistry from "../../registry";
import { EventsEnum, RegistryKeysEnum } from "../../enum";
import { emailService } from "../../services/v1/email";
import { SkynedUtils } from "../../utils";
import { StatusCodes } from "http-status-codes";
import { logger } from "../logger";
import { marketing } from "../marketing";
import { activityLogService } from "../../services/v1/activity-log";

/** Represents dependencies needed to instantiate Events class */
export interface EventsDependencies {
  /** Logger infrastructure */
  logger: ILogger;
  /** Marketing infrastructure */
  marketing: IMarketing;
  /** email service */
  emailService: IEmailService;
  /** Activity log service */
  activityLogService: IActivityLogService;
}

/**
 * Concrete implementation of IEvents using the EventEmitter from node
 *
 * @class
 */
export class Events extends EventEmitter implements IEvents {
  private static instance: IEvents | null = null;

  private constructor(
    private readonly logger: ILogger,
    private readonly marketing: IMarketing,
    private readonly emailService: IEmailService,
    private readonly activityLogService: IActivityLogService,
  ) {
    super();

    this.on(
      EventsEnum.CREATE_MARKETING_CONTACT_EVENT,
      this.createContactForMarketing,
    );
    this.on(EventsEnum.SEND_EMAIL_EVENT, this.sendMail);
    this.on(EventsEnum.CREATE_ACTIVITY_LOG, this.createActivityLog);
  }

  static factory({
    logger,
    marketing,
    emailService,
    activityLogService,
  }: EventsDependencies) {
    if (!Events.instance) {
      Events.instance = new Events(
        logger,
        marketing,
        emailService,
        activityLogService,
      );
    }
    return Events.instance;
  }

  private _handleError(error: any) {
    const customError = SkynedUtils.createException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
    );

    this.logger.error(customError);
    return customError;
  }

  /** Emits event */
  emitEvent: IEvents["emitEvent"] = ({ type, data }) => {
    this.emit(type, data);
  };

  /** Creates a contact on the marketing platform and subscribe the contact to a newsletter */

  createContactForMarketing: IEvents["createContactForMarketing"] = async (
    data,
  ) => {
    try {
      const { contactId } = await this.marketing.createContact(data);

      // TODO: Add to tag/audience

      if (typeof contactId === "string") {
        return {
          contactId: parseInt(contactId),
        };
      }

      return { contactId };
    } catch (error: any) {
      return this._handleError(error);
    }
  };

  /** Send email */

  sendMail: IEvents["sendMail"] = async (
    data: Parameters<IEvents["sendMail"]>["0"],
  ) => {
    try {
      await this.emailService.send(data);
    } catch (error: any) {
      this._handleError(error);
    }
  };

  /** Create Activity Log */

  createActivityLog: IEvents["createActivityLog"] = async (data) => {
    try {
      await this.activityLogService.create(data);
    } catch (error) {
      this._handleError(error);
    }
  };
}
/** Events instance */
export const events = SkynedRegistry.getSingleton(RegistryKeysEnum.EVENTS, () =>
  Events.factory({
    logger,
    marketing,
    emailService,
    activityLogService,
  }),
);
