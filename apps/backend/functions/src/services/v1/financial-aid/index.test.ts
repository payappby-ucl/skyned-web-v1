/* eslint-disable max-len */
import { FinancialAidService, financialAidService } from ".";
import { financialAidData, programData, schoolData } from "../../../data";
import { phoneNumberService } from "../phone-number";
import { idGeneratorService } from "../id-generator";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { repository } from "../../../infrastructure";
import { intakeService } from "../intake";
import { programService } from "../program";

describe("financialAidService", () => {
  describe("instance", () => {
    test("should be an instance of FinancialAidService", () => {
      expect(financialAidService).toBeInstanceOf(FinancialAidService);
    });
  });

  describe("methods", () => {
    const testData = {
      ...financialAidData,
      phoneNumber: phoneNumberService.formatPhoneNumber(
        financialAidData.phoneNumber,
      ),
      financialAidId: idGeneratorService.id(),
      identification: {
        path: "/schools",
        url: "https://gogle.com",
        mimeType: "image/png",
      },
      resume: {
        path: "/schools",
        url: "https://gogle.com",
        mimeType: "image/png",
      },
      bankStatement: {
        path: "/schools",
        url: "https://gogle.com",
        mimeType: "image/png",
      },
      offerLetter: {
        path: "/schools",
        url: "https://gogle.com",
        mimeType: "image/png",
      },
      proofOfAddress: {
        path: "/schools",
        url: "https://gogle.com",
        mimeType: "image/png",
      },
      transcript: {
        path: "/schools",
        url: "https://gogle.com",
        mimeType: "image/png",
      },
      immigrationDocument: {
        path: "/schools",
        url: "https://gogle.com",
        mimeType: "image/png",
      },
      nextSchoolTerm: new Date(financialAidData.nextSchoolTerm),
    };

    describe("create", () => {
      test("should create data", async () => {
        const userAuth = await signInUser();

        const school = await repository.school.create({
          data: {
            ...schoolData,
            schoolId: "financial-aids-service-test",
            slug: "financial-aids-service-test",
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

        const data = await financialAidService.create({
          ...testData,
          programId: program.programId,
        });
        expect(data).toEqual(expect.objectContaining(testData));
      });
    });

    describe("count", () => {
      test("should return count", async () => {
        const count = await financialAidService.count();
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("findMany", () => {
      test("should return with array length of one", async () => {
        const financialAids = await financialAidService.findMany();
        expect(financialAids.length).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
