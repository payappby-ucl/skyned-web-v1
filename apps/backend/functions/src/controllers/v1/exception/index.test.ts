import { ExceptionController } from ".";
import { exceptionController } from "..";

describe("Exception Controller", () => {
  test("should be an instance of ExceptionController", () => {
    expect(exceptionController).toBeInstanceOf(ExceptionController);
  });
});
