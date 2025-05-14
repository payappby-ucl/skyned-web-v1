import { OurTeamService, ourTeamService } from ".";

describe("OurTeamService", () => {
  describe("Instance", () => {
    expect(ourTeamService).toBeInstanceOf(OurTeamService);
  });

  describe("Methods", () => {
    describe("getOurTeam", () => {
      test("should return an array of our team", async () => {
        const teams = await ourTeamService.getOurTeam();
        expect(teams).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              firstName: expect.any(String),
              lastName: expect.any(String),
              jobTitle: expect.any(String),
            }),
          ]),
        );
      });
    });
  });
});
