import { RequestHandler } from "express";
import {
  ISuccessResponse,
  IMessageResponse,
  CreateSchoolSchema,
  IPaginatedResponse,
  UpdateSchoolSchema,
  IAccommodation,
  CreateAccommodationSchema,
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

  /** Get Accommodation */
  getAccommodation: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IAccommodation | null>
  >;

  /** Create Accommodation */
  createAccommodation: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IAccommodation>,
    CreateAccommodationSchema
  >;

  /** Update Accommodation */
  updateAccommodation: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IAccommodation>,
    CreateAccommodationSchema
  >;

  /** Delete Accommodation */
  deleteAccommodation: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>
  >;
}
