import {
  IMessageResponse,
  IPaginatedResponse,
  ISuccessResponse,
} from "@workspace/shared";
import { RequestHandler } from "express";
import { PageQuerySchema } from "../../zod-schemas";
import { ITagService } from "../services";
import { DeleteTagsSchema } from "../../services";

/** Represents interface for controller */
export interface ITagController {
  /** Deletes a tag */
  deleteTag: RequestHandler<
    object & { id: string },
    ISuccessResponse<IMessageResponse>
  >;

  /** List tags in paginated format */
  listTags: RequestHandler<
    object,
    ISuccessResponse<
      IPaginatedResponse<Awaited<ReturnType<ITagService["findTags"]>>[0]>
    >,
    object,
    Partial<PageQuerySchema & Parameters<ITagService["findTags"]>["0"]["where"]>
  >;

  /** Lists all tags from database */
  listAllTags: RequestHandler<
    object,
    ISuccessResponse<Awaited<ReturnType<ITagService["getAllTags"]>>>
  >;

  /** Deletes many tags by their id */
  deleteManyTags: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    DeleteTagsSchema
  >;
}
