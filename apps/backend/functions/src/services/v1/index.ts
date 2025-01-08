import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { LoggerService } from "./logger";

export * from "./logger/interface";
export const loggerService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.LOGGER,
  LoggerService.factory,
);
