/* eslint-disable max-len */
import express from "express";
import {
  IScholarshipController,
  IRouter,
  IAuthMiddleware,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import { scholarshipController } from "../../../../controllers";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import { ScholarshipQuerySchema } from "../../../../zod-schemas";
import { CreateScholarshipSchema } from "@workspace/shared";

/** Required dependencies for our team router initialization */
export interface ScholarshipRouterDependencies {
  controller: IScholarshipController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to out team
 *
 * @class
 */
export class ScholarshipRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    controller: IScholarshipController,
    authMiddleware: IAuthMiddleware,
  ) {
    this.router
      .route("/")
      .post(
        RequestValidationMiddleware.validate({
          body: CreateScholarshipSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        controller.createScholarship,
      )
      .get(
        RequestValidationMiddleware.validate({
          query: ScholarshipQuerySchema,
        }),
        authMiddleware.safeAuthenticate,
        controller.listScholarships,
      );
  }

  static factory({
    controller,
    authMiddleware,
  }: ScholarshipRouterDependencies) {
    if (!ScholarshipRouter.instance) {
      ScholarshipRouter.instance = new ScholarshipRouter(
        controller,
        authMiddleware,
      );
    }

    return ScholarshipRouter.instance;
  }
}

/** Scholarship router instance */
export const scholarshipRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SCHOLARSHIP_ROUTER,
  () =>
    ScholarshipRouter.factory({
      controller: scholarshipController,
      authMiddleware,
    }),
);
