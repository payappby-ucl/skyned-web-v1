import { AnalyticsService, analyticsService } from ".";

describe("AnalyticsService", () => {
  describe("Instance", () => {
    test("should be instance of AnalyticsService", () => {
      expect(analyticsService).toBeInstanceOf(AnalyticsService);
    });
  });

  describe("Methods", () => {
    describe("computeKpis", () => {
      test("should pass", async () => {
        try {
          await analyticsService.computeKpis();
        } catch (error: any) {
          expect(error.statusCode).toBeUndefined();
        }
      });
    });
  });
});
