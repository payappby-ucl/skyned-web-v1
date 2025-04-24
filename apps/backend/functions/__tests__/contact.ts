/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { phoneNumberService } from "../src/services";
import { events } from "../src/infrastructure";

describe("Contact API", () => {
  const server = app.getApp();

  describe("POST - /api/v1/contact", () => {
    afterEach(() => {
      jest.resetAllMocks();
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
      jest.spyOn(events, "sendMail").mockImplementation();

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
    });
  });
});
