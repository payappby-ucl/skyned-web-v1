import { Marketing, marketing } from ".";

describe("Marketing Infrastructure", () => {
  describe("Marketing Instance", () => {
    test("should be an instance of Marketing", () => {
      expect(marketing).toBeInstanceOf(Marketing);
    });
  });
});
