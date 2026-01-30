import { BlogPostRouter, blogRouter } from ".";

describe("blogRouter", () => {
  test("should be an instance of BlogPostRouter", () => {
    expect(blogRouter).toBeInstanceOf(BlogPostRouter);
  });
});
