/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../src/app";
import { signInUser } from "./helpers/utils";
import { schoolData } from "../src/data";
import { responseBody } from "./helpers/constants";

describe("Schools API", () => {
  const server = app.getApp();
  const url = "/api/v1/schools";

  describe(`POST - ${url}`, () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server)
        .post(url)
        .send({
          ...schoolData,
          slug: "test-school",
        });

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body).toEqual({
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should fail if invalid school data is passed", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post(url)
        .set("authorization", `bearer ${token}`)
        .send({
          ...schoolData,
          slug: "test-school",
          logo: "12345",
        });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    test("should pass", async () => {
      const { user } = await signInUser();

      const token = await user.getIdToken();

      const res = await request(server)
        .post(url)
        .set("authorization", `bearer ${token}`)
        .send({
          ...schoolData,
          slug: "test-school",
        });

      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body).toEqual({
        statusCode: StatusCodes.CREATED,
        success: true,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should fail when creating another school with already existing slug", async () => {
      const { user } = await signInUser();

      const token = await user.getIdToken();

      const res = await request(server)
        .post(url)
        .set("authorization", `bearer ${token}`)
        .send({
          ...schoolData,
          slug: "test-school",
        });

      expect(res.status).toBe(StatusCodes.CONFLICT);
    });
  });

  describe(`GET - ${url}`, () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server).get(url);

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
        .get(url)
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
              schoolId: expect.any(String),
              id: expect.any(Number),
              name: expect.any(String),
              slug: expect.any(String),
              overview: expect.any(String),
            }),
          ]),
        },
      });
    });
  });
});
