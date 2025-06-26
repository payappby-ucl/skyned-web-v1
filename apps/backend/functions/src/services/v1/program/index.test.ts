import { StatusCodes } from "http-status-codes";
import { ProgramService, programService } from ".";
import { repository } from "../../../infrastructure";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { programData, schoolData } from "../../../data";
import { intakeService } from "../intake";

describe("ProgramServive", () => {
  describe("Instance", () => {
    expect(programService).toBeInstanceOf(ProgramService);
  });

  describe("Methods", () => {
    let intakeId = 0;
    let schoolId = "";
    let adminId = "";

    describe("createSingleProgram", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await programService.createSingleProgram("", "", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create an a program", async () => {
        const userAuth = await signInUser();

        const school = await repository.school.create({
          data: {
            ...schoolData,
            schoolId: "program-service-test",
            slug: "program-service-test",
            createdById: userAuth.user.uid,
          },
        });

        const intake = await intakeService.createIntake(
          userAuth.user.uid,
          school.schoolId,
          {
            intake: "MAY 2030",
            startDate: Date.now(),
            deadline: Date.now(),
          },
        );

        const program = await programService.createSingleProgram(
          userAuth.user.uid,
          school.schoolId,
          { ...programData, intakes: [intake.id] },
        );

        intakeId = intake.id;
        schoolId = school.schoolId;
        adminId = userAuth.user.uid;

        expect(intake).not.toBeUndefined();
        expect(intake.schoolId).toBe(school.schoolId);
        expect(program).not.toBeNull();
        expect(program.schoolId).toBe(school.schoolId);
        expect(program.slug).toBe("bachelor-of-art-in-fine-arts");
      });
    });

    describe("createBulkProgram", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await programService.createBulkProgram("", "", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create multiple programs", async () => {
        const count = await programService.createBulkProgram(
          adminId,
          schoolId,
          ["Program 1", "Program 2"].map((name) => ({
            ...programData,
            name,
            slug: name.toLowerCase().split(" ").join("-"),
            intakes: [intakeId],
          })),
        );

        expect(count).toBe(2);
      });
    });
  });
});
