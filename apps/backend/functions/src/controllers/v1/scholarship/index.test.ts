import { scholarshipController, ScholarshipController } from ".";

describe("scholarshipController", () => {
  describe("Instance", () => {
    test("should be an instance of ScholarshipController", () => {
      expect(scholarshipController).toBeInstanceOf(ScholarshipController);
    });
  });
});
