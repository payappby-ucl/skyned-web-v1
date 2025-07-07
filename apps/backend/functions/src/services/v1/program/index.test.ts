/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { ProgramService, programService } from ".";
import { repository } from "../../../infrastructure";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { programData, schoolData } from "../../../data";
import { intakeService } from "../intake";
import { AuthClaim } from "@workspace/shared";

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
            status: "open",
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

    describe("updateSingleProgram", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await programService.updateSingleProgram("", "", "", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should update a program", async () => {
        const p = await programService.findProgramBySlugAndSchoolId(
          schoolId,
          programData.slug,
          { claim: "admin" } as AuthClaim,
        );

        if (!p) throw new Error("Program not found");

        const program = await programService.updateSingleProgram(
          schoolId,
          p.slug,
          p.programId,
          { applicationFee: 65.9, intakes: [intakeId] },
        );

        expect(program).not.toBeNull();
        expect(program.slug).toBe("bachelor-of-art-in-fine-arts");
        expect(program.applicationFee).toBe(65.9);
      });
    });

    describe("updateBulkProgram", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await programService.updateBulkProgram("", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should update multiple programs", async () => {
        const p1 = await programService.findProgramBySlugAndSchoolId(
          schoolId,
          "program-1",
          { claim: "admin" } as AuthClaim,
        );
        const p2 = await programService.findProgramBySlugAndSchoolId(
          schoolId,
          "program-2",
          { claim: "admin" } as AuthClaim,
        );

        if (!p1 || !p2) {
          throw new Error("Programs not found - Bulk Update test");
        }

        const count = await programService.updateBulkProgram(
          schoolId,
          [p1, p2].map((p) => ({
            programId: p.programId,
            data: {
              tuitionFee: 12500.99,
              intakes: [intakeId],
            },
          })),
        );

        expect(count).toBe(2);
      });
    });

    describe("count", () => {
      test("should count programs", async () => {
        const count = await programService.count({});
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("listPrograms", () => {
      test("should return list of programs with limited data for unauthenticated auth user", async () => {
        const programs = await programService.listPrograms({});
        expect(programs).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              school: expect.objectContaining({
                name: expect.any(String),
                slug: expect.any(String),
                currency: expect.any(String),
              }),
            }),
          ]),
        );
      });

      test("should return list of programs with limited data for auth user (not admin)", async () => {
        const programs = await programService.listPrograms({}, {
          claim: "student",
        } as any);
        expect(programs).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              school: expect.objectContaining({
                name: expect.any(String),
                slug: expect.any(String),
                currency: expect.any(String),
              }),
              description: expect.any(String),
            }),
          ]),
        );
      });

      test("should return list of programs with limited data for auth user (admin)", async () => {
        const programs = await programService.listPrograms({}, {
          claim: "admin",
        } as any);

        expect(programs).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              school: expect.objectContaining({
                name: expect.any(String),
                slug: expect.any(String),
                currency: expect.any(String),
              }),
              description: expect.any(String),
              schoolId: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("findProgramBySlugAndSchoolId", () => {
      test("should find program", async () => {
        const program = await programService.findProgramBySlugAndSchoolId(
          schoolId,
          "bachelor-of-art-in-fine-arts",
        );

        expect(program).not.toBeNull();
        expect(program).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            slug: expect.any(String),
            school: expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              currency: expect.any(String),
            }),
          }),
        );
      });
    });

    describe("disconnectIntakes", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await programService.disconnectIntakes("", "", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const program = await programService.disconnectIntakes(
          schoolId,
          "bachelor-of-art-in-fine-arts",
          [intakeId],
        );

        expect(program).not.toBeNull();
        expect(program.slug).toBe("bachelor-of-art-in-fine-arts");
        expect(program.applicationFee).toBe(65.9);
      });
    });

    describe("connectIntakes", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await programService.connectIntakes("", "", {} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const program = await programService.connectIntakes(
          schoolId,
          "bachelor-of-art-in-fine-arts",
          [intakeId],
        );

        expect(program).not.toBeNull();
        expect(program.slug).toBe("bachelor-of-art-in-fine-arts");
        expect(program.applicationFee).toBe(65.9);
      });
    });
  });
});
