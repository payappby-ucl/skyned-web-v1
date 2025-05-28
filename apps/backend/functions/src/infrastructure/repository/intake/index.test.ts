import { IntakeRepository, repository } from "..";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { intakeData, schoolData } from "../../../data";

describe("IntakeRepository", () => {
  describe("Instance", () => {
    test("should be an instance of IntakeRepository", () => {
      expect(repository.intake).toBeInstanceOf(IntakeRepository);
    });
  });

  describe("Methods", () => {
    let intakeId = 0;

    describe("create", () => {
      test("should create an intake", async () => {
        const userAuth = await signInUser();

        const school = await repository.school.create({
          data: {
            ...schoolData,
            schoolId: "intake-test",
            slug: "intake-test",
            createdById: userAuth.user.uid,
          },
        });

        const intake = await repository.intake.create({
          data: {
            ...intakeData,
            schoolId: school.schoolId,
            createdById: userAuth.user.uid,
          },
        });

        intakeId = intake.id;

        expect(intake).not.toBeUndefined();
        expect(intake.schoolId).toBe(school.schoolId);
      });
    });

    describe("createMany", () => {
      test("should create many intakes", async () => {
        const userAuth = await signInUser();
        const currentDate = new Date();

        const res = await repository.intake.createMany({
          data: [
            {
              intake: "JUN 2025",
              startDate: new Date(
                currentDate.getFullYear() + 2,
                currentDate.getMonth(),
                10,
              ),
              deadline: new Date(
                currentDate.getFullYear() + 2,
                currentDate.getMonth(),
                10,
              ),
            },

            {
              intake: "JUL 2025",
              startDate: new Date(
                currentDate.getFullYear() + 3,
                currentDate.getMonth(),
                10,
              ),
              deadline: new Date(
                currentDate.getFullYear() + 3,
                currentDate.getMonth(),
                10,
              ),
            },
          ].map((v) => ({
            ...v,
            schoolId: "intake-test",
            createdById: userAuth.user.uid,
          })),
        });

        expect(res.count).toBe(2);
      });
    });

    describe("update", () => {
      test("should update an intake", async () => {
        const intake = await repository.intake.update({
          where: {
            id: intakeId,
          },
          data: {
            ...intakeData,
            intake: "AUG 2025",
          },
        });

        expect(intake).not.toBeUndefined();
        expect(intake).not.toBeNull();
      });
    });

    describe("count", () => {
      test("should pass", async () => {
        const count = await repository.intake.count();

        expect(count).toStrictEqual(expect.any(Number));
      });
    });

    describe("findUnique", () => {
      test("should find an intake", async () => {
        const intake = await repository.intake.findUnique({
          where: {
            id: intakeId,
          },
        });

        expect(intake).not.toBeUndefined();
        expect(intake).not.toBeNull();
      });
    });

    describe("findMany", () => {
      test("should find many intake", async () => {
        const intakes = await repository.intake.findMany();

        expect(intakes).not.toBeUndefined();
        expect(intakes).not.toBeNull();
        expect(intakes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intake: expect.any(String),
              startDate: expect.any(Date),
              deadline: expect.any(Date),
              schoolId: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("delete", () => {
      test("should delete an intake", async () => {
        const intake = await repository.intake.delete({
          where: {
            id: intakeId,
          },
        });

        const intake2 = await repository.intake.findUnique({
          where: {
            id: intakeId,
          },
        });

        expect(intake).not.toBeUndefined();
        expect(intake).not.toBeNull();
        expect(intake2).toBeNull();
      });
    });
  });
});
