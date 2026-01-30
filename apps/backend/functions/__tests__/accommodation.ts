import { StatusCodes } from "http-status-codes";
import { app } from "../src/app";
import request from "supertest";

describe("Accommodation API", () => {
  const server = app.getApp();
  const baseUrl = "/api/v1/accommodations";

  describe(`${baseUrl} - GET`, () => {
    test("should pass", async () => {
      const res = await request(server).get(baseUrl);

      expect(res.status).toBe(StatusCodes.OK);
    });
  });
});
