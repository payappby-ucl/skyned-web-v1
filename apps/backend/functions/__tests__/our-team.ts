import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../src/app";

describe("Our Team API", () => {
  const server = app.getApp();
  const baseUrl = "/api/v1/our-team";

  describe(`GET - ${baseUrl}`, () => {
    test("should respond with a our team info with limit of 1", async () => {
      const res = await request(server).get(baseUrl + "?limit=1");

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            jobTitle: expect.any(String),
            primaryImage: {
              url: expect.any(String),
              path: expect.any(String),
              mimeType: expect.any(String),
            },
          }),
        ]),
      );
    });

    test("should respond with a our team info", async () => {
      const res = await request(server).get(baseUrl);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            jobTitle: expect.any(String),
            primaryImage: {
              url: expect.any(String),
              path: expect.any(String),
              mimeType: expect.any(String),
            },
          }),
        ]),
      );
    });
  });
});
