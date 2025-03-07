/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { initializeFirebase } from "./helpers/firebase";
import { email } from "../src/infrastructure";

beforeAll(() => {
  initializeFirebase();
});

// afterAll(async () => {
//   await clearAllFirestoreData();
// });

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

    test("should work", async () => {
      const spy = jest.spyOn(email, "send").mockImplementation();
      const res = await request(app.getApp()).get("/api/v1/test");
      expect(spy).toHaveBeenCalled();
      expect(res.status).toBe(200);
    });
  });
});
