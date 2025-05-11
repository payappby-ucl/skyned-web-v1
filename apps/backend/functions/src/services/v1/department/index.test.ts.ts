import { StatusCodes } from "http-status-codes";
import { DepartmentService, departmentService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { adminService } from "../admin";

describe("DepartmentService", () => {
  describe("Instance", () => {
    test("should be an instance of DepartmentService", () => {
      expect(departmentService).toBeInstanceOf(DepartmentService);
    });
  });

  describe("Methods", () => {
    describe("getDepartments", () => {
      test("should throw and error if user is not passed in", async () => {
        try {
          await departmentService.getDepartments(null as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const { user } = await signInUser();
        const admin = await adminService.findAdminByAdminId(user.uid, "auth");
        const departments = await departmentService.getDepartments(admin!);
        console.log(departments);
        expect(departments).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("getDepartmentsForAdminCreation", () => {
      test("should throw and error if user is not passed in", async () => {
        try {
          await departmentService.getDepartmentsForAdminCreation(null as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const { user } = await signInUser();
        const admin = await adminService.findAdminByAdminId(user.uid, "auth");
        const departments =
          await departmentService.getDepartmentsForAdminCreation(admin!);

        console.log(departments);

        expect(departments).toBe(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("fetchDepartmentsInArrayListWithIds", () => {
      test("should throw and error if an empty array passed in", async () => {
        try {
          await departmentService.fetchDepartmentsInArrayListWithIds([]);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const departments =
          await departmentService.fetchDepartmentsInArrayListWithIds([1, 2, 3]);

        expect(departments).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        );
      });
    });
  });
});
