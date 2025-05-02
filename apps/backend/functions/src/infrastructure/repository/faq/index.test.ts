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
  });
});
