import { StatusCodes } from "http-status-codes";
import { InquiryService, inquiryService } from ".";
import { phoneNumberService } from "../phone-number";

describe("InquiryService", () => {
  test("should be an instance of InquiryService", () => {
    expect(inquiryService).toBeInstanceOf(InquiryService);
  });

  describe("methods", () => {
    const testData = {
      name: "Alabi Emmanuel",
      email: "bobslegend795@gmail.com",
      phoneNumber: phoneNumberService.formatPhoneNumber("+2348136239706"),
      subject: "Test Subject",
      message: "Test Message",
    };

    describe("create", () => {
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
        const data = await inquiryService.create(testData);
        expect(data).toEqual(expect.objectContaining(testData));
      });
    });

    describe("count", () => {
      test("should return inquiry count", async () => {
        const count = await inquiryService.count();
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("findMany", () => {
      test("should return with array length of one", async () => {
        const inquiries = await inquiryService.findMany();
        expect(inquiries.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("findById", () => {
      test("should fail if passed invalid id type", async () => {
        try {
          await inquiryService.findById("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const inquiry = await inquiryService.create(testData);
        const findInquiry = await inquiryService.findById(inquiry.id);
        expect(findInquiry).not.toBeNull();
        expect(inquiry.id).toBe(findInquiry?.id);
        expect(findInquiry).toEqual(expect.objectContaining(testData));
      });
    });

    describe("delete", () => {
      test("should fail if passed invalid id type", async () => {
        try {
          await inquiryService.delete("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const inquiry = await inquiryService.create(testData);
        const deletedInquiry = await inquiryService.delete(inquiry.id);
        const findDeletedInquiry = await inquiryService.findById(inquiry.id);

        expect(deletedInquiry).not.toBeNull();
        expect(inquiry.id).toBe(deletedInquiry?.id);
        expect(deletedInquiry).toEqual(expect.objectContaining(testData));
        expect(findDeletedInquiry).toBeNull();
      });
    });
  });
});
