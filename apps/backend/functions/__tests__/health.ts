/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";

describe("Health Check API", () => {
  describe("GET - /health", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test(`should respond with JSON and status code of ${StatusCodes.OK} status code`, async () => {
      const res = await request(app.getApp()).get("/health");

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
