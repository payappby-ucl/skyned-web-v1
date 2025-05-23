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
  CreateSchoolSchema,
  UpdateSchoolSchema,
} from "@workspace/shared";
import { PageQuerySchema, SchoolSlugSchema } from "../../../../zod-schemas";

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

    this.router.route("/:slug/intakes");

    this.router.route("/:slug/intakes/:id");
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
