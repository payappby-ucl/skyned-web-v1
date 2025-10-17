/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { phoneNumberService } from "../src/services";
import { financialAidData, programData, schoolData } from "../src/data";
import { signInUser } from "./helpers/utils";
import { publisher } from "../src/publisher";

describe("Financial Aid API", () => {
  const server = app.getApp();
  const base = "/api/v1/financial-aids";

  describe(`POST - ${base}`, () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    const testData = {
      name: "Alabi Emmanuel",
      email: "bobslegend795@gmail.com",
      phoneNumber: phoneNumberService.formatPhoneNumber("+2348136239706"),
      subject: "Test Subject",
      message: "Test Message",
    };

    test(`should respond with JSON and status code of ${StatusCodes.BAD_REQUEST} status code for an invalid data`, async () => {
      const res = await request(server)
        .post(base)
        .send({
          ...testData,
          phoneNumber: "22334",
        });

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toEqual({
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const emailEmitterSpy = jest
        .spyOn(publisher, "publish")
        .mockImplementation();

      await request(server)
        .post("/api/v1/schools")
        .set("authorization", `bearer ${token}`)
        .send({
          ...schoolData,
          slug: "financial-aid-school",
        });

      await request(server)
        .post("/api/v1/schools/financial-aid-school/intakes")
        .send({
          intake: "FEB 2025",
          status: "open",
          startDate: +new Date(),
          deadline: +new Date(),
        })
        .set("authorization", `bearer ${token}`);

      const intakeRes = (await request(server)
        .get("/api/v1/schools/financial-aid-school/intakes")
        .set("authorization", `bearer ${token}`)) as any;

      await request(server)
        .post("/api/v1/schools/financial-aid-school/programs")
        .send({
          type: "single",
          data: {
            ...programData,
            name: "Financial Aid Program One",
            slug: "financial-aid-program-one",
            intakes: intakeRes.body.data.data.map((d: any) => d.id),
            financialAids: ["mpower", "passage"],
          },
        })
        .set("authorization", `bearer ${token}`);

      const res = await request(server)
        .post(base)
        .send({
          ...financialAidData,
          schoolSlug: "financial-aid-school",
          programSlug: "financial-aid-program-one",
        });

      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body).toEqual({
        ...responseBody,
        success: true,
        statusCode: StatusCodes.CREATED,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });

      expect(emailEmitterSpy).toHaveBeenCalled();
    });
  });

  describe(`GET - ${base}`, () => {
    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();
      const res = await request(server)
        .get(base)
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        success: true,
        data: {
          total: expect.any(Number),
          perPage: 100,
          currentPage: 1,
          nextPage: 2,
          prevPage: 1,
          data: expect.arrayContaining([
            expect.objectContaining({
              firstName: expect.any(String),
              lastName: expect.any(String),
              email: expect.any(String),
            }),
          ]),
        },
      });
    });
  });
});
