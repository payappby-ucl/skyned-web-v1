/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import { IProgramService, IProgramController } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { programService } from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";

/** Represents dependencies needed to instantiate {ProgramController} */
export interface IProgramControllerDependencies {
  programService: IProgramService;
}

/**
 * Concrete implementation of {IProgramController}
 * @class
 */

export class ProgramController
  extends ControllerUtils
  implements IProgramController
{
  private static instance: IProgramController | null = null;

  private constructor(private readonly programService: IProgramService) {
    super();
  }

  /** Creates concrete instance of {ProgramController} */

  static factory({ programService }: IProgramControllerDependencies) {
    if (!ProgramController.instance) {
      ProgramController.instance = new ProgramController(programService);
    }
    return ProgramController.instance;
  }

  listPrograms: IProgramController["listPrograms"] = async (req, res, next) => {
    try {
      const { from, to, limit, page, ...rest } = req.query;
      let authUser = this._validateUser(req);

      if (authUser?.claim === "admin") {
        authUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(authUser, "programs", "list");
      }

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.programService.count(
        {
          from,
          to,
          where: {
            ...rest,
          },
        },
        authUser,
      );

      const programList = await this.programService.listPrograms(
        {
          ...SkynedUtils.pick(construct, ["skip", "take"]),
          from,
          to,
          where: {
            ...rest,
          },
        },
        authUser,
      );

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        total,
        data: programList,
      });
    } catch (error) {
      next(error);
    }
  };
}

/** Instance of {ProgramController} */
export const programController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.PROGRAM_CONTROLLER,
  () =>
    ProgramController.factory({
      programService,
    }),
);
