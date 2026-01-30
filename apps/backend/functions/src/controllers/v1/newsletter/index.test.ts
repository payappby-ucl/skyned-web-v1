import { NewsletterController, newsletterController } from ".";

describe("NewsletterController", () => {
  describe("instance", () => {
    test("should be an instance of NewsletterController", () => {
      expect(newsletterController).toBeInstanceOf(NewsletterController);
    });
  });
});
