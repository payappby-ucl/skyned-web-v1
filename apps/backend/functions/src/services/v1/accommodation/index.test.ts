import { StatusCodes } from "http-status-codes";
import { AccommodationService, accommodationService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { accommodationData, schoolData } from "../../../data";
import { repository } from "../../../infrastructure";

describe("AccommodationService", () => {
  describe("Instance", () => {
    test("should be an instance of AccommodationService", () => {
      expect(accommodationService).toBeInstanceOf(AccommodationService);
    });
  });

  describe("Methods", () => {
    let accommodationId = 0;
    // let schoolId = "";

    describe("createAccommodation", () => {
      test("should fail when invalid data is passed", async () => {
        try {
          await accommodationService.createAccommodation("", "", {
            ...accommodationData,
          });
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create accommodation", async () => {
        const userAuth = await signInUser();

        const school = await repository.school.create({
          data: {
            ...schoolData,
            slug: "create-accommodation-test",
            schoolId: "create-accommodation-school-id",
            createdById: userAuth.user.uid,
          },
        });

        // schoolId = school.schoolId;

        const accommodation = await accommodationService.createAccommodation(
          userAuth.user.uid,
          school.schoolId,
          {
            ...accommodationData,
          },
        );

        accommodationId = accommodation.id;

        expect(accommodation).not.toBeNull();
        expect(accommodation).not.toBeUndefined();
      });
    });

    describe("findAccommodationById", () => {
      test("should fail when invalid id type is passed", async () => {
        try {
          await accommodationService.findAccommodationById({} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const accommodation =
          await accommodationService.findAccommodationById(accommodationId);

        expect(accommodation).not.toBeNull();
      });
    });

    describe("count", () => {
      test("should return the count", async () => {
        const count = await accommodationService.count();
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("getAccommodations", () => {
      test("should return a list of accommodations", async () => {
        const accommodations = await accommodationService.getAccommodations();
        expect(accommodations).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              description: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("deleteAccommodation", () => {
      test("should fail when invalid id type is passed", async () => {
        try {
          await accommodationService.deleteAccommodation({} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        await accommodationService.deleteAccommodation(accommodationId);

        const accommodation =
          await accommodationService.findAccommodationById(accommodationId);

        expect(accommodation).toBeNull();
      });
    });
  });
});
