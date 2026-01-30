/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { signInUser } from "./helpers/utils";
import { blogPostData } from "../src/data";

describe("Tag API", () => {
  const server = app.getApp();
  const baseUrl = "/api/v1/tags";
  const data = {
    ...blogPostData,
    title: "Tag Post API",
    slug: "tags-post-api",
    status: "draft",
    categories: ["Canada"],
    tags: ["Canada"],
  };

  let tagId = 0;

  describe(`GET - ${baseUrl}`, () => {
    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      await request(server)
        .post("/api/v1/blogs")
        .set("authorization", `bearer ${token}`)
        .send(data);

      const blogRes = await request(server)
        .get(`/api/v1/blogs/${data.slug}`)
        .set("authorization", `bearer ${token}`);

      tagId = blogRes.body.data.tags[0].id;

      const res = await request(server)
        .get(baseUrl)
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            id: expect.any(Number),
          }),
        ]),
      });
    });
  });

  describe(`GET - ${baseUrl}/list`, () => {
    test("should pass", async () => {
      const res = await request(server).get(`${baseUrl}/list`);

      expect(res.statusCode).toBe(StatusCodes.OK);
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
              name: expect.any(String),
            }),
          ]),
        },
      });
    });
  });

  describe(`DELETE - ${baseUrl}/${tagId}`, () => {
    test("should fail if not authorized", async () => {
      try {
        await request(server).delete(`${baseUrl}/${tagId}`);
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .delete(`${baseUrl}/${tagId}`)
        .set("authorization", `bearer ${token}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe(`PUT - ${baseUrl} - deleting tags`, () => {
    test("should fail when passed invalid input body", async () => {
      try {
        await request(server).put(`${baseUrl}`).send({
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
          .put(`${baseUrl}`)
          .send({
            data: [
              {
                id: 2,
              },
            ],
          });
      } catch (error: any) {
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      }
    });

    test("should pass", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      await request(server)
        .post("/api/v1/blogs")
        .set("authorization", `bearer ${token}`)
        .send({
          ...data,
          slug: "tag-blog-test-slug",
        });

      const blogRes = await request(server)
        .get("/api/v1/blogs/tag-blog-test-slug")
        .set("authorization", `bearer ${token}`);

      tagId = blogRes.body.data.tags[0].id;

      const res = await request(server)
        .put(`${baseUrl}`)
        .set("authorization", `bearer ${token}`)
        .send({
          data: [{ id: tagId }],
        });

      expect(res.statusCode).toBe(StatusCodes.OK);
    });
  });
});
