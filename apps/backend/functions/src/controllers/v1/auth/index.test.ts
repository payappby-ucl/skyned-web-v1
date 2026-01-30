import { AuthController, authController } from ".";

describe("AuthController", () => {
  describe("Instance", () => {
    test("should be an instance of AuthController", () => {
      expect(authController).toBeInstanceOf(AuthController);
    });
  });
});
