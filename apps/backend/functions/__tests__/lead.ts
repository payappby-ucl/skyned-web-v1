/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../src/app";
import { signInUser } from "./helpers/utils";
import { programData, schoolData } from "../src/data";
import { emailService } from "../src/services";

describe("Lead API", () => {
  const server = app.getApp();
  const baseUrl = "/api/v1/leads";

  describe(`POST - ${baseUrl}`, () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    const testData = {
      firstName: "Alabi",
      lastName: "Emmanuel",
      email: "bobslegend795@gmail.com",
      gender: "Male",
      phoneNumber: "+2348136239706",
      program: {
        slug: "lead-program-one",
        schoolSlug: "lead-school",
      },
      education: {
        value: "",
        highestLevelOfEducation: "Bachelor's Degree",
      },
      employment: {
        employed: "Yes",
        job: "Chef",
        yearsOfExperience: 2,
      },
      countryOfInterest: ["Canada"],
      budget: {
        hasBudget: "Yes",
        budget: {
          currency: "CAD",
          amount: 2000,
        },
      },
    };

    test("should fail if invalid school slug is sent", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();
      await request(server)
        .post("/api/v1/schools")
        .set("authorization", `bearer ${token}`)
        .send({
          ...schoolData,
          slug: "lead-school",
        });

      await request(server)
        .post("/api/v1/schools/lead-school/intakes")
        .send({
          intake: "FEB 2025",
          status: "open",
          startDate: +new Date(),
          deadline: +new Date(),
        })
        .set("authorization", `bearer ${token}`);

      const intakeRes = (await request(server)
        .get("/api/v1/schools/lead-school/intakes")
        .set("authorization", `bearer ${token}`)) as any;

      await request(server)
        .post("/api/v1/schools/lead-school/programs")
        .send({
          type: "single",
          data: {
            ...programData,
            name: "Lead Program One",
            slug: "lead-program-one",
            intakes: intakeRes.body.data.data.map((d: any) => d.id),
          },
        })
        .set("authorization", `bearer ${token}`);

      const res = await request(server)
        .post(baseUrl)
        .send({
          ...testData,
          program: {
            slug: "lead-program-one",
            schoolSlug: "lead-school-wrong",
          },
        });

      expect(res.body).toEqual({
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        data: expect.objectContaining({
          message: "School not found",
        }),
      });
    });

    test("should fail if invalid program slug is sent", async () => {
      const res = await request(server)
        .post(baseUrl)
        .send({
          ...testData,
          program: {
            slug: "lead-program-one-wrong",
            schoolSlug: "lead-school",
          },
        });

      expect(res.body).toEqual({
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        data: expect.objectContaining({
          message: "Program not found",
        }),
      });
    });

    test("should pass", async () => {
      const emailEmitterSpy = jest
        .spyOn(emailService, "send")
        .mockImplementation();

      const res = await request(server).post(baseUrl).send(testData);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        }),
      );

      expect(emailEmitterSpy).toHaveBeenCalled();
    });
  });
});
