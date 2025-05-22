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

    describe("update", () => {
      test("should update an intake", async () => {
        const intake = await repository.intake.update({
          where: {
            id: intakeId,
          },
          data: {
            ...intakeData,
            intake: new Date(),
          },
        });

        expect(intake).not.toBeUndefined();
        expect(intake).not.toBeNull();
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
