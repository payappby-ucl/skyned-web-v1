import { repository, SchoolRepository } from "..";
import { admin, schoolData } from "../../../data";
import { storageService } from "../../../services";
import { SkynedUtils } from "../../../utils";
import { auth } from "../../auth";

describe("SchoolRepository", () => {
  describe("Instance", () => {
    test("must be an instance of SchoolRepository", () => {
      expect(repository.school).toBeInstanceOf(SchoolRepository);
    });
  });

  describe("Methods", () => {
    describe("create", () => {
      test("should create a school", async () => {
        const user = await auth.findUserByEmail(admin.email);
        if (!user) throw Error("User not found");

        const logo = await storageService.saveObject(
          schoolData.logo,
          SkynedUtils.resolveStoragePath({
            type: "logo",
            data: {
              schoolId: schoolData.slug,
            },
          }),
        );

        const schoolImage = await storageService.saveObject(
          schoolData.schoolImage,
          SkynedUtils.resolveStoragePath({
            type: "schoolImage",
            data: {
              schoolId: schoolData.slug,
            },
          }),
        );

        const school = await repository.school.create({
          data: {
            ...SkynedUtils.exclude(schoolData, ["logo", "schoolImage"]),
            logo,
            schoolImage,
            schoolId: "1234567",
            createdById: user.id,
          },
        });

        expect(school).toEqual(
          expect.objectContaining({
            ...SkynedUtils.exclude(schoolData, ["logo", "schoolImage"]),
          }),
        );
      });
    });

    describe("findUnique", () => {
      test("should find school by its slug", async () => {
        const school = await repository.school.findUnique({
          where: {
            slug: schoolData.slug,
          },
        });

        expect(school).toEqual(
          expect.objectContaining({
            ...SkynedUtils.exclude(schoolData, ["logo", "schoolImage"]),
          }),
        );
      });
    });

    describe("should count", () => {
      test("pass", async () => {
        const count = await repository.school.count();

        expect(count).toStrictEqual(expect.any(Number));
      });
    });

    describe("findMany", () => {
      test("should pass", async () => {
        const schools = await repository.school.findMany();

        expect(schools).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              slug: expect.any(String),
              name: expect.any(String),
              overview: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("update", () => {
      test("should pass", async () => {
        const user = await auth.findUserByEmail(admin.email);
        if (!user) throw Error("User not found");

        const logo = await storageService.saveObject(
          schoolData.logo,
          SkynedUtils.resolveStoragePath({
            type: "logo",
            data: {
              schoolId: schoolData.slug,
            },
          }),
        );

        const schoolImage = await storageService.saveObject(
          schoolData.schoolImage,
          SkynedUtils.resolveStoragePath({
            type: "schoolImage",
            data: {
              schoolId: schoolData.slug,
            },
          }),
        );

        const school = await repository.school.create({
          data: {
            ...SkynedUtils.exclude(schoolData, ["logo", "schoolImage"]),
            slug: "another-school",
            logo,
            schoolImage,
            createdById: user.id,
            schoolId: "12345",
          },
        });

        const updatedSchool = await repository.school.update({
          where: {
            slug: school.slug,
          },
          data: {
            name: "New School",
            slug: "new-school",
          },
        });

        expect(school.id).toBe(updatedSchool.id);
        expect(school.schoolId).toBe(updatedSchool.schoolId);
        expect(updatedSchool.name).toBe("New School");
        expect(updatedSchool.slug).toBe("new-school");
      });
    });
  });
});
