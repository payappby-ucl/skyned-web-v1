/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { Exception, SkynedUtils } from "../../../lib";
import { ILoggerService } from "../../../services";
import { IExceptionController } from "./interface";
import { ZodError } from "zod";

interface Dependencies {
  loggerService: ILoggerService;
}

export class ExceptionController implements IExceptionController {
  private static instance: IExceptionController | null = null;
  private constructor(private readonly loggerService: ILoggerService) {}
  static factory(dependencies: Dependencies) {
    if (!ExceptionController.instance) {
      const { loggerService } = dependencies;

      ExceptionController.instance = new ExceptionController(loggerService);
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
          this.loggerService.error(error);
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

      this.loggerService.error(newError);
      this.loggerService.log({
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
