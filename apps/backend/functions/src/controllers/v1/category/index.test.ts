import { categoryController, CategoryController } from ".";

describe("categoryController", () => {
  describe("Instance", () => {
    test("should be an instance of CategoryController", () => {
      expect(categoryController).toBeInstanceOf(CategoryController);
    });
  });
});
