import { StatusCodes } from "http-status-codes";
import { IntakeService, intakeService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { repository } from "../../../infrastructure";
import { schoolData } from "../../../data";

describe("IntakeService", () => {
  describe("Instance", () => {
    test("should be an instance of IntakeService", () => {
      expect(intakeService).toBeInstanceOf(IntakeService);
    });
  });

  describe("methods", () => {
    let intakeId = 0;
    let schoolId = "";
    let adminId = "";

    describe("create", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await intakeService.createIntake("", "", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create an intake", async () => {
        const userAuth = await signInUser();

        const school = await repository.school.create({
          data: {
            ...schoolData,
            schoolId: "intake-service-test",
            slug: "intake-service-test",
            createdById: userAuth.user.uid,
          },
        });

        const intake = await intakeService.createIntake(
          userAuth.user.uid,
          school.schoolId,
          {
            intake: "MAY 2025",
            startDate: Date.now(),
            deadline: Date.now(),
          },
        );

        intakeId = intake.id;
        schoolId = school.schoolId;
        adminId = userAuth.user.uid;

        expect(intake).not.toBeUndefined();
        expect(intake.schoolId).toBe(school.schoolId);
      });
    });

    describe("createManyIntakes", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await intakeService.createManyIntakes("", "", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create many intakes", async () => {
        const res = await intakeService.createManyIntakes(adminId, schoolId, [
          {
            intake: "DEC 2025",
            startDate: Date.now() + 2,
            deadline: Date.now() + 2,
          },

          {
            intake: "NOV 2025",
            startDate: Date.now() + 3,
            deadline: Date.now() + 3,
          },
        ]);

        expect(res).toBe(2);
      });
    });

    describe("updateIntake", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await intakeService.updateIntake("" as any, {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should update an intake", async () => {
        const intake = await intakeService.updateIntake(intakeId, {
          intake: "SEP 2025",
          startDate: +new Date() + 100,
          deadline: +new Date() + 100,
        });

        expect(intake).not.toBeUndefined();
        expect(intake).not.toBeNull();
      });
    });

    describe("count", () => {
      test("should pass", async () => {
        const count = await intakeService.count();

        expect(count).toStrictEqual(expect.any(Number));
      });
    });

    describe("findIntake", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await intakeService.findIntake("" as any, {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should return null if intake is not found", async () => {
        const intake = await intakeService.findIntake(2, "ttiir-dd");
        expect(intake).toBeNull();
      });
    });

    describe("listIntakes", () => {
      afterEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should pass", async () => {
        const spy = jest
          .spyOn(repository.intake, "findMany")
          .mockImplementation(
            () =>
              [
                {
                  intake: "MAY 2025",
                  startDate: new Date(),
                  deadline: new Date(),
                },
              ] as any,
          );

        const intakes = await intakeService.listIntakes({
          skip: 0,
        });

        expect(spy).toHaveBeenCalled();
        expect(intakes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intake: expect.any(String),
              startDate: expect.any(Date),
              deadline: expect.any(Date),
            }),
          ]),
        );
      });
    });

    describe("listSchoolIntakes", () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should pass", async () => {
        const spy = jest
          .spyOn(repository.intake, "findMany")
          .mockImplementation(
            () =>
              [
                {
                  intake: "AUG 2025",
                  startDate: new Date(),
                  deadline: new Date(),
                  schoolId,
                },
              ] as any,
          );

        const intakes = await intakeService.listSchoolIntakes(
          {
            skip: 0,
          },
          schoolId,
        );

        expect(spy).toHaveBeenCalled();
        expect(intakes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intake: expect.any(String),
              startDate: expect.any(Date),
              deadline: expect.any(Date),
            }),
          ]),
        );
      });
    });
  });
});
