import {
  FinancialAidSchema,
  IFinancialAid,
  IMessageResponse,
  IPaginatedResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { PageQuerySchema } from "../../zod-schemas";

/** Represents interface for controller */
export interface IFinancialAidController {
  create: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    FinancialAidSchema
  >;

  getFinancialAids: RequestHandler<
    object,
    ISuccessResponse<IPaginatedResponse<IFinancialAid>>,
    object,
    Partial<PageQuerySchema>
  >;
}
