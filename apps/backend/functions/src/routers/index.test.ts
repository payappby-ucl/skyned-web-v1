import { BaseRouter, baseRouter } from ".";

describe("Base Router", () => {
  test("should be an instance of BaseRouter", () => {
    expect(baseRouter).toBeInstanceOf(BaseRouter);
  });
});
