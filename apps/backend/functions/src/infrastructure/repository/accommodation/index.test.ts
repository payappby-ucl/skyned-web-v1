import { AccommodationRepository, repository } from "..";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { accommodationData, schoolData } from "../../../data";

describe("AccommodationRepository", () => {
  describe("Instance", () => {
    test("should be an instance of IntakeRepository", () => {
      expect(repository.accommodation).toBeInstanceOf(AccommodationRepository);
    });
  });

  describe("Methods", () => {
    let accommodationId = 0;
    test("should create an accommodation", async () => {
      const userAuth = await signInUser();
      const school = await repository.school.create({
        data: {
          ...schoolData,
          schoolId: "accommodation-test",
          slug: "accommodation-test",
          createdById: userAuth.user.uid,
        },
      });

      const accommodation = await repository.accommodation.upsert({
        where: {
          schoolId: school.schoolId,
        },
        create: {
          ...accommodationData,
          createdById: userAuth.user.uid,
          schoolId: school.schoolId,
        },
        update: {
          ...accommodationData,
        },
      });

      accommodationId = accommodation.id;

      const updatedSchool = await repository.school.findUnique({
        where: {
          schoolId: school.schoolId,
        },
        include: {
          accommodation: true,
        },
      });

      expect(accommodation).not.toBeUndefined();
      expect(accommodation.schoolId).toBe(school.schoolId);
      expect(accommodation.schoolId).toBe(updatedSchool?.schoolId);
      expect(updatedSchool).toEqual(
        expect.objectContaining({
          accommodation: expect.objectContaining({
            id: accommodation.id,
            description: accommodation.description,
          }),
        }),
      );
    });

    test("should find a unique accommodation", async () => {
      const accommodation = await repository.accommodation.findUnique({
        where: {
          id: accommodationId,
        },

        include: {
          school: {
            select: {
              name: true,
            },
          },
        },
      });

      expect(accommodation).not.toBeUndefined();
      expect(accommodation).not.toBeNull();
      expect(accommodation).toEqual(
        expect.objectContaining({
          school: expect.objectContaining({
            name: schoolData.name,
          }),
        }),
      );
    });

    test("should return an array of accommodations", async () => {
      const accommodations = await repository.accommodation.findMany({
        include: {
          school: {
            select: {
              name: true,
            },
          },
        },
      });

      expect(accommodations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            schoolId: expect.any(String),
            school: expect.objectContaining({
              name: expect.any(String),
            }),
          }),
        ]),
      );
    });

    test("should count accommodation", async () => {
      const count = await repository.accommodation.count();
      expect(count).toEqual(expect.any(Number));
    });

    test("should delete accommodation", async () => {
      await repository.accommodation.delete({
        where: {
          id: accommodationId,
        },
      });

      const accommodation = await repository.accommodation.findUnique({
        where: {
          id: accommodationId,
        },
      });

      expect(accommodation).toBeNull();
    });
  });
});
