/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import {
  ISchoolController,
  ISchoolService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { schoolService, storageService } from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";

/** Represents dependencies needed to instantiate {SchoolController} */
export interface ISchoolControllerDependencies {
  schoolService: ISchoolService;
  storageService: IStorageService;
}

/**
 * Concrete implementation of {ISchoolController}
 * @class
 */

export class SchoolController
  extends ControllerUtils
  implements ISchoolController
{
  private static instance: ISchoolController | null = null;

  private constructor(
    private readonly schoolService: ISchoolService,
    private readonly storageService: IStorageService,
  ) {
    super();
  }

  /** Creates concrete instance of {SchoolController} */

  static factory({
    schoolService,
    storageService,
  }: ISchoolControllerDependencies) {
    if (!SchoolController.instance) {
      SchoolController.instance = new SchoolController(
        schoolService,
        storageService,
      );
    }
    return SchoolController.instance;
  }

  createSchool: ISchoolController["createSchool"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      const { logo, schoolImage, slug, ...rest } = req.body;

      this._attributeBasedAccessControl(
        authUser,
        "schools",
        "create",
        req.body,
      );

      const school = await this.schoolService.findSchoolBySlug(slug);
      if (school) {
        throw SkynedUtils.createException(
          StatusCodes.CONFLICT,
          "This school already exists.",
        );
      }

      const promises = [
        this.storageService.saveObject(
          logo,
          SkynedUtils.resolveStoragePath({
            type: "logo",
            data: {
              schoolSlug: slug,
            },
          }),
        ),

        this.storageService.saveObject(
          schoolImage,
          SkynedUtils.resolveStoragePath({
            type: "schoolImage",
            data: {
              schoolSlug: slug,
            },
          }),
        ),
      ];

      const storageResponses = await Promise.all(promises);

      const logoObject = storageResponses[0];
      const schoolImageObject = storageResponses[1];

      await this.schoolService.createSchool(authUser.user, {
        logo: logoObject,
        schoolImage: schoolImageObject,
        slug,
        ...rest,
      });

      res._success(StatusCodes.CREATED, {
        message: `${rest.name} created successfully`,
      });
    } catch (error) {
      next(error);
    }
  };

  listSchools: ISchoolController["listSchools"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      this._attributeBasedAccessControl(authUser, "schools", "list");
      const { from, to, limit, page } = req.query;

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.schoolService.count();
      const schoolList = await this.schoolService.listSchools({
        ...SkynedUtils.pick(construct, ["skip", "take"]),
        from,
        to,
      });

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        total,
        data: schoolList,
      });
    } catch (error) {
      next(error);
    }
  };
}

/** Instance of {SchoolController} */
export const schoolController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SCHOOL_CONTROLLER,
  () =>
    SchoolController.factory({
      schoolService,
      storageService,
    }),
);
