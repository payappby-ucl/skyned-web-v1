/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { CommonSchema } from "@workspace/shared";
import { ValidationUtility, validationUtility } from ".";
import { Exception } from "../../lib";

describe("ValidationUtility", () => {
  describe("instance", () => {
    test("should be an instance of ValidationUtility", () => {
      expect(validationUtility).toBeInstanceOf(ValidationUtility);
    });
  });

  describe("Methods", () => {
    describe("validateInput", () => {
      const schema = CommonSchema.pick({ email: true });

      test("should throw Exception if invalid input is passed", () => {
        expect(() => {
          validationUtility.validateInput({
            schema,
            inputData: {
              email: "",
            },
          });
        }).toThrow(Exception);
      });

      test("should throw error if an invalid email is inputted", () => {
        expect(() => {
          validationUtility.validateInput({
            schema,
            inputData: {
              email: "bobslegend795",
            },
          });
        }).toThrow(Exception);
      });

      test(`should throw exception with status code ${StatusCodes.INTERNAL_SERVER_ERROR} when no errorType or 'server' errorType is passed`, () => {
        try {
          validationUtility.validateInput({
            schema,
            inputData: {
              email: "bobslegend795",
            },
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        try {
          validationUtility.validateInput({
            schema,
            inputData: {
              email: "bobslegend79",
              errorType: "server",
            },
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test(`should throw exception with status code ${StatusCodes.BAD_REQUEST} when 'client' errorType is passed`, () => {
        try {
          validationUtility.validateInput({
            schema,
            inputData: {
              email: "bobslegend795",
              errorType: "client",
            },
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        }
      });

      test("should throw exception with with custom error message", () => {
        try {
          validationUtility.validateInput({
            schema,
            inputData: {
              email: "bobslegend795",
              errorType: "client",
              message: "Invalid Input",
            },
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST);
          expect(error.message).toEqual("Invalid Input");
        }
      });

      test("should pass", () => {
        const { email } = validationUtility.validateInput({
          schema,
          inputData: {
            email: "Bobslegend795@gmail.com",
          },
        });

        expect(email).toBe("bobslegend795@gmail.com");

        expect(() => {
          validationUtility.validateInput({
            schema,
            inputData: {
              email: "bobslegend795@gmail.com",
            },
          });
        }).not.toThrow();
      });
    });
  });
});
