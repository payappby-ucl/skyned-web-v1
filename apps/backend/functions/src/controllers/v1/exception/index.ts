/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { Exception } from "../../../lib";
import { IExceptionController } from "./interface";
import { ZodError } from "zod";
import { RegistryKeysEnum } from "../../../enum";
import SkynedRegistry from "../../../registry";
import { ILogger, logger } from "../../../infrastructure";
import { SkynedUtils } from "../../../utils";

export * from "./interface";

interface Dependencies {
  logger: ILogger;
}

export class ExceptionController implements IExceptionController {
  private static instance: IExceptionController | null = null;
  private constructor(private readonly logger: ILogger) {}
  static factory({ logger }: Dependencies) {
    if (!ExceptionController.instance) {
      ExceptionController.instance = new ExceptionController(logger);
    }

    return ExceptionController.instance;
  }

  handle404: IExceptionController["handle404"] = async (req, res, next) => {
    next(
      SkynedUtils.createException(
        StatusCodes.NOT_FOUND,
        "Sorry we could not find the resource you're looking for",
      ),
    );
  };

  handleAllPossibleErrors: IExceptionController["handleAllPossibleErrors"] =
    async (error, req, res, next) => {
      if (error instanceof ZodError) {
        res._failed(StatusCodes.BAD_REQUEST, {
          message: "Your payload is not acceptable.",
        });
        return;
      }

      if (error instanceof Exception) {
        if (error.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
          this.logger.error(error);
          error.message =
            "Oops something went wrong on the server, please try again or contact admin.";
        }

        res._failed(error.statusCode, {
          message: error.message,
        });
        return;
      }

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
      newError.message =
        "Oops something went wrong on the server, please try again or contact admin.";

      res._failed(newError.statusCode, {
        message: newError.message,
      });
    };
}

export const exceptionController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.EXCEPTION_CONTROLLER,
  () => ExceptionController.factory({ logger }),
);
