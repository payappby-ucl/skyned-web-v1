import {
  CreateScholarshipSchema,
  IMessageResponse,
  IPaginatedResponse,
  IScholarship,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { ScholarshipQuerySchema } from "../../zod-schemas";

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
}
