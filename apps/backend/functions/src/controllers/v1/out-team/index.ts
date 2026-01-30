/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import { IOurTeamController, IOurTeamService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ourTeamService } from "../../../services";

/** Represents dependencies needed to instantiate {NewsletterController} */
export interface IOurTeamControllerDependencies {
  ourTeamService: IOurTeamService;
}

/**
 * Concrete implementation of {IOurTeamController}
 * @class
 */

export class OurTeamController implements IOurTeamController {
  private static instance: IOurTeamController | null = null;

  private constructor(private readonly ourTeamService: IOurTeamService) {}

  /** Creates concrete instance of {OurTeamController} */

  static factory({ ourTeamService }: IOurTeamControllerDependencies) {
    if (!OurTeamController.instance) {
      OurTeamController.instance = new OurTeamController(ourTeamService);
    }
    return OurTeamController.instance;
  }

  getOurTeam: IOurTeamController["getOurTeam"] = async (req, res, next) => {
    try {
      const { limit } = req.query;
      const teams = await this.ourTeamService.getOurTeam(limit);

      res._success(StatusCodes.OK, teams);
    } catch (error) {
      next(error);
    }
  };
}

/** Instance of {OurTeamController} */
export const ourTeamController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.OUR_TEAM_CONTROLLER,
  () =>
    OurTeamController.factory({
      ourTeamService,
    }),
);
