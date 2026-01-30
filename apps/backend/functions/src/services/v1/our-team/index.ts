import { RegistryKeysEnum } from "../../../enum";
import { IOurTeamService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ServiceUtils } from "../utils";

/** Concrete implementation of {IOurTeamService} */

export class OurTeamService extends ServiceUtils implements IOurTeamService {
  private static instance: IOurTeamService | null = null;
  private constructor() {
    super();
  }

  /** Factory for instance creation */

  static factory() {
    if (!OurTeamService.instance) {
      OurTeamService.instance = new OurTeamService();
    }

    return OurTeamService.instance;
  }

  getOurTeam: IOurTeamService["getOurTeam"] = async (limit) => {
    const teams = await this.repository.admin.findMany({
      take: limit,
      select: {
        primaryImage: true,
        secondaryImage: true,
        firstName: true,
        lastName: true,
        socials: true,
        about: true,
        jobTitle: true,
        email: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return teams.map((team) => this.deserialize(team));
  };
}

/** Concrete instance of {OurTeamService} */
export const ourTeamService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.OUR_TEAM_SERVICE,
  () => OurTeamService.factory(),
);
