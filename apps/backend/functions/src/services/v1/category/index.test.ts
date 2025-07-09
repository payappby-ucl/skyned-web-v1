import { StatusCodes } from "http-status-codes";
import { CategoryService, categoryService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { blogPostData } from "../../../data";
import { blogPostService } from "../blog-post";
import { idGeneratorService } from "../id-generator";

describe("categoryService", () => {
  describe("instance", () => {
    test("should be an instance of CategoryService", () => {
      expect(categoryService).toBeInstanceOf(CategoryService);
    });
  });

  describe("Methods", () => {
    let adminId = "";
    let categoryId = 0;

    describe("deleteCategory", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await categoryService.deleteCategory(-12.544);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const userAuth = await signInUser();
        adminId = userAuth.user.uid;

        const blogPost = await blogPostService.createBlogPost({
          ...blogPostData,
          title: "Category Test",
          slug: "category-test",
          authorId: adminId,
          blogPostId: idGeneratorService.id(),
          status: "published",
          publishedAt: new Date(),
          coverImage: {
            path: "/schools",
            url: "https://gogle.com",
            mimeType: "image/png",
          },

          categories: ["Canada"],
          tags: ["Canada"],
        });

        const category = await categoryService.deleteCategory(
          blogPost.categories[0].id,
        );
        expect(category).not.toBeNull();
      });
    });

    describe("deleteCategories", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await categoryService.deleteCategories([-13]);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const blogPost = await blogPostService.createBlogPost({
          ...blogPostData,
          title: "Categories Test",
          slug: "categories-test",
          authorId: adminId,
          blogPostId: idGeneratorService.id(),
          status: "published",
          publishedAt: new Date(),
          coverImage: {
            path: "/schools",
            url: "https://gogle.com",
            mimeType: "image/png",
          },

          categories: ["Canada"],
          tags: ["Canada"],
        });

        const category = await categoryService.deleteCategories(
          blogPost.categories.map((c) => c.id),
        );
        expect(category).not.toBeNull();
      });
    });

    describe("count", () => {
      test("should count categories", async () => {
        const post = await blogPostService.createBlogPost({
          ...blogPostData,
          title: "Categories Test Count",
          slug: "categories-test-count",
          authorId: adminId,
          blogPostId: idGeneratorService.id(),
          status: "published",
          publishedAt: new Date(),
          coverImage: {
            path: "/schools",
            url: "https://gogle.com",
            mimeType: "image/png",
          },

          categories: ["Canada"],
          tags: ["Canada"],
        });

        categoryId = post.categories[0].id;

        const count = await categoryService.count({});
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("findCategories", () => {
      test("should return a list of categories", async () => {
        const categories = await categoryService.findCategories({});

        expect(categories).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("getAllCategories", () => {
      test("should return a list of posts", async () => {
        const categories = await categoryService.getAllCategories();

        expect(categories).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("findById", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await categoryService.deleteCategory(-10);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const category = await categoryService.findById(categoryId);
        expect(category).not.toBeNull();
      });
    });
  });
});
