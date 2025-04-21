/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import { signInWithEmailAndPassword } from "firebase/auth";
import request from "supertest";
import { clientAuth, responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { admin } from "../src/data";

describe("Admin API", () => {
  const server = app.getApp();

  describe("POST - /api/v1/admin/me", () => {
    beforeAll(() => {
      jest.resetAllMocks();
    });

    test(`should respond with JSON and status code of ${StatusCodes.UNAUTHORIZED} status code`, async () => {
      const res = await request(server).get("/api/v1/admin/me");

      expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body).toEqual({
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should pass", async () => {
      const { user } = await signInWithEmailAndPassword(
        clientAuth,
        admin.email,
        "12345678",
      );

      const token = await user.getIdToken();
      const res = await request(server)
        .get("/api/v1/admin/me")
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        success: true,
        data: expect.objectContaining({
          email: user.email,
          adminId: user.uid,
        }),
      });
    });
  });
});
