import { logger as fbLogger } from "firebase-functions";
import { Logger, logger } from ".";
import { StatusCodes } from "http-status-codes";
import { SkynedUtils } from "../../utils";

describe("Logger Infrastructure", () => {
  describe("Logger Instance", () => {
    test("should be an instance of Logger", () => {
      expect(logger).toBeInstanceOf(Logger);
    });
  });

  describe("logger methods", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test("should call the log method", () => {
      const spy = jest.spyOn(fbLogger, "log").mockImplementation();
      logger.log(["Hello"]);
      expect(spy).toHaveBeenCalled();
    });

    test("should call the error method", () => {
      const spy = jest.spyOn(fbLogger, "error").mockImplementation();
      logger.error(SkynedUtils.createException(StatusCodes.BAD_REQUEST));
      expect(spy).toHaveBeenCalled();
    });

    test("should call the info method", () => {
      const spy = jest.spyOn(fbLogger, "info").mockImplementation();
      logger.info(["Hello"]);
      expect(spy).toHaveBeenCalled();
    });

    test("should call the warn method", () => {
      const spy = jest.spyOn(fbLogger, "warn").mockImplementation();
      logger.warn(["Hello"]);
      expect(spy).toHaveBeenCalled();
    });
  });
});
