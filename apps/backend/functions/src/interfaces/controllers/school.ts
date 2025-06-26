import { RequestHandler } from "express";
import {
  ISuccessResponse,
  IMessageResponse,
  CreateSchoolSchema,
  IPaginatedResponse,
  UpdateSchoolSchema,
  IAccommodation,
  CreateAccommodationSchema,
  IIntake,
  CreateIntakeSchema,
  CreateProgramSchema,
  ProgramSchema,
  UpdateBulkProgramSchema,
} from "@workspace/shared";
import { IIntakeService, IProgramService, ISchoolService } from "../services";
import {
  IntakeQuery,
  PageQuerySchema,
  ProgramSlugSchema,
  SchoolSlugSchema,
} from "../../zod-schemas";

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

  /** Create intake */
  createIntake: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IIntake>,
    CreateIntakeSchema
  >;

  /** Get intakes */
  getIntakes: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<
      IPaginatedResponse<
        Awaited<ReturnType<IIntakeService["listSchoolIntakes"]>>[0]
      >
    >,
    void,
    Partial<PageQuerySchema & IntakeQuery>
  >;

  /** Update intake */
  updateIntake: RequestHandler<
    {
      slug: SchoolSlugSchema["slug"];
      id: string;
    },
    ISuccessResponse<IIntake>,
    CreateIntakeSchema
  >;

  /** Create Programs */
  createPrograms: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>,
    CreateProgramSchema
  >;

  /** List Programs */
  listPrograms: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<
      IPaginatedResponse<
        Awaited<ReturnType<IProgramService["listPrograms"]>>[0]
      >
    >,
    object,
    Partial<PageQuerySchema>
  >;

  /** Get a program */
  getProgram: RequestHandler<
    object & SchoolSlugSchema & ProgramSlugSchema,
    ISuccessResponse<
      Awaited<ReturnType<IProgramService["findProgramBySlugAndSchoolId"]>>
    >
  >;

  /** Update a program */
  updateProgram: RequestHandler<
    object & SchoolSlugSchema & ProgramSlugSchema,
    ISuccessResponse<IMessageResponse>,
    Partial<ProgramSchema>
  >;

  /** Update bulk program */
  updatePrograms: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>,
    UpdateBulkProgramSchema
  >;

  /** Connect Intakes */
  connectIntakes: RequestHandler<
    object & SchoolSlugSchema & ProgramSlugSchema,
    ISuccessResponse<IMessageResponse>,
    Pick<ProgramSchema, "intakes">
  >;

  /** Disconnect Intakes */
  disconnectIntakes: RequestHandler<
    object & SchoolSlugSchema & ProgramSlugSchema,
    ISuccessResponse<IMessageResponse>,
    Pick<ProgramSchema, "intakes">
  >;
}
