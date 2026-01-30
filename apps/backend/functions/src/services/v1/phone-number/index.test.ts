import { PhoneNumberService, phoneNumberService } from ".";
import { Exception } from "../../../lib";

describe("PhoneNumberService", () => {
  describe("Instance", () => {
    expect(phoneNumberService).toBeInstanceOf(PhoneNumberService);
  });

  describe("Methods", () => {
    const number = "+2348136239706";
    const countryCode = "NG";
    describe("isValidPhoneNumber", () => {
      test("should through an error with invalid phone number", () => {
        try {
          phoneNumberService.formatPhoneNumber("11");
        } catch (error) {
          expect(error).toBeInstanceOf(Exception);
        }
      });

      test("should pass", () => {
        expect(phoneNumberService.isValidPhoneNumber(number)).toBe(true);
      });
    });

    describe("formatPhoneNumber", () => {
      test("should through an error with invalid phone number", () => {
        try {
          phoneNumberService.formatPhoneNumber("11");
        } catch (error) {
          expect(error).toBeInstanceOf(Exception);
        }
      });

      test("should pass", () => {
        const phoneNumber = phoneNumberService.formatPhoneNumber(number);

        expect(phoneNumber).toEqual(
          expect.objectContaining({
            nationalNumber: expect.any(String),
            number: number,
            country: countryCode,
          }),
        );
      });
    });
  });
});
