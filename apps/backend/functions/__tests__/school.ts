/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../src/app";
import { signInUser } from "./helpers/utils";
import { accommodationData, programData, schoolData } from "../src/data";
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
    test("should pass if no authorization header is passed", async () => {
      const res = await request(server).get(url);

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
              name: expect.any(String),
              slug: expect.any(String),
              overview: expect.any(String),
            }),
          ]),
        },
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

  describe(`Get school by slug - ${url}/test-school`, () => {
    const fullUrl = `${url}/test-school`;
    test("should get school if no authorization header is passed", async () => {
      const res = await request(server).get(fullUrl);
      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.data.id).not.toBeDefined();
      expect(res.body.data.schoolId).not.toBeDefined();
      expect(res.body.data.slug).toBe("test-school");
    });

    test("should get school if authorization header is passed", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .get(fullUrl)
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.data.id).not.toBeNull();
      expect(res.body.data.schoolId).not.toBeNull();
      expect(res.body.data.slug).toBe("test-school");
    });
  });

  describe(`Update school - ${url}/test-school`, () => {
    const fullUrl = `${url}/test-school`;
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server)
        .put(fullUrl)
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

    test("should update school", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .put(fullUrl)
        .send({
          ...schoolData,
          slug: "test-school",
          currency: "NGN",
        })
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        }),
      );
    });
  });

  describe(`POST Accommodation - ${url}/test-school/accommodation`, () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server)
        .post(`${url}/test-school/accommodation`)
        .send({
          ...accommodationData,
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

    test("should create an accommodation", async () => {
      const { user } = await signInUser();

      const token = await user.getIdToken();

      const res = await request(server)
        .post(`${url}/test-school/accommodation`)
        .set("authorization", `bearer ${token}`)
        .send({
          ...accommodationData,
        });

      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body.data.description).toBe(accommodationData.description);
    });
  });

  describe(`PUT Accommodation - ${url}/test-school/accommodation`, () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server)
        .put(`${url}/test-school/accommodation`)
        .send({
          ...accommodationData,
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

    test("should update an accommodation", async () => {
      const { user } = await signInUser();

      const token = await user.getIdToken();

      const res = await request(server)
        .put(`${url}/test-school/accommodation`)
        .set("authorization", `bearer ${token}`)
        .send({
          description: "updated",
        });

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.data.description).toBe("updated");
    });
  });

  describe(`GET Accommodation - ${url}/test-school/accommodation`, () => {
    test("should get an accommodation", async () => {
      const res = await request(server).get(`${url}/test-school/accommodation`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.data.description).toBe("updated");
    });
  });

  describe(`DELETE Accommodation - ${url}/test-school/accommodation`, () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server).delete(
        `${url}/test-school/accommodation`,
      );

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body).toEqual({
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        data: expect.objectContaining({
          message: expect.any(String),
        }),
      });
    });

    test("should delete an accommodation", async () => {
      const { user } = await signInUser();

      const token = await user.getIdToken();

      const res = await request(server)
        .delete(`${url}/test-school/accommodation`)
        .set("authorization", `bearer ${token}`);

      const delRes = await request(server).get(
        `${url}/test-school/accommodation`,
      );

      expect(res.status).toBe(StatusCodes.OK);
      expect(delRes.body.data).toBeNull();
    });
  });

  describe("School Intakes", () => {
    const route = `${url}/test-school/intakes`;
    let intakeId = 0;

    describe(`POST Intake - ${route}`, () => {
      test("should fail if no authorization header is passed", async () => {
        const res = await request(server).post(`${route}`).send({
          intake: "JUN 2025",
          startDate: +new Date(),
          deadline: +new Date(),
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

      test("should create an intake", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();

        const res = await request(server)
          .post(`${route}`)
          .send({
            intake: "FEB 2025",
            startDate: +new Date(),
            deadline: +new Date(),
          })
          .set("authorization", `bearer ${token}`);

        intakeId = res.body.data.id;
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            intake: expect.any(String),
            startDate: expect.any(String),
            deadline: expect.any(String),
            schoolId: expect.any(String),
          }),
        );
      });
    });

    describe(`GET intakes - ${route}`, () => {
      test("should get intakes", async () => {
        const res = await request(server).get(`${route}`);

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
                intake: expect.any(String),
                startDate: expect.any(String),
                deadline: expect.any(String),
              }),
            ]),
          },
        });
      });

      test("should get intakes", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();
        const res = await request(server)
          .get(`${route}`)
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
                intake: expect.any(String),
                startDate: expect.any(String),
                deadline: expect.any(String),
                school: expect.objectContaining({
                  name: expect.any(String),
                  slug: expect.any(String),
                  country: expect.any(String),
                }),

                createdBy: expect.objectContaining({
                  firstName: expect.any(String),
                }),
              }),
            ]),
          },
        });
      });
    });

    describe(`PUT Intake - ${route}/${intakeId}`, () => {
      test("should fail if no authorization header is passed", async () => {
        const res = await request(server).put(`${route}/${intakeId}`).send({
          intake: "MAY 2025",
          startDate: +new Date(),
          deadline: +new Date(),
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

      test("should update an intake", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();

        const res = await request(server)
          .put(`${route}/${intakeId}`)
          .send({
            intake: "MAY 2026",
            startDate: +new Date(),
            deadline: +new Date(),
          })
          .set("authorization", `bearer ${token}`);

        intakeId = res.body.data.id;
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            intake: expect.any(String),
            startDate: expect.any(String),
            deadline: expect.any(String),
            schoolId: expect.any(String),
          }),
        );
      });
    });
  });

  describe("School Programs", () => {
    const route = `${url}/test-school/programs`;

    describe(`POST Programs - ${route}`, () => {
      test("should fail if invalid input is passed", async () => {
        const res = await request(server)
          .post(`${route}`)
          .send({
            ...programData,
          });

        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body).toEqual({
          statusCode: StatusCodes.BAD_REQUEST,
          success: false,
          data: expect.objectContaining({
            message: expect.any(String),
          }),
        });
      });

      test("should fail if no authorization header is passed", async () => {
        const res = await request(server)
          .post(`${route}`)
          .send({
            type: "single",
            data: {
              ...programData,
              name: "School Program One",
              slug: "school-program-one",
              intakes: [1],
            },
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

      test("should create a program", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();
        const intakeRes = (await request(server)
          .get(`${url}/test-school/intakes`)
          .set("authorization", `bearer ${token}`)) as any;

        const res = await request(server)
          .post(`${route}`)
          .send({
            type: "single",
            data: {
              ...programData,
              name: "School Program One",
              slug: "school-program-one",
              intakes: intakeRes.body.data.data.map((d: any) => d.id),
            },
          })
          .set("authorization", `bearer ${token}`);

        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          }),
        );
      });

      test("should create bulk programs", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();
        const intakeRes = (await request(server)
          .get(`${url}/test-school/intakes`)
          .set("authorization", `bearer ${token}`)) as any;

        const res = await request(server)
          .post(`${route}`)
          .send({
            type: "bulk",
            data: ["Bulk School Program One", "Bulk School Program Two"].map(
              (name) => ({
                ...programData,
                name,
                slug: name.toLowerCase().split(" ").join("-"),
                intakes: intakeRes.body.data.data.map((d: any) => d.id),
              }),
            ),
          })
          .set("authorization", `bearer ${token}`);

        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          }),
        );
      });
    });

    describe(`GET Programs - ${route}`, () => {
      test("should return program list when unauthenticated", async () => {
        const res = await request(server).get(`${route}`);

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
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
                slug: expect.any(String),
                school: expect.objectContaining({
                  name: expect.any(String),
                  slug: expect.any(String),
                  currency: expect.any(String),
                }),
              }),
            ]),
          },
        });
      });

      test("should return program list when admin", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();

        const res = await request(server)
          .get(`${route}`)
          .set("authorization", `bearer ${token}`);

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
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
                slug: expect.any(String),
                school: expect.objectContaining({
                  name: expect.any(String),
                  slug: expect.any(String),
                  currency: expect.any(String),
                }),
                description: expect.any(String),
                schoolId: expect.any(String),
              }),
            ]),
          },
        });
      });
    });

    describe(`GET Program - ${route}/school-program-one`, () => {
      const url = `${route}/school-program-one`;

      test("should return program when unauthenticated", async () => {
        const res = await request(server).get(`${url}`);

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
        expect(res.body).toEqual({
          ...responseBody,
          success: true,
          data: expect.objectContaining({
            name: expect.any(String),
            slug: expect.any(String),
            school: expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              currency: expect.any(String),
            }),
          }),
        });
      });

      test("should return program when admin", async () => {
        const { user } = await signInUser();
        const token = await user.getIdToken();

        const res = await request(server)
          .get(url)
          .set("authorization", `bearer ${token}`);

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
        expect(res.body).toEqual({
          ...responseBody,
          success: true,
          data: expect.objectContaining({
            name: expect.any(String),
            slug: expect.any(String),
            school: expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              currency: expect.any(String),
            }),
            description: expect.any(String),
            schoolId: expect.any(String),
          }),
        });
      });

      test("should return null for not found programs", async () => {
        const res = await request(server).get(
          `${route}/school-program-one-12345`,
        );

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).not.toBeNull();
        expect(res.body).toEqual({
          ...responseBody,
          success: true,
          data: null,
        });
      });
    });
  });
});
