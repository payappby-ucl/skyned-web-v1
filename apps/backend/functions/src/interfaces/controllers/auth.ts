import {
  IMessageResponse,
  ISuccessResponse,
  RegisterSchema,
} from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents interface for auth controller */
export interface IAuthController {
  sendEmailVerificationLink: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    RegisterSchema
  >;
}
