import { faqController, FaqController } from ".";

describe("FaqController", () => {
  describe("Instance", () => {
    test("should be an instance of FaqController", () => {
      expect(faqController).toBeInstanceOf(FaqController);
    });
  });
});
