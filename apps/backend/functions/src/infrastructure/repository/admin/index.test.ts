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
  });
});
