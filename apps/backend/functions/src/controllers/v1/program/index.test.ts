import { programController, ProgramController } from ".";

describe("ProgramController", () => {
  describe("instance", () => {
    test("should be an instance of ProgramController", () => {
      expect(programController).toBeInstanceOf(ProgramController);
    });
  });
});
