import {
  CommonSchema,
  IMessageResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents Newsletter Controller */
export interface INewsletterController {
  subscribeToNewsletter: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    Pick<CommonSchema, "email">
  >;
}
