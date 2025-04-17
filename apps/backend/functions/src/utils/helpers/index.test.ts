/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { SkynedUtils } from ".";
import { Exception } from "../../lib";

describe("SkynedUtils", () => {
  describe("createException", () => {
    const message = "Working";
    const error = SkynedUtils.createException(StatusCodes.OK, message);

    test("should have a status code key", () => {
      const objectKeys = Object.keys(error);
      expect(objectKeys).toContain("statusCode");
    });

    test(`should have a status code ${StatusCodes.OK}`, () => {
      expect(error.statusCode).toBe(StatusCodes.OK);
    });

    test(`should have a message: ${message}`, () => {
      expect(error.message).toBe(message);
    });

    test("should throw an error", () => {
      expect(() => {
        SkynedUtils.createException(undefined as never as StatusCodes);
      }).toThrow(Exception);
    });
  });

  describe("pick", () => {
    const data = {
      firstName: "Emmanuel",
      lastName: "Alabi",
    };

    describe("Exceptions", () => {
      test("should throw exception if when an empty array is passed as values", () => {
        expect(() => {
          SkynedUtils.pick(data, []);
        }).toThrow(Exception);
      });

      test("should throw exception if no data", () => {
        expect(() => {
          SkynedUtils.pick(undefined as never as object, []);
        }).toThrow(Exception);
      });

      test("should throw exception if values is undefined", () => {
        expect(() => {
          SkynedUtils.pick(data, undefined as never as (keyof typeof data)[]);
        }).toThrow(Exception);
      });

      test("should throw an exception if an empty object is passed.", () => {
        expect(() => {
          SkynedUtils.pick({}, []);
        }).toThrow(Exception);
      });
    });

    test("should have only firstName when picked", () => {
      const pickedData = SkynedUtils.pick(data, ["firstName"]);
      expect(pickedData.firstName).toBe("Emmanuel");
      expect((pickedData as typeof data).lastName).toBe(undefined);
    });
  });

  describe("exclude", () => {
    const data = {
      firstName: "Emmanuel",
      lastName: "Alabi",
    };

    describe("Exceptions", () => {
      test("should throw exception if when an empty array is passed as values", () => {
        expect(() => {
          SkynedUtils.exclude(data, []);
        }).toThrow(Exception);
      });

      test("should throw exception if no data", () => {
        expect(() => {
          SkynedUtils.exclude(undefined as never as object, []);
        }).toThrow(Exception);
      });

      test("should throw exception if values is undefined", () => {
        expect(() => {
          SkynedUtils.exclude(
            data,
            undefined as never as (keyof typeof data)[],
          );
        }).toThrow(Exception);
      });

      test("should throw an exception if an empty object is passed.", () => {
        expect(() => {
          SkynedUtils.exclude({}, []);
        }).toThrow(Exception);
      });
    });

    test("should have only lastName when firstName is excluded", () => {
      const pickedData = SkynedUtils.exclude(data, ["firstName"]);
      expect(pickedData.lastName).toBe("Alabi");
      expect((pickedData as typeof data).firstName).toBe(undefined);
    });
  });

  describe("isEnvironment", () => {
    test("should return false if passed dev", () => {
      const isDev = SkynedUtils.isEnvironment(["dev"]);
      expect(isDev).toBe(false);
    });

    test("should return false if passed test", () => {
      const isTest = SkynedUtils.isEnvironment(["test"]);
      expect(isTest).toBe(true);
    });
  });
});
