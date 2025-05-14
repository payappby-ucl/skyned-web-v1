/* eslint-disable max-len */
import { getAuth, UserRecord } from "firebase-admin/auth";
import { Auth, auth } from ".";
import { StatusCodes } from "http-status-codes";
import { admin } from "../../data";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "../../../__tests__/helpers/constants";

describe("Auth Infrastructure", () => {
  describe("Instance", () => {
    test("should be instance of Auth", () => {
      expect(auth).toBeInstanceOf(Auth);
    });
  });

  describe("Methods", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    describe("findUserByEmail", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      const record = {
        email: "bobslegend795@gmail.com",
        id: "12345",
      };

      test("should throw error if email is not passed", async () => {
        try {
          await auth.findUserByEmail("");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should throw error if email is not valid", async () => {
        try {
          await auth.findUserByEmail("12345");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should throw error if auth works but the returned email is undefined", async () => {
        const spy = jest.spyOn(getAuth(), "getUserByEmail").mockImplementation(
          async () =>
            ({
              uid: record.id,
              email: undefined,
            }) as UserRecord,
        );

        try {
          await auth.findUserByEmail(record.email);
        } catch (error: any) {
          expect(spy).toHaveBeenCalled();
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const spy = jest.spyOn(getAuth(), "getUserByEmail").mockImplementation(
          async () =>
            ({
              uid: record.id,
              email: record.email,
            }) as UserRecord,
        );

        const userRecord = await auth.findUserByEmail(record.email);
        expect(spy).toHaveBeenCalled();
        expect(userRecord).toEqual(record);
      });
    });

    describe("exists", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      const record = {
        email: "bobslegend795@gmail.com",
        id: "12345",
      };

      test("should throw error if email is not passed", async () => {
        try {
          await auth.exists("");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should throw error if email is not valid", async () => {
        try {
          await auth.exists("12345");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should throw error if auth works but the returned email is undefined", async () => {
        const spy = jest.spyOn(getAuth(), "getUserByEmail").mockImplementation(
          async () =>
            ({
              uid: record.id,
              email: undefined,
            }) as UserRecord,
        );

        try {
          await auth.exists(record.email);
        } catch (error: any) {
          expect(spy).toHaveBeenCalled();
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should return true", async () => {
        const spy = jest.spyOn(getAuth(), "getUserByEmail").mockImplementation(
          async () =>
            ({
              uid: record.id,
              email: record.email,
            }) as UserRecord,
        );

        const exists = await auth.exists(record.email);
        expect(spy).toHaveBeenCalled();
        expect(exists).toBeTruthy();
      });
    });

    describe("createAuth", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      const record = {
        email: "bobslegend795@gmail.com",
        password: "12345678",
      };

      test("should throw error if invalid input is passed", async () => {
        try {
          await auth.createAuth(
            {
              email: "bobslegend795@gmail.com",
              password: "123",
            },
            "admin",
          );
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should throw error if invalid claim is passed", async () => {
        try {
          await auth.createAuth(
            {
              email: "bobslegend795@gmail.com",
              password: "123ahjdjd34",
            },
            "partner" as any,
          );
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const spy = jest.spyOn(getAuth(), "createUser").mockImplementation(
          async () =>
            ({
              uid: "12345678",
              email: record.email,
            }) as UserRecord,
        );

        const setCustomClaimSpy = jest
          .spyOn(getAuth(), "setCustomUserClaims")
          .mockImplementation();

        const userId = await auth.createAuth(record, "admin");
        expect(spy).toHaveBeenCalled();
        expect(setCustomClaimSpy).toHaveBeenCalled();
        expect(userId).toBe("12345678");
      });
    });

    describe("updateAuth", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      const record = {
        email: "bobslegend795@gmail.com",
        password: "12345678",
      };

      test("should throw error if invalid input is passed", async () => {
        try {
          await auth.updateAuth({} as any, {
            email: "bobslegend795@gmail.com",
            password: "123",
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const spy = jest.spyOn(getAuth(), "updateUser").mockImplementation();

        await auth.updateAuth("233dd", record);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("verifyIdToken", () => {
      beforeAll(() => {
        jest.restoreAllMocks();
      });

      test("should fail if invalid data is passed", async () => {
        try {
          await auth.verifyIdToken({ token: {} as any });
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should be null if non existing userid is passed", async () => {
        const authUser = await auth.verifyIdToken({
          token: "yrrhfffkvkvkkvvnvnn",
        });

        expect(authUser).toBeNull();
      });

      test("should return a token", async () => {
        const { user } = await signInWithEmailAndPassword(
          clientAuth,
          admin.email,
          "12345678",
        );

        const token = await user.getIdToken();

        const authUser = await auth.verifyIdToken({
          token: token || "",
        });
        expect(authUser).not.toBeNull();
        expect(authUser?.claim).toBe("admin");
        expect(authUser?.id).toBe(user.uid);
      });
    });
  });
});
