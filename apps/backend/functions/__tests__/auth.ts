/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { emailService } from "../src/services";

describe("Auth API", () => {
  const server = app.getApp();

  describe("POST - /api/v1/auth/register", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test(`should respond with JSON and status code of ${StatusCodes.BAD_REQUEST} status code for an invalid email address body`, async () => {
      const res = await request(server).post("/api/v1/auth/register").send({
        email: "bob",
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
      const spyOnEmailService = jest
        .spyOn(emailService, "send")
        .mockImplementation();

      const res = await request(server).post("/api/v1/auth/register").send({
        email: "bobslegend795@gmail.com",
      });

      expect(spyOnEmailService).toHaveBeenCalled();
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
