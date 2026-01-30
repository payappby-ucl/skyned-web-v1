import { BlogPostController, blogPostController } from ".";

describe("blogPostController", () => {
  describe("Instance", () => {
    test("should be an instance of BlogPostController", () => {
      expect(blogPostController).toBeInstanceOf(BlogPostController);
    });
  });
});
