import {
  CreateAdminSchema,
  IAdmin,
  IPaginatedResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { PageQuerySchema } from "../../zod-schemas";
import { IAdminService } from "../services";

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

  /** List Admins */
  getAdminList: RequestHandler<
    object,
    ISuccessResponse<
      IPaginatedResponse<Awaited<ReturnType<IAdminService["listAdmins"]>>[0]>
    >,
    object,
    Partial<PageQuerySchema>
  >;
}
