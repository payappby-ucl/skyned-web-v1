import { StatusCodes } from "http-status-codes";
import { InquiryRepository } from ".";
import { repository } from "..";
import { phoneNumberService } from "../../../services";

describe("InquiryRepository", () => {
  describe("Instance", () => {
    expect(repository.inquiry).toBeInstanceOf(InquiryRepository);
  });

  describe("Methods", () => {
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
          await repository.inquiry.create({
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
        const data = await repository.inquiry.create(testData);
        expect(data).toEqual(expect.objectContaining(testData));
      });
    });

    describe("count", () => {
      test("should count", async () => {
        const count = await repository.inquiry.count();
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("findMany", () => {
      test("should return with array length of one", async () => {
        const inquiries = await repository.inquiry.findMany();
        expect(inquiries).toEqual(
          expect.arrayContaining([expect.objectContaining(testData)]),
        );
      });
    });

    describe("findById", () => {
      test("should fail if passed invalid id type", async () => {
        try {
          await repository.inquiry.findById("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const inquiry = await repository.inquiry.create(testData);
        const findInquiry = await repository.inquiry.findById(inquiry.id);
        expect(findInquiry).not.toBeNull();
        expect(inquiry.id).toBe(findInquiry?.id);
        expect(findInquiry).toEqual(expect.objectContaining(testData));
      });
    });

    describe("delete", () => {
      test("should fail if passed invalid id type", async () => {
        try {
          await repository.inquiry.delete("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const inquiry = await repository.inquiry.create(testData);
        const deletedInquiry = await repository.inquiry.delete(inquiry.id);
        const findDeletedInquiry = await repository.inquiry.findById(
          inquiry.id,
        );

        expect(deletedInquiry).not.toBeNull();
        expect(inquiry.id).toBe(deletedInquiry?.id);
        expect(deletedInquiry).toEqual(expect.objectContaining(testData));
        expect(findDeletedInquiry).toBeNull();
      });
    });
  });
});
