import { Publisher, publisher } from ".";

describe("Publisher", () => {
  test("should be an instance of Publisher", () => {
    expect(publisher).toBeInstanceOf(Publisher);
  });
});
