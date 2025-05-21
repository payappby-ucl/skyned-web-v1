import { StatusCodes } from "http-status-codes";
import { AdminService, adminService } from ".";
import { admin } from "../../../data";
import { repository } from "../../../infrastructure";
import { phoneNumberService } from "../phone-number";
import { gender } from "@workspace/shared";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { SkynedUtils } from "../../../utils";

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
        jest.restoreAllMocks();
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

    describe("createAdmin", () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      const data = {
        firstName: "James",
        lastName: "Emefele",
        email: "james@skynedconsults.com",
        phoneNumber: {
          ...phoneNumberService.formatPhoneNumber("+2348136239706"),
        },
        createdById: "12345",
        gender: gender.Male,
        nationality: "NG",
        countryOfResidence: "NG",
        adminId: "23456",
        jobTitle: "CTO",
        primaryImage: {
          path: "/user/me",
          url: "https://www.google.com",
          mimeType: "image/png",
        },
      };

      test("should fail if input is invalid", async () => {
        try {
          await adminService.createAdmin(data, ["hello"] as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create an admin", async () => {
        const spy = jest
          .spyOn(repository.admin, "create")
          .mockImplementation(
            () => data as unknown as ReturnType<typeof repository.admin.create>,
          );

        const created = await adminService.createAdmin(data, [1, 2]);
        expect(spy).toHaveBeenCalled();
        expect(created).toEqual(expect.objectContaining(data));
      });
    });

    describe("count", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should return count", async () => {
        const spy = jest
          .spyOn(repository.admin, "count")
          .mockImplementation(
            () => 10 as unknown as ReturnType<typeof repository.admin.count>,
          );

        const { user } = await signInUser();
        const admin = await repository.admin.findAdminByAdminId(user.uid);

        const count = await adminService.count(admin!);
        expect(spy).toHaveBeenCalled();
        expect(count).toBe(10);
      });
    });

    describe("countAdminsForList", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should return count", async () => {
        const spy = jest
          .spyOn(repository.admin, "count")
          .mockImplementation(
            () => 10 as unknown as ReturnType<typeof repository.admin.count>,
          );

        const { user } = await signInUser();
        const admin = await repository.admin.findAdminByAdminId(user.uid);

        const count = await adminService.countAdminsForList(admin!);
        expect(spy).toHaveBeenCalled();
        expect(count).toBe(10);
      });
    });

    describe("listAdmins", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should return admin list", async () => {
        const { user } = await signInUser();
        const admin = await repository.admin.findAdminByAdminId(user.uid);

        const adminList = await adminService.listAdmins(admin!, {
          take: 1,
          order: {
            order: "asc",
            orderBy: "createdAt",
          },
        });

        expect(adminList).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: admin!.id,
              firstName: admin!.firstName,
              lastName: admin!.lastName,
              email: admin!.email,
              adminId: admin!.adminId,

              _count: {
                departments: expect.any(Number),
                teams: expect.any(Number),
              },
            }),
          ]),
        );
      });
    });

    describe("getAdminProfile", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should return admin list", async () => {
        const { user } = await signInUser();
        const admin = await repository.admin.findAdminByAdminId(user.uid);

        const adminProfile = await adminService.getAdminProfile(
          admin!,
          admin!.adminId,
        );

        expect(adminProfile).toEqual(
          expect.objectContaining({
            id: admin!.id,
            firstName: admin!.firstName,
            lastName: admin!.lastName,
            email: admin!.email,
            adminId: admin!.adminId,
          }),
        );
      });
    });

    describe("updateAdmin", () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      const data = {
        firstName: "James",
        lastName: "Emefele",
        email: "james@skynedconsults.com",
        phoneNumber: {
          ...phoneNumberService.formatPhoneNumber("+2348136239706"),
        },
        createdById: "12345",
        gender: gender.Male,
        nationality: "NG",
        countryOfResidence: "NG",
        adminId: "23456",
        jobTitle: "CTO",
        primaryImage: {
          path: "/user/me",
          url: "https://www.google.com",
          mimeType: "image/png",
        },
      };

      test("should fail if input is invalid", async () => {
        try {
          await adminService.updateAdmin({} as any, {
            ...SkynedUtils.exclude(data, ["adminId"]),
          });
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should update an admin", async () => {
        const spy = jest
          .spyOn(repository.admin, "create")
          .mockImplementation(
            () => data as unknown as ReturnType<typeof repository.admin.create>,
          );

        const updateSpy = jest
          .spyOn(repository.admin, "update")
          .mockImplementation(
            () =>
              ({
                ...data,
                firstName: "John",
              }) as unknown as ReturnType<typeof repository.admin.update>,
          );

        const created = await adminService.createAdmin(data, [1, 2]);
        const updated = await adminService.updateAdmin(data.adminId, {
          ...data,
          firstName: "John",
        });

        expect(spy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
        expect(updated).toEqual(
          expect.objectContaining({
            firstName: "John",
            adminId: created.adminId,
            lastName: created.lastName,
          }),
        );
      });
    });
  });
});
