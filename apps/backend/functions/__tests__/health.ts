/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { env } from "../src/env";
import { app } from "../src/app";
import { responseBody } from "./constants";

describe("Health Check API", () => {
  const baseUrl = `${env.domains.baseUrl}/health`;

  describe(`GET - ${baseUrl}`, () => {
    test(`should respond with JSON and status code of ${StatusCodes.OK} status code`, async () => {
      const res = await request(app.getApp()).get(baseUrl);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        data: {
          message: "Skyned Server is healthy.",
        },
      });
    });
  });
});
