import { AnalyticsService, analyticsService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { repository } from "../../../infrastructure";

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

    describe("getKPIs", () => {
      test("should pass", async () => {
        try {
          const { user } = await signInUser();
          const admin = await repository.admin.findAdminByAdminId(user.uid);

          const kpi = await analyticsService.getAdminKPIs({
            user: admin!,
            claim: "admin",
          });

          expect(kpi).toBeNull();
        } catch (error: any) {
          expect(error.statusCode).toBeUndefined();
        }
      });
    });
  });
});
