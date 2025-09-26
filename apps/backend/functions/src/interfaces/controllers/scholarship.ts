import {
  CreateScholarshipSchema,
  IMessageResponse,
  IScholarship,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";

export interface IScholarshipController {
  /** Creates a scholarship */
  createScholarship: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    CreateScholarshipSchema
  >;
}
