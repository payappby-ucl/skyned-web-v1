import { CreateFaqSchema, IFaq, ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents FaqController */
export interface IFaqController {
  createFaq: RequestHandler<object, ISuccessResponse<IFaq>, CreateFaqSchema>;
}
