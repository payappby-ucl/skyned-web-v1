import { AccommodationController, accommodationController } from ".";

describe("AccommodationController", () => {
  describe("Instance", () => {
    test("should be an instance of AccommodationController", () => {
      expect(accommodationController).toBeInstanceOf(AccommodationController);
    });
  });
});
