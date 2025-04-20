import { IAdmin, ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents interface for admin controller */
export interface IAdminController {
  getMe: RequestHandler<object, ISuccessResponse<IAdmin>>;
}
