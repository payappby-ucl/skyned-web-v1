import { LoggerService } from ".";
import { loggerService } from "..";

describe("Logger Service", () => {
  test("should be an instance of LoggerService", () => {
    expect(loggerService).toBeInstanceOf(LoggerService);
  });
});
