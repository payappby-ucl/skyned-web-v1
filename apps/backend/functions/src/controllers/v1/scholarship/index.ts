/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import {
  IScholarshipController,
  IScholarshipService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { scholarshipService, storageService } from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";

/** Required dependencies to create controller instance */
export interface ScholarshipControllerDependencies {
  scholarshipService: IScholarshipService;
  storageService: IStorageService;
}

/**
 * Concrete implementation of controller
 *
 * @class
 */

export class ScholarshipController
  extends ControllerUtils
  implements IScholarshipController
{
  private static instance: IScholarshipController | null = null;
  private constructor(
    private readonly scholarshipService: IScholarshipService,
    private readonly storageService: IStorageService,
  ) {
    super();
  }

  /**
   * Creates the controller instance
   */

  static factory({
    scholarshipService,
    storageService,
  }: ScholarshipControllerDependencies) {
    if (!ScholarshipController.instance) {
      ScholarshipController.instance = new ScholarshipController(
        scholarshipService,
        storageService,
      );
    }

    return ScholarshipController.instance;
  }

  createScholarship: IScholarshipController["createScholarship"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);
      const { banner, slug, ...rest } = req.body;

      this._attributeBasedAccessControl(
        authUser,
        "scholarships",
        "create",
        req.body,
      );

      const scholarship = await this.scholarshipService.findBySlug(
        slug,
        authUser,
      );

      if (scholarship) {
        throw SkynedUtils.createException(
          StatusCodes.CONFLICT,
          `${rest.title} already exist`,
        );
      }

      const bannerImage = await this.storageService.saveObject(
        banner,
        SkynedUtils.resolveStoragePath({
          type: "banner",
          data: {
            slug,
          },
        }),
      );

      await this.scholarshipService.create(
        {
          ...rest,
          banner: bannerImage,
          slug,
        },
        authUser,
      );

      res._success(StatusCodes.CREATED, {
        message: "Scholarship award created",
      });
    } catch (error) {
      next(error);
    }
  };

  listScholarships: IScholarshipController["listScholarships"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { from, to, limit, page, ...rest } = req.query;
      const authUser = this._validateUser(req);

      if (authUser) {
        this._attributeBasedAccessControl(authUser, "scholarships", "list");
      }

      const construct = this._constructPaginationData({ limit, page });
      const total = await this.scholarshipService.count(
        {
          from,
          to,
          where: {
            ...rest,
          },
        },
        authUser,
      );

      const scholarships = await this.scholarshipService.listScholarships(
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
        data: scholarships,
      });
    } catch (error) {
      next(error);
    }
  };

  // deleteScholarship: IScholarshipController["deleteScholarship"] = async (req, res, next) => {
  //   try {
  //     const authUser = this._validateAdmin(req);
  //     const { id } = req.params;

  //     const scholarship = await this.scholarshipService.findById(parseInt(id));
  //     if (!scholarship) {
  //       throw SkynedUtils.createException(
  //         StatusCodes.NOT_FOUND,
  //         "Resource not found",
  //       );
  //     }

  //     this._attributeBasedAccessControl(authUser, "scholarships", "delete", scholarship);

  //     await this.scholarshipService.deleteScholarship(scholarship.id);
  //     res._success(StatusCodes.OK, { message: "Scholarship Deleted" });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // deleteManyScholarships: IScholarshipController["deleteManyScholarships"] = async (req, res, next) => {
  //   try {
  //     const authUser = this._validateAdmin(req);
  //     const { data } = req.body;

  //     const scholarships = await this.scholarshipService.getAllScholarships({
  //       ids: data.map((d) => d.id),
  //     });

  //     for (const scholarship of scholarships) {
  //       this._attributeBasedAccessControl(authUser, "scholarships", "delete", scholarship);
  //     }

  //     await this.scholarshipService.deleteScholarships(data.map((d) => d.id));
  //     res._success(StatusCodes.OK, { message: "Scholarships Deleted" });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // listAllScholarships: IScholarshipController["listAllScholarships"] = async (req, res, next) => {
  //   try {
  //     const authUser = this._validateUser(req);
  //     if (authUser) {
  //       this._attributeBasedAccessControl(authUser, "scholarships", "list");
  //     }

  //     const scholarships = await this.scholarshipService.getAllScholarships({}, authUser);

  //     res._success(StatusCodes.OK, scholarships);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // listScholarships: IScholarshipController["listScholarships"] = async (req, res, next) => {
  //   try {
  //     const { from, to, limit, page, ...rest } = req.query;

  //     const authUser = this._validateUser(req);

  //     if (authUser) {
  //       this._attributeBasedAccessControl(authUser, "scholarships", "list");
  //     }

  //     const construct = this._constructPaginationData({ limit, page });

  //     const total = await this.scholarshipService.count({
  //       from,
  //       to,
  //       where: {
  //         ...rest,
  //       },
  //     });

  //     const scholarships = await this.scholarshipService.findScholarships(
  //       {
  //         ...SkynedUtils.pick(construct, ["skip", "take"]),
  //         from,
  //         to,
  //         where: {
  //           ...rest,
  //         },
  //       },
  //       authUser,
  //     );

  //     res._success(StatusCodes.OK, {
  //       ...SkynedUtils.exclude(construct, ["skip", "take"]),
  //       total,
  //       data: scholarships,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

/** Controller instance */
export const scholarshipController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SCHOLARSHIP_CONTROLLER,
  () =>
    ScholarshipController.factory({
      scholarshipService,
      storageService,
    }),
);
