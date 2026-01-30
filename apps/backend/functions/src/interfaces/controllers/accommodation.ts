import { IPaginatedResponse, ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";
import { PageQuerySchema } from "../../zod-schemas";
import { IAccommodationService } from "../services";

/** Represents accommodation controller */
export interface IAccommodationController {
  /** Gets a list of accommodations */
  getAccommodations: RequestHandler<
    object,
    ISuccessResponse<
      IPaginatedResponse<
        Awaited<ReturnType<IAccommodationService["getAccommodations"]>>[0]
      >
    >,
    object,
    Partial<PageQuerySchema>
  >;
}
