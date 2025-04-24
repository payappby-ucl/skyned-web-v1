/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { AdminRepository, repository } from "..";
import { admin } from "../../../data";
import { auth } from "../../auth";

describe("AdminRepository", () => {
  describe("Instance", () => {
    test("should be instance of AdminRepository", () => {
      expect(repository.admin).toBeInstanceOf(AdminRepository);
    });
  });

  describe("Methods", () => {
    describe("findAdminByAdminId", () => {
      beforeAll(() => {
        jest.clearAllMocks();
      });
      test("should throw server error if invalid adminId is passed", async () => {
        try {
          await repository.admin.findAdminByAdminId("");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should return null if the admin is not in the database", async () => {
        const adm = await repository.admin.findAdminByAdminId("1234");
        expect(adm).toBeNull();
      });

      test("should return an admin", async () => {
        const user = await auth.findUserByEmail(admin.email);
        const adm = await repository.admin.findAdminByAdminId(user?.id || "");
        expect(adm).not.toBeNull();
      });

      test("should return an admin and array of departments", async () => {
        const user = await auth.findUserByEmail(admin.email);
        const adm = await repository.admin.findAdminByAdminId(
          user?.id || "",
          "auth",
        );
        expect(adm).not.toBeNull();
        expect(adm?.departments?.length).toBe(1);
      });
    });
  });
});
