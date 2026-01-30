import { contactController, ContactController } from ".";

describe("ContactController", () => {
  describe("Instance", () => {
    test("should be an instance of ContactController", () => {
      expect(contactController).toBeInstanceOf(ContactController);
    });
  });
});
