import { HealthController, healthController } from ".";

describe("Health Controller", () => {
  test("should be an instance of HealthController", () => {
    expect(healthController).toBeInstanceOf(HealthController);
  });
});
