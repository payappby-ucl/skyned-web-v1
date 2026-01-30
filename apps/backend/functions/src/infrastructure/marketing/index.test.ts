import { StatusCodes } from "http-status-codes";
import { Marketing, marketing } from ".";

describe("Marketing Infrastructure", () => {
  describe("Marketing Instance", () => {
    test("should be an instance of Marketing", () => {
      expect(marketing).toBeInstanceOf(Marketing);
    });
  });

  describe("Methods", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    describe("createContact", () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should fail given invalid input", async () => {
        try {
          await marketing.createContact({ email: "john" });
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const spy = jest
          .spyOn(marketing.client, "post")
          .mockImplementation(async () => ({
            data: {
              id: 1,
            },
          }));
        await marketing.createContact({ email: "bobslegend795@gmail.com" });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("addContactToAudience", () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      test("should fail given invalid input", async () => {
        try {
          await marketing.addContactToAudience({} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const spy = jest.spyOn(marketing.client, "post").mockImplementation();
        await marketing.addContactToAudience({
          contactId: 1234,
          audienceId: "abddod",
        });
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
