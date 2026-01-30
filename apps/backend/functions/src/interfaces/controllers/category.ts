import {
  IMessageResponse,
  IPaginatedResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { PageQuerySchema } from "../../zod-schemas";
import { ICategoryService } from "../services";
import { DeleteCategoriesSchema } from "../../services";

/** Represents interface for controller */
export interface ICategoryController {
  /** Deletes a category */
  deleteCategory: RequestHandler<
    object & { id: string },
    ISuccessResponse<IMessageResponse>
  >;

  /** List categories in paginated format */
  listCategories: RequestHandler<
    object,
    ISuccessResponse<
      IPaginatedResponse<
        Awaited<ReturnType<ICategoryService["findCategories"]>>[0]
      >
    >,
    object,
    Partial<
      PageQuerySchema &
        Parameters<ICategoryService["findCategories"]>["0"]["where"]
    >
  >;

  /** Lists all categories from database */
  listAllCategories: RequestHandler<
    object,
    ISuccessResponse<Awaited<ReturnType<ICategoryService["getAllCategories"]>>>
  >;

  /** Deletes many categories by their id */
  deleteManyCategories: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    DeleteCategoriesSchema
  >;
}
