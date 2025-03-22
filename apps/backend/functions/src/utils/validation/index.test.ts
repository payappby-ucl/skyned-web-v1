/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { ValidationUtility, validationUtility } from ".";
import { Exception } from "../../lib";

describe("ValidationUtility", () => {
  describe("instance", () => {
    test("should be an instance of ValidationUtility", () => {
      expect(validationUtility).toBeInstanceOf(ValidationUtility);
    });
  });

  describe("Methods", () => {
    describe("validateEmail", () => {
      test("should throw Exception if no email is inputted", () => {
        expect(() => {
          validationUtility.validateEmail({ email: "" });
        }).toThrow(Exception);
      });

      test("should throw error if an invalid email is inputted", () => {
        expect(() => {
          validationUtility.validateEmail({ email: "bobslegend795" });
        }).toThrow(Exception);
      });

      test(`should throw exception with status code ${StatusCodes.INTERNAL_SERVER_ERROR} when no errorType or 'server' errorType is passed`, () => {
        try {
          validationUtility.validateEmail({ email: "bobslegend795" });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        try {
          validationUtility.validateEmail({
            email: "bobslegend79",
            errorType: "server",
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test(`should throw exception with status code ${StatusCodes.BAD_REQUEST} when 'client' errorType is passed`, () => {
        try {
          validationUtility.validateEmail({
            email: "bobslegend795",
            errorType: "client",
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        }
      });

      test("should throw exception with with custom error message", () => {
        try {
          validationUtility.validateEmail({
            email: "bobslegend795",
            errorType: "client",
            message: "Invalid Input",
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST);
          expect(error.message).toEqual("Invalid Input");
        }
      });

      test("should pass", () => {
        expect(() => {
          validationUtility.validateEmail({ email: "bobslegend795@gmail.com" });
        }).not.toThrow();
      });
    });

    describe("validateTokenId", () => {
      test("should throw Exception if tokenId is falsy", () => {
        expect(() => {
          validationUtility.validateTokenId("");
        }).toThrow(Exception);
      });

      test("should throw error if tokenId is not a string", () => {
        expect(() => {
          validationUtility.validateTokenId({} as unknown as string);
        }).toThrow(Exception);
      });
    });
  });
});
