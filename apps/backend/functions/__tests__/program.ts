/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../src/app";
import { signInUser } from "./helpers/utils";
import { responseBody } from "./helpers/constants";

describe("Program API", () => {
  const server = app.getApp();
  const url = "/api/v1/programs";

  describe("Programs", () => {
    describe(`GET Programs - ${url}`, () => {
      test("should return program list when unauthenticated", async () => {
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
