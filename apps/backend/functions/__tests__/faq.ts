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
      const res = await request(server).post("/api/v1/faq").send(data);
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

  describe("GET - /api/v1/faq", () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server).get("/api/v1/faq");

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body).toEqual({
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should pass", async () => {
      const { user } = await signInUser();

      const token = await user.getIdToken();

      const res = await request(server)
        .get("/api/v1/faq")
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        success: true,
        data: {
          total: expect.any(Number),
          perPage: 100,
          currentPage: 1,
          nextPage: 2,
          prevPage: 1,
          data: expect.arrayContaining([
            expect.objectContaining({
              question: expect.any(String),
              answer: expect.any(String),
            }),
          ]),
        },
      });
    });
  });

  describe("DELETE - /api/v1/faq", () => {
    test("should fail if not authorized", async () => {
      try {
        await request(server).delete("/api/v1/faq/1");
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass", async () => {
      const emailEmitterSpy = jest
        .spyOn(events, "emitEvent")
        .mockImplementation();

      const { user } = await signInUser();
      const token = await user.getIdToken();

      const createRes = await request(server)
        .post("/api/v1/faq")
        .set("authorization", `bearer ${token}`)
        .send({
          question: "What's Skyned",
          answer: "<p>An Educational Platform</p>",
        });

      const res = await request(server)
        .delete(`/api/v1/faq/${createRes.body.data.id}`)
        .set("authorization", `bearer ${token}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        statusCode: StatusCodes.OK,
        success: true,
        data: {
          message: "Resource Deleted",
        },
      });

      expect(emailEmitterSpy).toHaveBeenCalled();
    });
  });

  describe("GET (List) - /api/v1/faq/list", () => {
    test("should pass", async () => {
      const res = await request(server).get("/api/v1/faq/list");

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        statusCode: StatusCodes.OK,
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            question: expect.any(String),
            answer: expect.any(String),
          }),
        ]),
      });
    });
  });
});
