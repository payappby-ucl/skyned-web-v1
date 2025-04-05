/* eslint-disable max-len */
import { EventEmitter } from "node:events";
import { IEvents, ILogger, IMarketing } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { EventsEnum, RegistryKeysEnum } from "../../enum";
import { logger, marketing } from "..";
import { SkynedUtils } from "../../utils";
import { StatusCodes } from "http-status-codes";

/** Represents dependencies needed to instantiate Events class */
export interface EventsDependencies {
  /** Logger infrastructure */
  logger: ILogger;
  /** Marketing infrastructure */
  marketing: IMarketing;
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
  ) {
    super();
    this.on(
      EventsEnum.CREATE_MARKETING_CONTACT_EVENT,
      this.createContactForMarketing,
    );
  }

  static factory({ logger, marketing }: EventsDependencies) {
    if (!Events.instance) {
      Events.instance = new Events(logger, marketing);
    }
    return Events.instance;
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
      const customError = SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message,
      );

      this.logger.error(customError);

      return customError;
    }
  };
}

/** Events instance */
export const events = SkynedRegistry.getSingleton(RegistryKeysEnum.EVENTS, () =>
  Events.factory({
    logger,
    marketing,
  }),
);
