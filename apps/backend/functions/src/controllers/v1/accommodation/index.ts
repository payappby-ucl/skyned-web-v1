/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import {
  IAccommodationController,
  IAccommodationService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { accommodationService } from "../../../services";
import { ControllerUtils } from "../utils";
import { SkynedUtils } from "../../../utils";

/** Represents dependencies needed for instantiation */
export interface IAccommodationControllerDependencies {
  accommodationService: IAccommodationService;
}

/**
 * Concrete implementation of {IAccommodationController}
 * @class
 */

export class AccommodationController
  extends ControllerUtils
  implements IAccommodationController
{
  private static instance: IAccommodationController | null = null;

  private constructor(
    private readonly accommodationService: IAccommodationService,
  ) {
    super();
  }

  /** Creates concrete instance of {AccommodationController} */

  static factory({
    accommodationService,
  }: IAccommodationControllerDependencies) {
    if (!AccommodationController.instance) {
      AccommodationController.instance = new AccommodationController(
        accommodationService,
      );
    }
    return AccommodationController.instance;
  }

  getAccommodations: IAccommodationController["getAccommodations"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { limit, page } = req.query;

      const construct = this._constructPaginationData({ limit, page });
      const { take, skip } = construct;

      const total = await this.accommodationService.count();

      const accommodations = await this.accommodationService.getAccommodations({
        take,
        skip,
      });

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        total,
        data: accommodations,
      });
    } catch (error) {
      next(error);
    }
  };
}

/** Instance of {AccommodationController} */
export const accommodationController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ACCOMMODATION_CONTROLLER,
  () =>
    AccommodationController.factory({
      accommodationService,
    }),
);
