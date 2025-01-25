/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { clearAllFirestoreData, initializeFirebase } from "./helpers/firebase";

describe("Health Check API", () => {
  describe("GET - /health", () => {
    beforeAll(() => {
      initializeFirebase();
    });

    afterAll(async () => {
      await clearAllFirestoreData();
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

    test("should work", async () => {
      const res = await request(app.getApp()).get("/api/v1/test");
      expect(res.status).toBe(200);
    });
  });
});
