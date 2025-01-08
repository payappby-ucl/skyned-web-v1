import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { ExceptionController } from "./exception";
import { loggerService } from "../../services";

export * from "./exception/interface";
export const exceptionController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.EXCEPTION,
  () => ExceptionController.factory({ loggerService }),
);
