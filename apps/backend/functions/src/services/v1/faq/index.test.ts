import { StatusCodes } from "http-status-codes";
import { FaqService, faqService } from ".";
import { SkynedUtils } from "../../../utils";

describe("FaqService", () => {
  describe("Instance", () => {
    test("should be an instance of FaqService", () => {
      expect(faqService).toBeInstanceOf(FaqService);
    });
  });

  describe("Methods", () => {
    describe("create", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });

      test("should fail if invalid/incorrect input is passed", async () => {
        try {
          await faqService.create({
            question: "What's my name",
          } as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create FAQ", async () => {
        const data = {
          id: 1,
          question: "What's my name",
          answer: "<p>Alabi Emmanuel</p>",
          createdById: "wweerrr",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const spy = jest
          .spyOn(faqService, "create")
          .mockImplementation(async () => data);

        const faq = await faqService.create({
          ...SkynedUtils.pick(data, ["answer", "question", "createdById"]),
        });

        expect(faq).not.toBeNull();
        expect(spy).toHaveBeenCalled();
        expect(faq).toBe(data);
      });
    });
  });
});
