import { AdminController, adminController } from ".";

describe("AdminController", () => {
  describe("Instance", () => {
    test("should be an instance of AdminController", () => {
      expect(adminController).toBeInstanceOf(AdminController);
    });
  });
});
