import { RequestHandler } from "express";
import {
  ISuccessResponse,
  IMessageResponse,
  CreateSchoolSchema,
  IPaginatedResponse,
  UpdateSchoolSchema,
} from "@workspace/shared";
import { ISchoolService } from "../services";
import { PageQuerySchema, SchoolSlugSchema } from "../../zod-schemas";

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

  /** Finds a school */
  findSchool: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<Awaited<ReturnType<ISchoolService["findSchoolBySlug"]>>>
  >;

  /** Update a school */
  updateSchool: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>,
    UpdateSchoolSchema
  >;
}
