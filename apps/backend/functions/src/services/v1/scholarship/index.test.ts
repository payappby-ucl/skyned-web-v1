import { ScholarshipService, scholarshipService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { scholarshipData } from "../../../data";

describe("scholarshipService", () => {
  describe("instance", () => {
    test("should be an instance of ScholarshipService", () => {
      expect(scholarshipService).toBeInstanceOf(ScholarshipService);
    });
  });

  describe("Methods", () => {
    describe("findBySlug", () => {
      test("should pass", async () => {
        const userAuth = await signInUser();

        const scholarship = await scholarshipService.create(
          {
            ...scholarshipData,
            banner: {
              path: "/user/me",
              url: "https://www.google.com",
              mimeType: "image/png",
            },
          },
          {
            user: {
              adminId: userAuth.user.uid,
            } as any,
            claim: "admin",
          },
        );

        expect(scholarship).not.toBeNull();
        expect(scholarship.slug).toBe(scholarshipData.slug);
      });
    });

    describe("findBySlug", () => {
      test("should return null if not found", async () => {
        const scholarship =
          await scholarshipService.findBySlug("any-scholarship");

        expect(scholarship).toBeNull();
      });

      test("should pass", async () => {
        const scholarship = await scholarshipService.findBySlug(
          scholarshipData.slug,
        );

        expect(scholarship).not.toBeNull();
      });
    });
  });
});
