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
    describe("create", () => {
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
              overview: expect.any(String),
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
              overview: expect.any(String),
              active: true,
            }),
          ]),
        );
      });
    });

    describe("update", () => {
      test("should pass", async () => {
        const scholarship = await scholarshipService.update(
          scholarshipData.slug,
          {
            overview: "New Overview",
          },
        );

        expect(scholarship).not.toBeNull();
        expect(scholarship.overview).toBe("New Overview");
      });
    });

    describe("getSummary", () => {
      test("should pass", async () => {
        const summary = await scholarshipService.getSummary();

        expect(summary).not.toBeNull();
        expect(summary).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              category: expect.any(String),
              _count: {
                _all: expect.any(Number),
              },
            }),
          ]),
        );
      });
    });

    describe("delete", () => {
      test("should pass", async () => {
        await scholarshipService.delete(scholarshipData.slug);

        const scholarship = await scholarshipService.findBySlug(
          scholarshipData.slug,
        );

        expect(scholarship).toBeNull();
      });
    });
  });
});
