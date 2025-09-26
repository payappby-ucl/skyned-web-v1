/* eslint-disable max-len */
import request from "supertest";
import { app } from "../src/app";
import { scholarshipData } from "../src/data";
import { StatusCodes } from "http-status-codes";
import { signInUser } from "./helpers/utils";
import { responseBody } from "./helpers/constants";

describe("Scholarship API", () => {
  const server = app.getApp();
  const url = "/api/v1/scholarships";

  describe("Scholarship", () => {
    describe(`POST Scholarships - ${url}`, () => {
      test("should fail if no authorization header is passed", async () => {
        const res = await request(server)
          .post(url)
          .send({
            ...scholarshipData,
            slug: "test-scholarship",
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

      test("should fail if invalid scholarship data is passed", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();

        const res = await request(server)
          .post(url)
          .set("authorization", `bearer ${token}`)
          .send({
            ...scholarshipData,
            slug: "test-scholarship",
            banner: "12345",
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
            ...scholarshipData,
            slug: "test-scholarship",
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

      test("should fail when creating another scholarship with already existing slug", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();
        const res = await request(server)
          .post(url)
          .set("authorization", `bearer ${token}`)
          .send({
            ...scholarshipData,
            slug: "test-scholarship",
          });

        expect(res.status).toBe(StatusCodes.CONFLICT);
      });
    });

    describe(`GET Scholarships - ${url}`, () => {
      test("should return scholarships list when unauthenticated", async () => {
        const res = await request(server).get(`${url}`);

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
        expect(res.body).toEqual({
          ...responseBody,
          success: true,
          data: expect.objectContaining({
            total: expect.any(Number),
            perPage: 100,
            currentPage: 1,
            nextPage: 2,
            prevPage: 1,
          }),
        });
      });

      test("should return program list when admin", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();

        const res = await request(server)
          .get(`${url}`)
          .set("authorization", `bearer ${token}`);

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
        expect(res.body).toEqual({
          ...responseBody,
          success: true,
          data: expect.objectContaining({
            total: expect.any(Number),
            perPage: 100,
            currentPage: 1,
            nextPage: 2,
            prevPage: 1,
          }),
        });
      });
    });
  });
});
