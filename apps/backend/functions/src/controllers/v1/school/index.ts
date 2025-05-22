/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import {
  IEvents,
  IIDGeneratorService,
  ISchoolController,
  ISchoolService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import {
  idGeneratorService,
  schoolService,
  storageService,
} from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";
import { IObject } from "@workspace/shared";
import { events } from "../../../infrastructure";

/** Represents dependencies needed to instantiate {SchoolController} */
export interface ISchoolControllerDependencies {
  schoolService: ISchoolService;
  storageService: IStorageService;
  idGeneratorService: IIDGeneratorService;
  events: IEvents;
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
    private readonly idGeneratorService: IIDGeneratorService,
    private readonly events: IEvents,
  ) {
    super();
  }

  /** Creates concrete instance of {SchoolController} */

  static factory({
    schoolService,
    storageService,
    idGeneratorService,
    events,
  }: ISchoolControllerDependencies) {
    if (!SchoolController.instance) {
      SchoolController.instance = new SchoolController(
        schoolService,
        storageService,
        idGeneratorService,
        events,
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

      const schoolId = this.idGeneratorService.id();

      const promises = [
        this.storageService.saveObject(
          logo,
          SkynedUtils.resolveStoragePath({
            type: "logo",
            data: {
              schoolId,
            },
          }),
        ),

        this.storageService.saveObject(
          schoolImage,
          SkynedUtils.resolveStoragePath({
            type: "schoolImage",
            data: {
              schoolId,
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
        schoolId,
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
      const { from, to, limit, page } = req.query;
      let authUser = this._validateUser(req);

      if (authUser?.claim === "admin") {
        authUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(authUser, "schools", "list");
      }

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.schoolService.count();

      const schoolList = await this.schoolService.listSchools(
        {
          ...SkynedUtils.pick(construct, ["skip", "take"]),
          from,
          to,
        },
        authUser,
      );

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        total,
        data: schoolList,
      });
    } catch (error) {
      next(error);
    }
  };

  findSchool: ISchoolController["findSchool"] = async (req, res, next) => {
    try {
      const { slug } = req.params;
      let authUser = this._validateUser(req);

      const school = await this.schoolService.findSchoolBySlug(slug, authUser);

      if (authUser?.claim === "admin" && school) {
        authUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(authUser, "schools", "read", school);
      }

      res._success(StatusCodes.OK, school);
    } catch (error) {
      next(error);
    }
  };

  updateSchool: ISchoolController["updateSchool"] = async (req, res, next) => {
    try {
      const { logo, schoolImage, slug: updatedSlug, ...rest } = req.body;
      const { slug } = req.params;

      const authUser = this._validateAdmin(req);

      const school = await this.schoolService.findSchoolBySlug(slug, authUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        authUser,
        "schools",
        "update",
        req.body,
        school,
      );

      if (school.slug !== updatedSlug) {
        const schoolExists =
          await this.schoolService.findSchoolBySlug(updatedSlug);

        if (schoolExists) {
          throw SkynedUtils.createException(
            StatusCodes.CONFLICT,
            "This school already exists.",
          );
        }
      }

      let logoRes: IObject | null = null;
      let schoolImageRes: IObject | null = null;

      if (logo) {
        logoRes = await this.storageService.saveObject(
          logo,
          SkynedUtils.resolveStoragePath({
            type: "logo",
            data: {
              schoolId: school.schoolId,
            },
          }),
        );
      }

      if (schoolImage) {
        schoolImageRes = await this.storageService.saveObject(
          schoolImage,
          SkynedUtils.resolveStoragePath({
            type: "schoolImage",
            data: {
              schoolId: school.schoolId,
            },
          }),
        );
      }

      const updatedSchool = await this.schoolService.updateSchool(
        school.schoolId,
        {
          ...rest,
          logo: logoRes || undefined,
          schoolImage: schoolImageRes || undefined,
          slug: updatedSlug,
        },
      );

      this.events.emitEvent({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "schools",
          resourceId: school.id,
          adminId: authUser.user.id,
          action: "update",
          previousState: SkynedUtils.exclude(school, ["createdBy"]),
          currentState: SkynedUtils.exclude(updatedSchool, ["createdBy"]),
        },
      });

      res._success(StatusCodes.OK, {
        message: "Update successfull",
      });
    } catch (error) {
      console.log(error);
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
      idGeneratorService,
      events,
    }),
);
