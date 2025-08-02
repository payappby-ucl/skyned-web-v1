/* eslint-disable max-len */

import { StatusCodes } from "http-status-codes";
import { signInWithEmailAndPassword } from "firebase/auth";
import request from "supertest";
import { clientAuth, responseBody } from "./helpers/constants";
import { app } from "../src/app";
import { admin } from "../src/data";
import { SkynedUtils } from "../src/utils";
import { primaryImageDataUri } from "../src/seed/image";
import { department } from "@workspace/shared";
import { signInUser } from "./helpers/utils";

describe("Admin API", () => {
  const server = app.getApp();
  const baseUrl = "/api/v1/admins";

  describe(`GET - ${baseUrl}/me`, () => {
    beforeAll(() => {
      jest.resetAllMocks();
    });

    test(`should respond with JSON and status code of ${StatusCodes.UNAUTHORIZED} status code`, async () => {
      const res = await request(server).get(`${baseUrl}/me`);

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
        .get(`${baseUrl}/me`)
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

  describe(`Create Admin - POST - ${baseUrl}`, () => {
    const creationData = {
      ...SkynedUtils.exclude(admin, ["adminId"]),
      primaryImage: primaryImageDataUri,
      phoneNumber: "+2348136239706",
      jobTitle: "CTO",
      socials: [
        {
          name: "facebook",
          url: "https://www.facebook.com",
        },
      ],
      departments: [{ id: 6, name: department.Human_Resource }],
    };

    test("should fail if not an authorized user", async () => {
      const res = await request(server).post(baseUrl).send(creationData);

      expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    test("should fail if input data is not valid", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...SkynedUtils.exclude(creationData, ["departments"]),
        });

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    }, 10000);

    test("should fail if creating with email that's not @skynedconsults.com", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...creationData,
          email: "bobslegend795@gmail.com",
        });

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    }, 10000);

    test("should fail if creating with already existing email", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send(creationData);

      expect(res.status).toBe(StatusCodes.CONFLICT);
    }, 10000);

    test("should create an admin", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...creationData,
          email: "tobi@skynedconsults.com",
        });

      expect(res.body.data).toEqual(
        expect.objectContaining({
          email: "tobi@skynedconsults.com",
        }),
      );
    }, 10000);

    test("should fail if creation data has executive department but the creator is not an executive lead", async () => {
      const { user } = await signInUser("tobi@skynedconsults.com", "12345678");
      const token = await user.getIdToken();

      const res = await request(server)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...creationData,
          email: "tobi2@skynedconsults.com",
          departments: [
            {
              id: 1,
              name: department.Executive,
            },
          ],
        });

      expect(res.status).toBe(StatusCodes.FORBIDDEN);
    }, 10000);
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
              adminId: expect.any(String),
              id: expect.any(Number),

              _count: {
                departments: expect.any(Number),
                teams: expect.any(Number),
              },
            }),
          ]),
        },
      });
    });
  });

  describe(`GET - ${baseUrl}/{adminId}`, () => {
    test("should fail if no authorization header is passed", async () => {
      const res = await request(server).get(`${baseUrl}/123rrtt`);

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

      const adminRes = await request(server)
        .get(`${baseUrl}/me`)
        .set("authorization", `bearer ${token}`);

      const res = await request(server)
        .get(baseUrl + "/" + adminRes.body.data.adminId)
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        success: true,
        data: expect.objectContaining({
          adminId: user.uid,
          departments: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        }),
      });
    });
  });

  describe(`Update Admin - PUT - ${baseUrl}/{adminId}`, () => {
    const updateData = {
      ...SkynedUtils.exclude(admin, ["adminId"]),
      primaryImage: primaryImageDataUri,
      phoneNumber: "+2348136239706",
      jobTitle: "CTO",
      socials: [
        {
          name: "facebook",
          url: "https://www.facebook.com",
        },
      ],
      departments: [{ id: 6, name: department.Human_Resource }],
    };

    test("should fail if not an authorized user", async () => {
      const res = await request(server)
        .put(baseUrl + "/wwwooe")
        .send(updateData);

      expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    test("should fail if input data is not valid", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .put(baseUrl + "/" + user.uid)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...SkynedUtils.exclude(updateData, ["firstName", "email"]),
        });

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test("should fail if updating with email that's not @skynedconsults.com", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const res = await request(server)
        .put(baseUrl + "/" + user.uid)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...updateData,
          email: "bobslegend795@gmail.com",
        });

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test("should fail if updating with already existing email", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      await request(server)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...updateData,
          email: "debra@skynedconsults.com",
        });

      const res = await request(server)
        .put(baseUrl + "/" + user.uid)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...updateData,
          email: "debra@skynedconsults.com",
        });

      expect(res.status).toBe(StatusCodes.CONFLICT);
    });

    test("should update an admin", async () => {
      const { user } = await signInUser();
      const token = await user.getIdToken();

      const beforeAdminRes = await request(server)
        .get(baseUrl + "/" + user.uid)
        .set("authorization", `bearer ${token}`);

      const res = await request(server)
        .put(baseUrl + "/" + user.uid)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...updateData,
          firstName: "John",
        });

      const afterAdminRes = await request(server)
        .get(baseUrl + "/" + user.uid)
        .set("authorization", `bearer ${token}`);

      expect(res.status).toBe(StatusCodes.OK);
      expect(beforeAdminRes.body.data.adminId).toBe(
        afterAdminRes.body.data.adminId,
      );
      expect(beforeAdminRes.body.data.firstName).not.toBe(
        afterAdminRes.body.data.firstName,
      );
    });
  });

  describe("Admin Account Actions", () => {
    describe("Suspend Account", () => {
      test("should fail if not an authorized user", async () => {
        const res = await request(server).patch(baseUrl + "/wwwooe/deactivate");
        expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      });

      test("should suspend admin account", async () => {
        const { user } = await signInUser(
          "tobi@skynedconsults.com",
          "12345678",
        );

        const { user: authUser } = await signInUser();
        const token = await authUser.getIdToken();

        const beforeAdminRes = await request(server)
          .get(baseUrl + "/" + user.uid)
          .set("authorization", `bearer ${token}`);

        expect(beforeAdminRes.body.data.accountSuspended).toBe(false);

        await request(server)
          .patch(baseUrl + "/" + user.uid + "/deactivate")
          .set("authorization", `bearer ${token}`);

        const afterAdminRes = await request(server)
          .get(baseUrl + "/" + user.uid)
          .set("authorization", `bearer ${token}`);

        expect(afterAdminRes.body.data.accountSuspended).toBe(true);
      });
    });

    describe("Release Account", () => {
      test("should fail if not an authorized user", async () => {
        const res = await request(server).patch(baseUrl + "/wwwooe/activate");
        expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      });

      test("should release admin account", async () => {
        const { user } = await signInUser(
          "tobi@skynedconsults.com",
          "12345678",
        );

        const { user: authUser } = await signInUser();
        const token = await authUser.getIdToken();

        const beforeAdminRes = await request(server)
          .get(baseUrl + "/" + user.uid)
          .set("authorization", `bearer ${token}`);

        expect(beforeAdminRes.body.data.accountSuspended).toBe(true);

        await request(server)
          .patch(baseUrl + "/" + user.uid + "/activate")
          .set("authorization", `bearer ${token}`);

        const afterAdminRes = await request(server)
          .get(baseUrl + "/" + user.uid)
          .set("authorization", `bearer ${token}`);

        expect(afterAdminRes.body.data.accountSuspended).toBe(false);
      });
    });
  });
});
