import { logger } from "firebase-functions";
import { LoggerService } from ".";
import { loggerService } from "..";
import { SkynedUtils } from "../../../lib";
import { StatusCodes } from "http-status-codes";

describe("Logger Service", () => {
  describe("Logger Instance", () => {
    test("should be an instance of LoggerService", () => {
      expect(loggerService).toBeInstanceOf(LoggerService);
    });
  });

  describe("logger service methods", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test("should call the log method", () => {
      const spy = jest.spyOn(logger, "log").mockImplementation();
      loggerService.log(["Hello"]);
      expect(spy).toHaveBeenCalled();
    });

    test("should call the error method", () => {
      const spy = jest.spyOn(logger, "error").mockImplementation();
      loggerService.error(SkynedUtils.createException(StatusCodes.BAD_REQUEST));
      expect(spy).toHaveBeenCalled();
    });

    test("should call the info method", () => {
      const spy = jest.spyOn(logger, "info").mockImplementation();
      loggerService.info(["Hello"]);
      expect(spy).toHaveBeenCalled();
    });

    test("should call the warn method", () => {
      const spy = jest.spyOn(logger, "warn").mockImplementation();
      loggerService.warn(["Hello"]);
      expect(spy).toHaveBeenCalled();
    });
  });
});
