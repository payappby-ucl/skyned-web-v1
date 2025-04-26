import { StatusCodes } from "http-status-codes";
import { InquiryService, inquiryService } from ".";
import { phoneNumberService } from "../phone-number";
import { repository } from "../../../infrastructure";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "../../../../__tests__/helpers/constants";
import { admin } from "../../../data";

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

        const data = await inquiryService.create(testData);
        expect(spy).toHaveBeenCalled();
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
        const { user } = await signInWithEmailAndPassword(
          clientAuth,
          admin.email,
          "12345678",
        );

        const signedUser = await repository.admin.findAdminByAdminId(user.uid);
        if (signedUser) {
          const inquiries = await inquiryService.findMany(signedUser);
          expect(inquiries.length).toBeGreaterThanOrEqual(1);
        }
      });
    });
  });
});
