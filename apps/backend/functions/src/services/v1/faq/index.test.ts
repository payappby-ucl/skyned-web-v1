import { StatusCodes } from "http-status-codes";
import { FaqService, faqService } from ".";
import { SkynedUtils } from "../../../utils";
import { repository } from "../../../infrastructure";

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
          .spyOn(repository.faq, "create")
          .mockImplementation(async () => data);

        const faq = await faqService.create({
          ...SkynedUtils.pick(data, ["answer", "question", "createdById"]),
        });

        expect(faq).not.toBeNull();
        expect(spy).toHaveBeenCalled();
        expect(faq).toBe(data);
      });
    });

    describe("count", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });

      test("should return faq count", async () => {
        const spy = jest
          .spyOn(repository.faq, "count")
          .mockImplementation(async () => 1);

        const count = await faqService.count();
        expect(count).toEqual(expect.any(Number));
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("findMany", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });

      const data = {
        id: 1,
        question: "What's my name",
        answer: "<p>Alabi Emmanuel</p>",
        createdById: "wweerrr",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      test("should return with array length of one", async () => {
        const spy = jest
          .spyOn(repository.faq, "findMany")
          .mockImplementation(async () => [data]);

        const faqs = await faqService.findMany();
        expect(faqs.length).toBeGreaterThanOrEqual(1);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("findById", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });

      test("should fail if passed invalid id type", async () => {
        try {
          await faqService.findById("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const data = {
          id: 1,
          question: "What's my name",
          answer: "<p>Alabi Emmanuel</p>",
          createdById: "wweerrr",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const spy = jest
          .spyOn(repository.faq, "findById")
          .mockImplementation(async () => data);

        const findFaq = await faqService.findById(1);
        expect(findFaq).not.toBeNull();
        expect(findFaq).toEqual(expect.objectContaining(data));
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("delete", () => {
      test("should fail if passed invalid id type", async () => {
        try {
          await faqService.delete("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const data = {
          id: 1,
          question: "What's my name",
          answer: "<p>Alabi Emmanuel</p>",
          createdById: "wweerrr",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const spy = jest
          .spyOn(repository.faq, "delete")
          .mockImplementation(async () => data);

        const findByIdSpy = jest
          .spyOn(repository.faq, "findById")
          .mockImplementation(async () => null);

        const deletedFaq = await faqService.delete(data.id);
        const findDeletedFaq = await faqService.findById(data.id);

        expect(deletedFaq).not.toBeNull();
        expect(data.id).toBe(deletedFaq?.id);
        expect(deletedFaq).toEqual(expect.objectContaining(data));
        expect(findDeletedFaq).toBeNull();
        expect(spy).toHaveBeenCalled();
        expect(findByIdSpy).toHaveBeenCalled();
      });
    });
  });
});
