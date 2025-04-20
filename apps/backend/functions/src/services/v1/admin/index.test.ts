import { StatusCodes } from "http-status-codes";
import { AdminService, adminService } from ".";
import { admin } from "../../../data";
import { repository } from "../../../infrastructure";

describe("AdminService", () => {
  describe("Instance", () => {
    test("should be instance of AdminService", () => {
      expect(adminService).toBeInstanceOf(AdminService);
    });
  });

  describe("Methods", () => {
    describe("findAdminByAdminId", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      test("should throw error when give and empty adminId", async () => {
        try {
          await adminService.findAdminByAdminId("");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should return null", async () => {
        const spy = jest
          .spyOn(repository.admin, "findAdminByAdminId")
          .mockImplementation(async () => null);

        const adm = await adminService.findAdminByAdminId("12345");
        expect(spy).toHaveBeenCalled();
        expect(adm).toBeNull();
      });

      test("should pass", async () => {
        const spy = jest
          .spyOn(repository.admin, "findAdminByAdminId")
          .mockImplementation(async () => admin as any);
        const adm = await adminService.findAdminByAdminId("1234");
        expect(spy).toHaveBeenCalled();
        expect(adm).not.toBeNull();
      });
    });
  });
});
