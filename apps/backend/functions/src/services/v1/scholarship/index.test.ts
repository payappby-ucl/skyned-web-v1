/* eslint-disable max-len */
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

    describe("count", () => {
      test("should count scholarships", async () => {
        const count = await scholarshipService.count({});
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("listScholarships", () => {
      test("should return list of scholarships with limited data users that are not admins", async () => {
        const scholarships = await scholarshipService.listScholarships({}, {
          claim: "student",
        } as any);

        expect(scholarships).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: expect.any(String),
              slug: expect.any(String),
              subtitle: expect.any(String),
              description: expect.any(String),
            }),
          ]),
        );

        expect(scholarships[0].active).toBeUndefined();
      });

      test("should return list of scholarships for admin", async () => {
        const scholarships = await scholarshipService.listScholarships({}, {
          claim: "admin",
        } as any);

        expect(scholarships).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: expect.any(String),
              slug: expect.any(String),
              subtitle: expect.any(String),
              description: expect.any(String),
              active: true,
            }),
          ]),
        );
      });
    });
  });
});
