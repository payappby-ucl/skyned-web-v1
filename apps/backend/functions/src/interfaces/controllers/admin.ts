import {
  CreateAdminSchema,
  IAdmin,
  IMessageResponse,
  IPaginatedResponse,
  ISuccessResponse,
  UpdateAdminSchema,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { AdminIdSchema, PageQuerySchema } from "../../zod-schemas";
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

  /** Get Admin Profile */
  getAdminProfile: RequestHandler<
    object & AdminIdSchema,
    ISuccessResponse<
      NonNullable<Awaited<ReturnType<IAdminService["getAdminProfile"]>>>
    >
  >;

  /** Update Admin Profile */
  updateAdminProfile: RequestHandler<
    object & AdminIdSchema,
    ISuccessResponse<IMessageResponse>,
    UpdateAdminSchema
  >;

  /** Suspend Admin Account */
  deactivateAccount: RequestHandler<
    AdminIdSchema,
    ISuccessResponse<IMessageResponse>
  >;

  /** Release Admin Account */
  activateAccount: RequestHandler<
    AdminIdSchema,
    ISuccessResponse<IMessageResponse>
  >;
}
