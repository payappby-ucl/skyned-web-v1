import { Repository, repository } from ".";

describe("Repository instance", () => {
  test("should be an instance of Repository", () => {
    expect(repository).toBeInstanceOf(Repository);
  });
});
