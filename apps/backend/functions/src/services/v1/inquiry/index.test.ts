import { StatusCodes } from "http-status-codes";
import { InquiryService, inquiryService } from ".";
import { phoneNumberService } from "../phone-number";
import { repository } from "../../../infrastructure";

describe("InquiryService", () => {
  test("should be an instance of InquiryService", () => {
    expect(inquiryService).toBeInstanceOf(InquiryService);
  });

  describe("methods", () => {
    describe("create", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      const testData = {
        name: "Alabi Emmanuel",
        email: "bobslegend795@gmail.com",
        phoneNumber: phoneNumberService.formatPhoneNumber("+2348136239706"),
        subject: "Test Subject",
        message: "Test Message",
      };

      test("should throw a server error if given invalid data", async () => {
        try {
          await inquiryService.create({
            ...testData,
            phoneNumber: "1223" as unknown as ReturnType<
              typeof phoneNumberService.formatPhoneNumber
            >,
          });
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create data", async () => {
        const spy = jest
          .spyOn(repository.inquiry, "create")
          .mockImplementation(async () => ({
            ...testData,
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));

        const data = await repository.inquiry.create(testData);
        expect(spy).toHaveBeenCalled();
        expect(data).toEqual(expect.objectContaining(testData));
      });
    });
  });
});
