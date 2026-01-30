import { schoolController, SchoolController } from ".";

describe("SchoolController", () => {
  describe("instance", () => {
    test("should be an instance of SchoolController", () => {
      expect(schoolController).toBeInstanceOf(SchoolController);
    });
  });
});
