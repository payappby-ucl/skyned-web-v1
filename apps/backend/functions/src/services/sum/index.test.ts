import { sumClass } from ".";

describe("Sum class", () => {
  test("Should return 4", () => {
    expect(sumClass.sum(2, 2)).toEqual(4);
  });
});
