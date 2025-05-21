import { RequestHandler } from "express";
import {
  ISuccessResponse,
  IMessageResponse,
  CreateSchoolSchema,
} from "@workspace/shared";

export interface ISchoolController {
  /** Creates a school */
  createSchool: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    CreateSchoolSchema
  >;
}
