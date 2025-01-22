import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { env } from "../src/config";
import { app } from "../src/app";
import { responseBody } from "./helpers/constants";

describe("Base API", () => {
  const baseUrl = `${env.domains.baseUrl}`;
  const server = app.getApp();

  describe(`GET - ${baseUrl}`, () => {
    test("should respond with a message", async () => {
      const res = await request(server).get(baseUrl);
      expect(res.status).toBe(StatusCodes.OK);
      expect(res.text).toBe("Welcome to Skyned Consults.");
    });
  });

  describe(`GET - ${baseUrl}/notFound`, () => {
    test("should respond with not found message", async () => {
      const res = await request(server).get(`${baseUrl}/notFound`);

      expect(res.status).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toEqual({
        ...responseBody,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        data: null,
        message: "Sorry we could not find the resource you're looking for",
      });
    });
  });
});
