import { PubSub } from "@google-cloud/pubsub";
import { RegistryKeysEnum } from "../enum";
import SkynedRegistry from "../registry";
import { IPublisher } from "./interface";
import { ILogger } from "../interfaces";
import { logger } from "../infrastructure";
import { StatusCodes } from "http-status-codes";
import { SkynedUtils } from "../utils";

export * from "./interface";
export interface PublisherDependencies {
  /** For logging */
  logger: ILogger;
}
/** Concrete implementation of publisher */
export class Publisher implements IPublisher {
  private static instance: IPublisher | null = null;
  private pubsub = new PubSub({ projectId: SkynedUtils.getProjectId() });
  private constructor(private readonly logger: ILogger) {
    // * Private
  }

  static factory({ logger }: PublisherDependencies) {
    if (!Publisher.instance) {
      Publisher.instance = new Publisher(logger);
    }

    return Publisher.instance;
  }

  publish: IPublisher["publish"] = async ({ type, data }) => {
    try {
      const dataBuffer = Buffer.from(JSON.stringify(data));
      await this.pubsub.topic(type).publishMessage({ data: dataBuffer });
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
export const publisher = SkynedRegistry.getSingleton(
  RegistryKeysEnum.PUBLISHER,
  () => Publisher.factory({ logger }),
);
