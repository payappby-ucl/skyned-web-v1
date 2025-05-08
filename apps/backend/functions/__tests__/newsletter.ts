/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../src/app";
import { marketing } from "../src/infrastructure";

describe("Newsletter API", () => {
  describe("POST - /api/v1/newsletter/subscribe", () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    test("should fail if no email in body", async () => {
      try {
        await request(app.getApp())
          .post("/api/v1/newsletter/subscribe")
          .send({});
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
      }
    });

    test("should pass", async () => {
      const contactSpy = jest
        .spyOn(marketing, "createContact")
        .mockImplementation(async () => ({ contactId: 1 }));

      const tagSpy = jest
        .spyOn(marketing, "addContactToAudience")
        .mockImplementation();

      const res = await request(app.getApp())
        .post("/api/v1/newsletter/subscribe")
        .send({ email: "bobslegend795@gmail.com" });

      expect(contactSpy).toHaveBeenCalled();
      expect(tagSpy).toHaveBeenCalled();
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          message:
            "bobslegend795@gmail.com has been successfully subscribed to our newsletter.",
        }),
      );
    });
  });
});
