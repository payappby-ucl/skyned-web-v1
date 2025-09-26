import {
  CreateScholarshipSchema,
  IMessageResponse,
  IPaginatedResponse,
  IScholarship,
  ISuccessResponse,
  UpdateScholarshipSchema,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { ScholarshipQuerySchema, SchoolSlugSchema } from "../../zod-schemas";
import { IScholarshipService } from "../services";

export interface IScholarshipController {
  /** Creates a scholarship */
  createScholarship: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    CreateScholarshipSchema
  >;

  /** Get Scholarships */
  listScholarships: RequestHandler<
    object,
    ISuccessResponse<IPaginatedResponse<IScholarship>>,
    void,
    ScholarshipQuerySchema
  >;

  /** Get a single scholarship information */
  getScholarship: RequestHandler<
    SchoolSlugSchema,
    ISuccessResponse<IScholarship>
  >;

  /** Update a scholarship date */
  updateScholarship: RequestHandler<
    SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>,
    UpdateScholarshipSchema
  >;

  /** Delete Scholarship */
  deleteScholarship: RequestHandler<
    SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>
  >;

  /** Deactivate Scholarship */
  deactivateScholarship: RequestHandler<
    SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>
  >;

  /** Activate Scholarship */
  activateScholarship: RequestHandler<
    SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>
  >;

  /** Get Summary */
  getSummary: RequestHandler<
    object,
    ISuccessResponse<Awaited<ReturnType<IScholarshipService["getSummary"]>>>
  >;
}
