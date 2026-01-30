/* eslint-disable max-len */
import request from "supertest";
import { app } from "../src/app";
import { scholarshipData } from "../src/data";
import { StatusCodes } from "http-status-codes";
import { signInUser } from "./helpers/utils";
import { responseBody } from "./helpers/constants";
import { SkynedUtils } from "../src/utils";

describe("Scholarship API", () => {
  const server = app.getApp();
  const url = "/api/v1/scholarships";
  const data = {
    ...scholarshipData,
    slug: "test-scholarship",
  };

  describe("Scholarship", () => {
    describe(`POST Scholarships - ${url}`, () => {
      test("should fail if no authorization header is passed", async () => {
        const res = await request(server).post(url).send(data);

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
            slug: data.slug,
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
            slug: data.slug,
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
            slug: data.slug,
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

    describe(`Get scholarship summary - ${url}`, () => {
      test("should return the scholarship summary", async () => {
        const res = await request(server).get(url + "/summary");

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
        expect(res.body).toEqual({
          ...responseBody,
          success: true,
          data: expect.arrayContaining([
            expect.objectContaining({
              category: expect.any(String),
              _count: {
                _all: expect.any(Number),
              },
            }),
          ]),
        });
      });
    });

    describe("Single Scholarship Endpoint", () => {
      const sUrl = `${url}/${data.slug}`;

      describe(`GET single Scholarships - ${sUrl}`, () => {
        test("should return the scholarship", async () => {
          const res = await request(server).get(sUrl);

          expect(res.status).toBe(StatusCodes.OK);
          expect(res.body).not.toBeNull();
          expect(res.body).toEqual({
            ...responseBody,
            success: true,
            data: expect.objectContaining({
              title: data.title,
              subtitle: data.subtitle,
              slug: data.slug,
              overview: data.overview,
            }),
          });
        });
      });

      describe(`Update single Scholarships - ${sUrl}`, () => {
        test("should activate the scholarship", async () => {
          const { user } = await signInUser();
          const token = await user.getIdToken();

          await request(server)
            .put(sUrl)
            .set("authorization", `bearer ${token}`)
            .send({
              ...SkynedUtils.exclude(data, ["banner"]),
              overview: "New Overview",
            });

          const res = await request(server).get(sUrl);

          expect(res.status).toBe(StatusCodes.OK);
          expect(res.body).not.toBeNull();
          expect(res.body).toEqual({
            ...responseBody,
            success: true,
            data: expect.objectContaining({
              title: data.title,
              subtitle: data.subtitle,
              slug: data.slug,
              overview: "New Overview",
            }),
          });
        });
      });

      describe(`Deactivate single Scholarships - ${sUrl}/deactivate`, () => {
        test("should deactivate the scholarship", async () => {
          const { user } = await signInUser();
          const token = await user.getIdToken();

          await request(server)
            .patch(sUrl + "/deactivate")
            .set("authorization", `bearer ${token}`);

          const res = await request(server)
            .get(sUrl)
            .set("authorization", `bearer ${token}`);

          expect(res.status).toBe(StatusCodes.OK);
          expect(res.body).not.toBeNull();
          expect(res.body).toEqual({
            ...responseBody,
            success: true,
            data: expect.objectContaining({
              title: data.title,
              subtitle: data.subtitle,
              slug: data.slug,
              active: false,
            }),
          });
        });
      });

      describe(`Activate single Scholarships - ${sUrl}/activate`, () => {
        test("should return the scholarship", async () => {
          const { user } = await signInUser();
          const token = await user.getIdToken();

          await request(server)
            .patch(sUrl + "/activate")
            .set("authorization", `bearer ${token}`);

          const res = await request(server)
            .get(sUrl)
            .set("authorization", `bearer ${token}`);

          expect(res.status).toBe(StatusCodes.OK);
          expect(res.body).not.toBeNull();
          expect(res.body).toEqual({
            ...responseBody,
            success: true,
            data: expect.objectContaining({
              title: data.title,
              subtitle: data.subtitle,
              slug: data.slug,
              active: true,
            }),
          });
        });
      });

      describe(`Delete Scholarship - ${url}`, () => {
        test("should delete the scholarship", async () => {
          const { user } = await signInUser();
          const token = await user.getIdToken();

          await request(server)
            .delete(sUrl)
            .set("authorization", `bearer ${token}`);

          const res = await request(server).get(sUrl);

          expect(res.status).toBe(StatusCodes.NOT_FOUND);
        });
      });
    });
  });
});
