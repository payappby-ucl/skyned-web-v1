import {
  CreateFaqSchema,
  IFaq,
  IMessageResponse,
  IPaginatedResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { IdSchema, PageQuerySchema } from "../../zod-schemas";

/** Represents FaqController */
export interface IFaqController {
  createFaq: RequestHandler<object, ISuccessResponse<IFaq>, CreateFaqSchema>;
  getFaqs: RequestHandler<
    object,
    ISuccessResponse<IPaginatedResponse<IFaq>>,
    object,
    Partial<PageQuerySchema>
  >;
  deleteFaq: RequestHandler<IdSchema & any, ISuccessResponse<IMessageResponse>>;
  listFaqs: RequestHandler<object, ISuccessResponse<IFaq[]>>;
}
