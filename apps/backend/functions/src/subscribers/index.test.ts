import { Subscriber, subscriber } from ".";

describe("subscriber", () => {
  describe("Instance", () => {
    test("should be an instance of Subscriber", () => {
      expect(subscriber).toBeInstanceOf(Subscriber);
    });
  });
});
