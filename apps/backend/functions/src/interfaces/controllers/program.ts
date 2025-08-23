import { RequestHandler } from "express";
import { PageQuerySchema } from "../../zod-schemas";
import { ISuccessResponse, IPaginatedResponse } from "@workspace/shared";
import { IProgramService } from "../services";

export interface IProgramController {
  /** List Programs */
  listPrograms: RequestHandler<
    object,
    ISuccessResponse<
      IPaginatedResponse<
        Awaited<ReturnType<IProgramService["listPrograms"]>>[0]
      >
    >,
    object,
    Partial<PageQuerySchema>
  >;
}
