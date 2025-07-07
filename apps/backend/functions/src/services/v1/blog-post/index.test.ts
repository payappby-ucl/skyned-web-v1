import { StatusCodes } from "http-status-codes";
import { BlogPostService, blogPostService } from ".";
import { signInUser } from "../../../../__tests__/helpers/utils";
import { blogPostData } from "../../../data";
import { idGeneratorService } from "../id-generator";
import { AuthClaim } from "@workspace/shared";

describe("blogPostService", () => {
  describe("Instance", () => {
    test("should be an instance of {BlogPostService}", () => {
      expect(blogPostService).toBeInstanceOf(BlogPostService);
    });
  });

  describe("Methods", () => {
    let adminId = "";

    describe("createBlogPost", () => {
      test("should fail if passed invalid data", async () => {
        try {
          await blogPostService.createBlogPost({} as any);
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create a blog post", async () => {
        const userAuth = await signInUser();
        adminId = userAuth.user.uid;

        const blogPost = await blogPostService.createBlogPost({
          ...blogPostData,
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

        expect(blogPost).not.toBeNull();
        expect(blogPost.slug).toBe(blogPostData.slug);
      });
    });

    describe("findBlogPostBySlug", () => {
      test("should fail if slug is not passed in", async () => {
        try {
          await blogPostService.findBlogPostBySlug("");
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should return blog post", async () => {
        const post = await blogPostService.findBlogPostBySlug(
          blogPostData.slug,
        );

        expect(post).not.toBeNull();
      });
    });

    describe("count", () => {
      test("should count posts", async () => {
        const count = await blogPostService.count({});
        expect(count).toEqual(expect.any(Number));
      });
    });

    describe("findBlogPosts", () => {
      test("should return a list of posts", async () => {
        const posts = await blogPostService.findBlogPosts({});

        expect(posts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              slug: expect.any(String),
              title: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe("updateBlogPost", () => {
      test("should fail if invalid data is passed", async () => {
        try {
          await blogPostService.updateBlogPost(2, "", {
            title: "Blog Post Service Update",
          });
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should update a post", async () => {
        const post = await blogPostService.findBlogPostBySlug(
          blogPostData.slug,
          { claim: "admin" } as AuthClaim,
        );

        if (!post) throw new Error("Post not found");

        const updatePost = await blogPostService.updateBlogPost(
          post.id,
          adminId,
          {
            title: "Blog Post Service Update",
          },
        );

        expect(updatePost.id).toBe(post.id);
        expect(updatePost.title).not.toBe(post.title);
      });
    });

    describe("deleteBlogPost", () => {
      test("should fail if slug is not passed in", async () => {
        try {
          await blogPostService.deleteBlogPost("");
        } catch (error: any) {
          expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should delete a post", async () => {
        await blogPostService.deleteBlogPost(blogPostData.slug);

        const post = await blogPostService.findBlogPostBySlug(
          blogPostData.slug,
        );

        expect(post).toBeNull();
      });
    });
  });
});
