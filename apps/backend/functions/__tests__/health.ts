/* eslint-disable max-len */
import * as admin from "firebase-admin";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { responseBody } from "./helpers/constants";
import { app } from "../src/app";
import {
  FIRESTORE_EMULATOR_HOST,
  FIREBASE_STORAGE_EMULATOR_HOST,
} from "../src/lib";
import serviceAccount from "../src/test-service-account.json";
import { getFirestore } from "firebase-admin/firestore";

describe("Health Check API", () => {
  describe("GET - /health", () => {
    beforeAll(() => {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
        storageBucket: "skyned-test-31a2e.firebasestorage.app",
        projectId: "skyned-test-31a2e",
      });

      process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
      process.env.FIREBASE_STORAGE_EMULATOR_HOST =
        FIREBASE_STORAGE_EMULATOR_HOST;
    });

    afterAll(async () => {
      await getFirestore().recursiveDelete(getFirestore().collection("test"));
    });

    test(`should respond with JSON and status code of ${StatusCodes.OK} status code`, async () => {
      const res = await request(app.getApp()).get("/health");

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body).toEqual({
        ...responseBody,
        data: {
          message: "Skyned Server is healthy.",
        },
      });
    });

    test("should work", async () => {
      const res = await request(app.getApp()).get("/api/v1/test");
      expect(res.status).toBe(200);
    });
  });
});
