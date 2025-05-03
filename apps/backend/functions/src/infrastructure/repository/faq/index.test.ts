import { StatusCodes } from "http-status-codes";
import { FaqRepository, repository } from "..";
import { signInUser } from "../../../../__tests__/helpers/utils";

describe("FaqRepository", () => {
  describe("Instance", () => {
    test("should be instance of FaqRepository", () => {
      expect(repository.faq).toBeInstanceOf(FaqRepository);
    });
  });

  describe("Methods", () => {
    const testData = {
      question: "What's my name",
      answer: "<p>Alabi Emmanuel</p>",
    };

    describe("create", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });

      test("should fail if invalid/incorrect input is passed", async () => {
        try {
          await repository.faq.create({
            question: "What's my name",
          } as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create FAQ", async () => {
        const { user } = await signInUser();
        const signedInAdmin = await repository.admin.findAdminByAdminId(
          user.uid,
        );

        const faq = await repository.faq.create({
          question: "What's my name",
          answer: "<p>Alabi Emmanuel</p>",
          createdById: signedInAdmin?.adminId || "",
        });

        expect(faq).not.toBeNull();
      });
    });

    describe("count", () => {
      test("should count faq", async () => {
        const count = await repository.faq.count();
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("findMany", () => {
      test("should return with array length", async () => {
        const faqs = await repository.faq.findMany();
        expect(faqs).toEqual(
          expect.arrayContaining([expect.objectContaining(testData)]),
        );
      });
    });

    describe("findById", () => {
      test("should fail if passed invalid id type", async () => {
        try {
          await repository.faq.findById("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const { user } = await signInUser();
        const signedInAdmin = await repository.admin.findAdminByAdminId(
          user.uid,
        );

        const faq = await repository.faq.create({
          question: "What's my name",
          answer: "<p>Alabi Emmanuel</p>",
          createdById: signedInAdmin?.adminId || "",
        });

        const findFaq = await repository.faq.findById(faq.id);
        expect(findFaq).not.toBeNull();
        expect(faq.id).toBe(findFaq?.id);
        expect(findFaq).toEqual(expect.objectContaining(testData));
      });
    });

    describe("delete", () => {
      test("should fail if passed invalid id type", async () => {
        try {
          await repository.faq.delete("ee" as never as number);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const { user } = await signInUser();
        const signedInAdmin = await repository.admin.findAdminByAdminId(
          user.uid,
        );

        const faq = await repository.faq.create({
          question: "What's my name",
          answer: "<p>Alabi Emmanuel</p>",
          createdById: signedInAdmin?.adminId || "",
        });

        const deletedFaq = await repository.faq.delete(faq.id);
        const findDeletedFaq = await repository.faq.findById(faq.id);

        expect(deletedFaq).not.toBeNull();
        expect(faq.id).toBe(deletedFaq?.id);
        expect(deletedFaq).toEqual(expect.objectContaining(testData));
        expect(findDeletedFaq).toBeNull();
      });
    });
  });
});
