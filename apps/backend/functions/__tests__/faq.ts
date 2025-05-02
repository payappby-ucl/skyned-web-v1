/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { events } from "../src/infrastructure";
import { signInUser } from "./helpers/utils";
import { SkynedUtils } from "../src/utils";

describe("FAQ API", () => {
  const server = app.getApp();

  describe("POST - /api/v1/faq", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    const testData = {
      question: "What's Skyned",
      answer: "<p>An Educational Platform</p>",
    };

    test(`should respond with JSON and status code of ${StatusCodes.BAD_REQUEST} status code for an invalid data`, async () => {
      const data = {
        ...SkynedUtils.exclude(testData, ["answer"]),
      };

      console.log(data);

      const res = await request(server).post("/api/v1/faq").send(data);

      console.log(res.body);

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toEqual({
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should pass", async () => {
      const emailEmitterSpy = jest
        .spyOn(events, "emitEvent")
        .mockImplementation();

      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post("/api/v1/faq")
        .set("authorization", `bearer ${token}`)
        .send(testData);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toEqual({
        ...responseBody,
        statusCode: StatusCodes.CREATED,
        success: true,
        data: expect.objectContaining(testData),
      });

      expect(emailEmitterSpy).toHaveBeenCalled();
    });
  });
});
