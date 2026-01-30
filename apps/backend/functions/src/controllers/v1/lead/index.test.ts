import { leadController, LeadController } from ".";

describe("leadController", () => {
  describe("Instance", () => {
    test("should be an instance of LeadController", () => {
      expect(leadController).toBeInstanceOf(LeadController);
    });
  });
});
