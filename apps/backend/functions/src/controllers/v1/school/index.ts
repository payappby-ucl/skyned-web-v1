/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import {
  IAccommodationService,
  IIDGeneratorService,
  IIntakeService,
  IProgramService,
  ISchoolController,
  ISchoolService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import {
  accommodationService,
  idGeneratorService,
  intakeService,
  programService,
  schoolService,
  storageService,
} from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";
import { IObject } from "@workspace/shared";
import { IPublisher, publisher } from "../../../publisher";

/** Represents dependencies needed to instantiate {SchoolController} */
export interface ISchoolControllerDependencies {
  schoolService: ISchoolService;
  storageService: IStorageService;
  idGeneratorService: IIDGeneratorService;
  publisher: IPublisher;
  accommodationService: IAccommodationService;
  intakeService: IIntakeService;
  programService: IProgramService;
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
    private readonly publisher: IPublisher,
    private readonly accommodationService: IAccommodationService,
    private readonly intakeService: IIntakeService,
    private readonly programService: IProgramService,
  ) {
    super();
  }

  /** Creates concrete instance of {SchoolController} */

  static factory({
    schoolService,
    storageService,
    idGeneratorService,
    publisher,
    accommodationService,
    intakeService,
    programService,
  }: ISchoolControllerDependencies) {
    if (!SchoolController.instance) {
      SchoolController.instance = new SchoolController(
        schoolService,
        storageService,
        idGeneratorService,
        publisher,
        accommodationService,
        intakeService,
        programService,
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

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "schools",
          resourceId: school.id,
          adminId: authUser.user.id,
          action: "update",
          message: "Updated a school profile",
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

  getAccommodation: ISchoolController["getAccommodation"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug } = req.params;
      const authUser = this._validateUser(req);
      const school = await this.schoolService.findSchoolBySlug(slug, authUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      if (authUser?.claim === "admin") {
        const adminUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(adminUser, "schools", "read", school);
      }

      res._success(StatusCodes.OK, school.accommodation || null);
    } catch (error) {
      next(error);
    }
  };

  createAccommodation: ISchoolController["createAccommodation"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug } = req.params;
      const { description } = req.body;
      const adminUser = this._validateAdmin(req);
      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(adminUser, "schools", "read", school);
      this._attributeBasedAccessControl(
        adminUser,
        "accommodations",
        "create",
        req.body,
      );

      const accommodation = await this.accommodationService.createAccommodation(
        adminUser.user.adminId,
        school.schoolId,
        { description },
      );

      res._success(StatusCodes.CREATED, accommodation);
    } catch (error) {
      next(error);
    }
  };

  updateAccommodation: ISchoolController["updateAccommodation"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug } = req.params;
      const { description } = req.body;
      const adminUser = this._validateAdmin(req);
      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }
      const accommodation = school.accommodation;
      if (!accommodation) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        adminUser,
        "accommodations",
        "update",
        req.body,
        accommodation,
      );

      const updatedAccommodation =
        await this.accommodationService.createAccommodation(
          adminUser.user.adminId,
          school.schoolId,
          { description },
        );

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "accommodations",
          action: "update",
          message: "Updated an accommodation info",
          adminId: adminUser.user.id,
          resourceId: accommodation.id,
          previousState: SkynedUtils.exclude(accommodation, [
            "school",
            "createdBy",
          ]),
          currentState: updatedAccommodation,
        },
      });

      res._success(StatusCodes.OK, updatedAccommodation);
    } catch (error) {
      next(error);
    }
  };

  deleteAccommodation: ISchoolController["deleteAccommodation"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug } = req.params;
      const adminUser = this._validateAdmin(req);
      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }
      const accommodation = school.accommodation;
      if (!accommodation) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        adminUser,
        "accommodations",
        "delete",
        accommodation,
      );

      const deletedAccommodation =
        await this.accommodationService.deleteAccommodation(accommodation.id);

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "accommodations",
          action: "delete",
          adminId: adminUser.user.id,
          resourceId: accommodation.id,
          message: "Deleted a school accommodation info",
          previousState: SkynedUtils.exclude(accommodation, [
            "school",
            "createdBy",
          ]),
          currentState: deletedAccommodation,
        },
      });

      res._success(StatusCodes.OK, {
        message: "Operation Successful",
      });
    } catch (error) {
      next(error);
    }
  };

  createIntake: ISchoolController["createIntake"] = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const adminUser = this._validateAdmin(req);
      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(adminUser, "schools", "read", school);
      this._attributeBasedAccessControl(
        adminUser,
        "intakes",
        "create",
        req.body,
      );

      const intake = await this.intakeService.createIntake(
        adminUser.user.adminId,
        school.schoolId,
        req.body,
      );

      res._success(StatusCodes.CREATED, intake);
    } catch (error) {
      next(error);
    }
  };

  getIntakes: ISchoolController["getIntakes"] = async (req, res, next) => {
    try {
      const { from, to, limit, page, status } = req.query;
      const { slug } = req.params;
      let authUser = this._validateUser(req);

      const school = await this.schoolService.findSchoolBySlug(slug, authUser);
      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      if (authUser?.claim === "admin") {
        authUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(authUser, "schools", "read", school);
        this._attributeBasedAccessControl(authUser, "intakes", "list");
      }

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.intakeService.count({
        where: {
          schoolId: school.schoolId,
          status,
        },
      });

      const intakeList = await this.intakeService.listSchoolIntakes(
        {
          ...SkynedUtils.pick(construct, ["skip", "take"]),
          from,
          to,
          status,
        },
        school.schoolId,
        authUser,
      );

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        total,
        data: intakeList,
      });
    } catch (error) {
      next(error);
    }
  };

  updateIntake: ISchoolController["updateIntake"] = async (req, res, next) => {
    try {
      const { slug, id } = req.params;
      const adminUser = this._validateAdmin(req);
      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(adminUser, "schools", "read", school);

      const intake = await this.intakeService.findIntake(+id, school.schoolId);

      if (!intake) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        adminUser,
        "intakes",
        "update",
        req.body,
        intake,
      );

      const updatedIntake = await this.intakeService.updateIntake(
        intake.id,
        req.body,
      );

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "intakes",
          resourceId: updatedIntake.id,
          adminId: adminUser.user.id,
          action: "update",
          message: "Updated a school's intake",
          previousState: SkynedUtils.exclude(intake, ["createdBy", "school"]),
          currentState: SkynedUtils.exclude(updatedIntake, [
            "createdBy",
            "school",
          ]),
        },
      });

      res._success(StatusCodes.OK, updatedIntake);
    } catch (error) {
      next(error);
    }
  };

  createPrograms: ISchoolController["createPrograms"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug } = req.params;
      const adminUser = this._validateAdmin(req);
      const { type, data } = req.body;

      if (
        (type === "single" && Array.isArray(data)) ||
        (type === "bulk" && !Array.isArray(data))
      ) {
        throw SkynedUtils.createException(
          StatusCodes.BAD_REQUEST,
          "Invalid data format.",
        );
      }

      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(adminUser, "programs", "create", data);

      let message = "Program Created";

      if (!Array.isArray(data)) {
        await this.programService.createSingleProgram(
          adminUser.user.adminId,
          school.schoolId,
          data,
        );
      } else {
        const count = await this.programService.createBulkProgram(
          adminUser.user.adminId,
          school.schoolId,
          data,
        );

        message = `${count} programs created`;
      }

      res._success(StatusCodes.CREATED, { message });
    } catch (error) {
      next(error);
    }
  };

  listPrograms: ISchoolController["listPrograms"] = async (req, res, next) => {
    try {
      const { from, to, limit, page } = req.query;
      const { slug } = req.params;
      let authUser = this._validateUser(req);

      const school = await this.schoolService.findSchoolBySlug(slug, authUser);
      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      if (authUser?.claim === "admin") {
        authUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(authUser, "schools", "read", school);
        this._attributeBasedAccessControl(authUser, "programs", "list");
      }

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.programService.count(
        {
          from,
          to,
          where: {
            schoolId: school.schoolId,
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
            schoolId: school.schoolId,
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

  getProgram: ISchoolController["getProgram"] = async (req, res, next) => {
    try {
      const { slug, programSlug } = req.params;
      let authUser = this._validateUser(req);

      const school = await this.schoolService.findSchoolBySlug(slug, {
        claim: "admin",
      } as typeof authUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      const program = await this.programService.findProgramBySlugAndSchoolId(
        school.schoolId,
        programSlug,
        authUser,
      );

      if (authUser?.claim === "admin" && program) {
        authUser = this._validateAdmin(req);
        this._attributeBasedAccessControl(authUser, "schools", "read", school);
        this._attributeBasedAccessControl(
          authUser,
          "programs",
          "read",
          program,
        );
      }

      res._success(StatusCodes.OK, program);
    } catch (error) {
      next(error);
    }
  };

  updateProgram: ISchoolController["updateProgram"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug, programSlug } = req.params;
      const adminUser = this._validateAdmin(req);

      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      const program = await this.programService.findProgramBySlugAndSchoolId(
        school.schoolId,
        programSlug,
        adminUser,
      );

      if (!program) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        adminUser,
        "programs",
        "update",
        req.body,
        program,
      );

      if (req.body.slug && program.slug !== req.body.slug) {
        const programCheck =
          await this.programService.findProgramBySlugAndSchoolId(
            school.schoolId,
            req.body.slug,
            adminUser,
          );

        if (programCheck) {
          throw SkynedUtils.createException(
            StatusCodes.CONFLICT,
            `${programCheck.name} already exist.`,
          );
        }
      }

      const updatedProgram = await this.programService.updateSingleProgram(
        school.schoolId,
        program.slug,
        program.programId,
        req.body,
      );

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "programs",
          resourceId: program.id,
          adminId: adminUser.user.id,
          action: "update",
          message: "Updated a school's program data",
          previousState: SkynedUtils.exclude(program, ["createdBy"]),
          currentState: SkynedUtils.exclude(updatedProgram, ["createdBy"]),
        },
      });

      res._success(StatusCodes.OK, { message: "Program Updated." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updatePrograms: ISchoolController["updatePrograms"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug } = req.params;
      const adminUser = this._validateAdmin(req);
      const { data } = req.body;

      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      await this.programService.updateBulkProgram(school.schoolId, data);

      // TODO: Figure out logging of this activity
      // this.events.emitEvent({
      //   type: EventsEnum.CREATE_ACTIVITY_LOG,
      //   data: {
      //     resource: "programs",
      //     resourceId: program.id,
      //     adminId: adminUser.user.id,
      //     action: "update",
      //     previousState: SkynedUtils.exclude(program, ["createdBy"]),
      //     currentState: SkynedUtils.exclude(updatedProgram, ["createdBy"]),
      //   },
      // });

      res._success(StatusCodes.OK, { message: "Programs Updated." });
    } catch (error) {
      next(error);
    }
  };

  connectIntakes: ISchoolController["connectIntakes"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug, programSlug } = req.params;
      const adminUser = this._validateAdmin(req);
      const { intakes } = req.body;

      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      const program = await this.programService.findProgramBySlugAndSchoolId(
        school.schoolId,
        programSlug,
        adminUser,
      );

      if (!program) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      await this.programService.connectIntakes(
        school.schoolId,
        program.slug,
        intakes,
      );

      res._success(StatusCodes.OK, { message: "Updated." });
    } catch (error) {
      next(error);
    }
  };

  disconnectIntakes: ISchoolController["disconnectIntakes"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { slug, programSlug } = req.params;
      const adminUser = this._validateAdmin(req);
      const { intakes } = req.body;

      const school = await this.schoolService.findSchoolBySlug(slug, adminUser);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      const program = await this.programService.findProgramBySlugAndSchoolId(
        school.schoolId,
        programSlug,
        adminUser,
      );

      if (!program) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      await this.programService.disconnectIntakes(
        school.schoolId,
        program.slug,
        intakes,
      );

      res._success(StatusCodes.OK, { message: "Updated." });
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
      idGeneratorService,
      publisher,
      accommodationService,
      intakeService,
      programService,
    }),
);
