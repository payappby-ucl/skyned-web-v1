import {
  ContactUsSchema,
  IMessageResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents interface for contact controller */
export interface IContactController {
  createAndSendContactMessage: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    ContactUsSchema
  >;
}
