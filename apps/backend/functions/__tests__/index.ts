import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../src/app";
import { responseBody } from "./helpers/constants";

describe("Base API", () => {
  const server = app.getApp();

  describe("GET - /", () => {
    test("should respond with a message", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(StatusCodes.OK);
      expect(res.text).toBe("Welcome to Skyned Consults.");
    });
  });

  describe("GET - /notFound", () => {
    test("should respond with not found message", async () => {
      const res = await request(server).get("/notFound");

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
