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
      test("should return list of programs with limited data for unauthenticated auth user", async () => {
        const programs = await programService.listPrograms({});
        expect(programs).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              school: expect.objectContaining({
                name: expect.any(String),
                slug: expect.any(String),
                currency: expect.any(String),
              }),
            }),
          ]),
        );
      });

      test("should return list of programs with limited data for auth user (not admin)", async () => {
        const programs = await programService.listPrograms({}, {
          claim: "student",
        } as any);
        expect(programs).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              school: expect.objectContaining({
                name: expect.any(String),
                slug: expect.any(String),
                currency: expect.any(String),
              }),
              description: expect.any(String),
            }),
          ]),
        );
      });

      test("should return list of programs with limited data for auth user (admin)", async () => {
        const programs = await programService.listPrograms({}, {
          claim: "admin",
        } as any);

        expect(programs).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              slug: expect.any(String),
              school: expect.objectContaining({
                name: expect.any(String),
                slug: expect.any(String),
                currency: expect.any(String),
              }),
              description: expect.any(String),
              schoolId: expect.any(String),
            }),
          ]),
        );
      });
    });
  });
});
