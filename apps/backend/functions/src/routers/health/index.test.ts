import { HealthRouter, healthRouter } from ".";

describe("Health Router", () => {
  test("should be an instance of HealthRouter", () => {
    expect(healthRouter).toBeInstanceOf(HealthRouter);
  });
});
