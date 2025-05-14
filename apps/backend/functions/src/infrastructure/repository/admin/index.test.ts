/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { AdminRepository, repository } from "..";
import { admin } from "../../../data";
import { auth } from "../../auth";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { phoneNumberService, storageService } from "../../../services";
import { gender } from "@workspace/shared";
import { primaryImageDataUri } from "../../../seed/image";

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

    describe("create", () => {
      test("should create an admin account", async () => {
        const { user } = await signInUser();
        const authUser = await repository.admin.findAdminByAdminId(
          user.uid,
          "auth",
        );

        const createdAuthId = await auth.createAuth(
          {
            email: "james@skynedconsults.com",
            password: "12345678",
          },
          "admin",
        );

        const primaryImage = await storageService.saveObject(
          primaryImageDataUri,
          `users/${createdAuthId}/profile/primaryImage`,
        );

        const createdAdmin = await repository.admin.create({
          data: {
            firstName: "James",
            lastName: "Emefele",
            email: "james@skynedconsults.com",
            phoneNumber: {
              ...phoneNumberService.formatPhoneNumber("+2348136239706"),
            },
            createdById: authUser!.adminId,
            gender: gender.Male,
            nationality: "NG",
            countryOfResidence: "NG",
            adminId: createdAuthId,
            jobTitle: "CTO",
            primaryImage,

            departments: {
              connect: {
                id: 1,
              },
            },
          },
        });

        expect(createdAdmin).toEqual(
          expect.objectContaining({
            email: "james@skynedconsults.com",
            createdById: authUser!.adminId,
            nationality: "NG",
            countryOfResidence: "NG",
            adminId: createdAuthId,
            jobTitle: "CTO",
          }),
        );
      });
    });

    describe("count", () => {
      test("should pass", async () => {
        const adminCounts = await repository.admin.count();
        expect(adminCounts).toEqual(expect.any(Number));
      });
    });

    describe("findMany", () => {
      test("should return array of admins", async () => {
        const manyAdmins = await repository.admin.findMany({
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        });

        expect(manyAdmins[0]).toEqual(
          expect.objectContaining({
            lastName: admin.lastName,
            gender: admin.gender,
            adminId: expect.any(String),
            id: expect.any(Number),
          }),
        );
      });
    });

    describe("findUnique", () => {
      test("should return an admin", async () => {
        const user = await auth.findUserByEmail(admin.email);
        if (!user) return;

        const adminProfile = await repository.admin.findUnique({
          where: {
            adminId: user.id,
          },
        });

        expect(adminProfile).toEqual(
          expect.objectContaining({
            lastName: admin.lastName,
            gender: admin.gender,
            adminId: expect.any(String),
            id: expect.any(Number),
          }),
        );
      });
    });

    describe("Update", () => {
      test("should update an admin", async () => {
        const user = await auth.findUserByEmail(admin.email);
        if (!user) return;

        const adminProfile = await repository.admin.findUnique({
          where: {
            adminId: user.id,
          },
        });

        const updatedProfile = await repository.admin.update({
          where: {
            adminId: user.id,
          },
          data: {
            firstName: "Innocent",
          },
        });

        expect(updatedProfile).toEqual(
          expect.objectContaining({
            firstName: "Innocent",
            lastName: admin.lastName,
            gender: admin.gender,
            adminId: adminProfile?.adminId,
            id: expect.any(Number),
          }),
        );
      });
    });
  });
});
