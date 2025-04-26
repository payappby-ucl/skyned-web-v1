import {
  ContactUsSchema,
  IInquiry,
  IMessageResponse,
  IPaginatedResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { PageQuerySchema } from "../../zod-schemas";

/** Represents interface for contact controller */
export interface IContactController {
  createAndSendContactMessage: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    ContactUsSchema
  >;

  getContactUsMessages: RequestHandler<
    object,
    ISuccessResponse<IPaginatedResponse<IInquiry>>,
    object,
    Partial<PageQuerySchema>
  >;
}
