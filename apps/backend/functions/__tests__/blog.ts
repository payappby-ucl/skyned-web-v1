/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { signInUser } from "./helpers/utils";
import { blogPostData } from "../src/data";

describe("Blog API", () => {
  const server = app.getApp();
  const baseUrl = "/api/v1/blogs";
  const data = {
    ...blogPostData,
    title: "Blog Post API",
    slug: "blog-post-api",
    status: "draft",
    categories: ["Canada"],
    tags: ["Canada"],
  };

  describe(`POST - ${baseUrl}`, () => {
    test("should fail if invalid data is passed", async () => {
      const res = await request(server).post(baseUrl).send({});
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toEqual({
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should fail if not authorized", async () => {
      const res = await request(server).post(baseUrl).send(data);
      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });

    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post(baseUrl)
        .set("authorization", `bearer ${token}`)
        .send(data);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toEqual(
        expect.objectContaining({
          statusCode: StatusCodes.CREATED,
          success: true,
        }),
      );
    });
  });

  describe(`GET - ${baseUrl}`, () => {
    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();
      const res = await request(server)
        .get(baseUrl + "?s=draft")
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
              title: expect.any(String),
              slug: expect.any(String),
              categories: expect.arrayContaining([
                expect.objectContaining({
                  name: expect.any(String),
                }),
              ]),
              tags: expect.arrayContaining([
                expect.objectContaining({
                  name: expect.any(String),
                }),
              ]),
            }),
          ]),
        },
      });
    });
  });

  describe(`GET - ${baseUrl}/${data.slug}`, () => {
    test("should pass", async () => {
      const res = await request(server).get(`${baseUrl}/${data.slug}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data.title).toBe(data.title);
    });
  });

  describe(`PUT - ${baseUrl}/${data.slug} - Updating Blog`, () => {
    test("should fail when passed invalid input body", async () => {
      try {
        await request(server).put(`${baseUrl}/${data.slug}`).send({
          question: "",
          answer: "",
        });
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
      }
    });

    test("should fail when passed not authorized", async () => {
      try {
        await request(server)
          .put(`${baseUrl}/${data.slug}`)
          .send({
            status: "scheduled",
            publishedAt: new Date(Date.now() + 1000000),
          });
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .put(`${baseUrl}/${data.slug}`)
        .set("authorization", `bearer ${token}`)
        .send({
          status: "scheduled",
          publishedAt: Date.now() + 1000000,
        });

      expect(res.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe(`DELETE - ${baseUrl}/${data.slug}`, () => {
    test("should fail if not authorized", async () => {
      try {
        await request(server).delete(`${baseUrl}/${data.slug}`);
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .delete(`${baseUrl}/${data.slug}`)
        .set("authorization", `bearer ${token}`);

      const getRes = await request(server).get(`${baseUrl}/${data.slug}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toEqual(
        expect.objectContaining({
          statusCode: StatusCodes.OK,
          success: true,
        }),
      );
      expect(getRes.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
