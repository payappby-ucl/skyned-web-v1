/* eslint-disable max-len */
import express from "express";
import {
  ISchoolController,
  IRouter,
  IAuthMiddleware,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { schoolController } from "../../../../controllers";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import {
  CreateAccommodationSchema,
  CreateIntakeSchema,
  CreateProgramSchema,
  CreateSchoolSchema,
  ProgramSchema,
  UpdateBulkProgramSchema,
  UpdateSchoolSchema,
  ApplyFormSchema,
} from "@workspace/shared";
import {
  IdSchema,
  IntakeQuery,
  PageQuerySchema,
  ProgramQuerySchema,
  ProgramSlugSchema,
  SchoolSlugSchema,
} from "../../../../zod-schemas";

/** Required dependencies for router initialization */
export interface SchoolRouterDependencies {
  schoolController: ISchoolController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to schools
 *
 * @class
 */
export class SchoolRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    schoolController: ISchoolController,
    authMiddleware: IAuthMiddleware,
  ) {
    this.router
      .route("/")
      .get(
        RequestValidationMiddleware.validate({
          query: PageQuerySchema.partial(),
        }),
        authMiddleware.safeAuthenticate,
        schoolController.listSchools,
      )
      .post(
        RequestValidationMiddleware.validate({
          body: CreateSchoolSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.createSchool,
      );

    this.router
      .route("/:slug")
      .get(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
        }),
        authMiddleware.safeAuthenticate,
        schoolController.findSchool,
      )
      .put(
        RequestValidationMiddleware.validate({
          body: UpdateSchoolSchema,
          params: SchoolSlugSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.updateSchool,
      );

    this.router.route("/:slug/deactivate").patch(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      schoolController.deactivateSchool,
    );

    this.router.route("/:slug/activate").patch(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      schoolController.activateSchool,
    );

    this.router
      .route("/:slug/accommodation")
      .get(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
        }),
        authMiddleware.safeAuthenticate,
        schoolController.getAccommodation,
      )
      .post(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          body: CreateAccommodationSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.createAccommodation,
      )
      .put(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          body: CreateAccommodationSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.updateAccommodation,
      )
      .delete(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.deleteAccommodation,
      );

    this.router
      .route("/:slug/intakes")
      .get(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          query: IntakeQuery,
        }),
        authMiddleware.safeAuthenticate,
        schoolController.getIntakes,
      )
      .post(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          body: CreateIntakeSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.createIntake,
      );

    this.router.route("/:slug/intakes/:id").put(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema.merge(IdSchema),
        body: CreateIntakeSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      schoolController.updateIntake,
    );
    // .delete(
    //   RequestValidationMiddleware.validate({
    //     params: SchoolSlugSchema.merge(IdSchema),
    //   }),
    //   authMiddleware.authenticate,
    //   authMiddleware.hasRole(["admin"]),
    //   // TODO: Add Controller
    // );

    this.router
      .route("/:slug/programs")
      .post(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          body: CreateProgramSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.createPrograms,
      )
      .get(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          query: PageQuerySchema.merge(ProgramQuerySchema).partial(),
        }),
        authMiddleware.safeAuthenticate,
        schoolController.listPrograms,
      )
      .put(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          body: UpdateBulkProgramSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.updatePrograms,
      );

    this.router
      .route("/:slug/programs/:programSlug")
      .get(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema.merge(ProgramSlugSchema),
        }),
        authMiddleware.safeAuthenticate,
        schoolController.getProgram,
      )
      .put(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema.merge(ProgramSlugSchema),
          body: ProgramSchema.partial(),
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        schoolController.updateProgram,
      )
      // TODO: Remember to implement
      .delete();

    this.router.route("/:slug/programs/:programSlug/deactivate").patch(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema.merge(ProgramSlugSchema),
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      schoolController.deactivateProgram,
    );

    this.router.route("/:slug/programs/:programSlug/activate").patch(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema.merge(ProgramSlugSchema),
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      schoolController.activateProgram,
    );

    this.router.route("/:slug/programs/:programSlug/disconnect-intakes").put(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema.merge(ProgramSlugSchema),
        body: ProgramSchema.pick({
          intakes: true,
        }),
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      schoolController.disconnectIntakes,
    );

    this.router.route("/:slug/programs/:programSlug/connect-intakes").put(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema.merge(ProgramSlugSchema),
        body: ProgramSchema.pick({
          intakes: true,
        }),
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      schoolController.connectIntakes,
    );

    // * Apply for program
    this.router.route("/:slug/programs/:programSlug/apply").post(
      RequestValidationMiddleware.validate({
        params: SchoolSlugSchema.merge(ProgramSlugSchema),
        body: ApplyFormSchema,
      }),
      authMiddleware.safeAuthenticate,
      schoolController.applyForProgram,
    );
  }

  /**
   * Creates the our team router instance
   */

  static factory({
    schoolController,
    authMiddleware,
  }: SchoolRouterDependencies) {
    if (!SchoolRouter.instance) {
      SchoolRouter.instance = new SchoolRouter(
        schoolController,
        authMiddleware,
      );
    }

    return SchoolRouter.instance;
  }
}

/** OurTeam router instance */
export const schoolRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SCHOOL_ROUTER,
  () =>
    SchoolRouter.factory({
      schoolController,
      authMiddleware,
    }),
);
