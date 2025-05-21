import { StatusCodes } from "http-status-codes";
import { schoolService, SchoolService } from ".";
import { repository } from "../../../infrastructure";
import { admin, schoolData } from "../../../data";

describe("SchoolService", () => {
  describe("Instance", () => {
    expect(schoolService).toBeInstanceOf(SchoolService);
  });

  describe("Methods", () => {
    describe("findSchoolBySlug", () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should fails if slug is not a valid string", async () => {
        try {
          await schoolService.findSchoolBySlug(null as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should return null when there's no school with slug", async () => {
        const school = await schoolService.findSchoolBySlug("my-school");
        expect(school).toBeNull();
      });

      test("should pass", async () => {
        const spy = jest
          .spyOn(repository.school, "findUnique")
          .mockImplementation(() => schoolData as any);

        const school = await schoolService.findSchoolBySlug(schoolData.slug);
        expect(school).toEqual(expect.objectContaining(schoolData));
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("createSchool", () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should fails if invalid data is passed", async () => {
        try {
          await schoolService.createSchool("" as any, schoolData as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const spy = jest
          .spyOn(repository.school, "create")
          .mockImplementation(() => schoolData as any);

        const school = await schoolService.createSchool(admin as any, {
          ...schoolData,
          logo: {
            path: "/schools",
            url: "https://gogle.com",
            mimeType: "image/png",
          },
          schoolImage: {
            path: "/schools",
            url: "https://gogle.com",
            mimeType: "image/png",
          },
        });
        expect(school).toStrictEqual(schoolData);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
