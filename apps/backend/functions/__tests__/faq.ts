/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { signInUser } from "./helpers/utils";
import { SkynedUtils } from "../src/utils";
import { publisher } from "../src/publisher";

describe("FAQ API", () => {
  const server = app.getApp();
  const baseUrl = "/api/v1/faqs";

  describe(`POST - ${baseUrl}`, () => {
    const testData = {
      question: "What's Skyned",
      answer: "<p>An Educational Platform</p>",
    };

    test(`should respond with JSON and status code of ${StatusCodes.BAD_REQUEST} status code for an invalid data`, async () => {
      const data = {
        ...SkynedUtils.exclude(testData, ["answer"]),
      };
      const res = await request(server).post(baseUrl).send(data);
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
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post(baseUrl)
        .set("authorization", `bearer ${token}`)
        .send(testData);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toEqual({
        ...responseBody,
        statusCode: StatusCodes.CREATED,
        success: true,
        data: expect.objectContaining(testData),
      });
    });
  });

  describe(`GET - ${baseUrl}`, () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server).get(baseUrl);

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
        .get(baseUrl)
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

  describe(`DELETE - ${baseUrl}`, () => {
    test("should fail if not authorized", async () => {
      try {
        await request(server).delete(`${baseUrl}/1`);
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass", async () => {
      const emailEmitterSpy = jest
        .spyOn(publisher, "publish")
        .mockImplementation();

      const { user } = await signInUser();
      const token = await user.getIdToken();

      const createRes = await request(server)
        .post(baseUrl)
        .set("authorization", `bearer ${token}`)
        .send({
          question: "What's Skyned",
          answer: "<p>An Educational Platform</p>",
        });

      const res = await request(server)
        .delete(`${baseUrl}/${createRes.body.data.id}`)
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

  describe(`GET (List) - ${baseUrl}/list`, () => {
    test("should pass", async () => {
      const res = await request(server).get(`${baseUrl}/list`);

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

  describe(`GET - ${baseUrl}/:id`, () => {
    test("should fail when passed invalid input", async () => {
      try {
        await request(server).get(`${baseUrl}/thhrn`);
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
      }
    });

    test("should fail when passed not authorized", async () => {
      try {
        await request(server).get(`${baseUrl}/1`);
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass but return null if finding FAQ that does not exist", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .get(`${baseUrl}/${200}`)
        .set("authorization", `bearer ${token}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data).toBeNull();
    });

    test("should pass", async () => {
      const emailEmitterSpy = jest
        .spyOn(publisher, "publish")
        .mockImplementation();

      const { user } = await signInUser();
      const token = await user.getIdToken();

      const createRes = await request(server)
        .post(baseUrl)
        .set("authorization", `bearer ${token}`)
        .send({
          question: "What's Skyned",
          answer: "<p>An Educational Platform</p>",
        });

      const res = await request(server)
        .get(`${baseUrl}/${createRes.body.data.id}`)
        .set("authorization", `bearer ${token}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data.id).toBe(createRes.body.data.id);
      expect(emailEmitterSpy).toHaveBeenCalled();
    });
  });

  describe(`PUT - ${baseUrl}/:id - Updating Faq`, () => {
    test("should fail when passed invalid input", async () => {
      try {
        await request(server).put(`${baseUrl}/thhrn`);
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
      }
    });

    test("should fail when passed invalid input body", async () => {
      try {
        await request(server).put(`${baseUrl}/1`).send({
          question: "",
          answer: "",
        });
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
      }
    });

    test("should fail when passed not authorized", async () => {
      try {
        await request(server).put(`${baseUrl}/1`).send({
          question: "What's your name?",
          answer: "Alabi",
        });
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass", async () => {
      const emailEmitterSpy = jest
        .spyOn(publisher, "publish")
        .mockImplementation();

      const { user } = await signInUser();
      const token = await user.getIdToken();

      const createRes = await request(server)
        .post(baseUrl)
        .set("authorization", `bearer ${token}`)
        .send({
          question: "What's Skyned",
          answer: "<p>An Educational Platform</p>",
        });

      const res = await request(server)
        .put(`${baseUrl}/${createRes.body.data.id}`)
        .set("authorization", `bearer ${token}`)
        .send({
          question: "What's Skyned Consults",
          answer: "<p>An Educational Platform</p>",
        });

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data.id).toBe(createRes.body.data.id);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          question: "What's Skyned Consults",
        }),
      );
      expect(emailEmitterSpy).toHaveBeenCalled();
    });
  });
});
