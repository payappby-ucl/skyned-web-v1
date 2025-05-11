import { CreateAdminSchema, IAdmin, ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents interface for admin controller */
export interface IAdminController {
  /** Fetches currently authenticated admin data */
  getMe: RequestHandler<object, ISuccessResponse<IAdmin>>;

  /** Creates Admin */
  createAdmin: RequestHandler<
    object,
    ISuccessResponse<IAdmin>,
    CreateAdminSchema
  >;
}
