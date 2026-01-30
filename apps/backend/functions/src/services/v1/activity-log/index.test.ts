import { ActivityLogService, activityLogService } from ".";
import { repository } from "../../../infrastructure";

describe("ActivityLogService", () => {
  describe("Instance", () => {
    test("should be instance of ActivityLogService", () => {
      expect(activityLogService).toBeInstanceOf(ActivityLogService);
    });
  });

  describe("Methods", () => {
    describe("create", () => {
      afterEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should create an activity log", async () => {
        const spy = jest
          .spyOn(repository.activityLog, "create")
          .mockImplementation();

        await activityLogService.create({} as any);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
