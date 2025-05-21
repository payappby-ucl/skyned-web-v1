import { RequestHandler } from "express";
import {
  ISuccessResponse,
  IMessageResponse,
  CreateSchoolSchema,
  IPaginatedResponse,
} from "@workspace/shared";
import { ISchoolService } from "../services";
import { PageQuerySchema } from "../../zod-schemas";

export interface ISchoolController {
  /** Creates a school */
  createSchool: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    CreateSchoolSchema
  >;

  /** Get School lists for admin view */
  listSchools: RequestHandler<
    object,
    ISuccessResponse<
      IPaginatedResponse<Awaited<ReturnType<ISchoolService["listSchools"]>>[0]>
    >,
    object,
    Partial<PageQuerySchema>
  >;
}
