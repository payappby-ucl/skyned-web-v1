import { StatusCodes } from "http-status-codes";
import { TagService, tagService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { blogPostData } from "../../../data";
import { blogPostService } from "../blog-post";
import { idGeneratorService } from "../id-generator";

describe("tagService", () => {
  describe("instance", () => {
    test("should be an instance of TagService", () => {
      expect(tagService).toBeInstanceOf(TagService);
    });
  });

  describe("Methods", () => {
    let adminId = "";
    let tagId = 0;

    describe("deleteTag", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await tagService.deleteTag(-12.544);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const userAuth = await signInUser();
        adminId = userAuth.user.uid;

        const blogPost = await blogPostService.createBlogPost({
          ...blogPostData,
          title: "Tag Test",
          slug: "tag-test",
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

        const tag = await tagService.deleteTag(blogPost.tags[0].id);
        expect(tag).not.toBeNull();
      });
    });

    describe("deleteTags", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await tagService.deleteTags([-13]);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const blogPost = await blogPostService.createBlogPost({
          ...blogPostData,
          title: "Tags Test",
          slug: "tags-test",
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

        const tag = await tagService.deleteTags(blogPost.tags.map((c) => c.id));
        expect(tag).not.toBeNull();
      });
    });

    describe("count", () => {
      test("should count tags", async () => {
        const post = await blogPostService.createBlogPost({
          ...blogPostData,
          title: "Tags Test Count",
          slug: "tags-test-count",
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

        tagId = post.tags[0].id;

        const count = await tagService.count({});
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("findTags", () => {
      test("should return a list of tags", async () => {
        const tags = await tagService.findTags({});

        expect(tags).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("getAllTags", () => {
      test("should return a list of tags", async () => {
        const tags = await tagService.getAllTags();

        expect(tags).toEqual(
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
          await tagService.deleteTag(-10);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should pass", async () => {
        const tag = await tagService.findById(tagId);
        expect(tag).not.toBeNull();
      });
    });
  });
});
