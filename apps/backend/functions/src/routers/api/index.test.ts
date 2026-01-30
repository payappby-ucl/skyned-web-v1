import { ApiRouter, apiRouter } from ".";

describe("API Router", () => {
  test("should be an instance of ApiRouter", () => {
    expect(apiRouter).toBeInstanceOf(ApiRouter);
  });
});
