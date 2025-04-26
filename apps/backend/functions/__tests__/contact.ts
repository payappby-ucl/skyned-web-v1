/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { clientAuth, responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { phoneNumberService } from "../src/services";
import { events } from "../src/infrastructure";
import { signInWithEmailAndPassword } from "firebase/auth";
import { admin } from "../src/data";

describe("Contact API", () => {
  const server = app.getApp();

  describe("POST - /api/v1/contact", () => {
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
        .post("/api/v1/contact")
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
      const emailEmitterSpy = jest
        .spyOn(events, "emitEvent")
        .mockImplementation();

      const res = await request(server)
        .post("/api/v1/contact")
        .send({
          ...testData,
          phoneNumber: "+2348136239706",
        });

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        success: true,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });

      expect(emailEmitterSpy).toHaveBeenCalled();
    });
  });

  describe("GET - /api/v1/contact", () => {
    test("should pass", async () => {
      const { user } = await signInWithEmailAndPassword(
        clientAuth,
        admin.email,
        "12345678",
      );

      const token = await user.getIdToken();

      const res = await request(server)
        .get("/api/v1/contact")
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
              message: expect.any(String),
            }),
          ]),
        },
      });
    });
  });
});
