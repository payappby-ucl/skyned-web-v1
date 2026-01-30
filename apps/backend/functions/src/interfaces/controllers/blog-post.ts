import {
  BlogPostSchema,
  IBlogPost,
  IMessageResponse,
  IPaginatedResponse,
  ISuccessResponse,
  UpdateBlogPostSchema,
} from "@workspace/shared";
import { RequestHandler } from "express";
import {
  BlogPostQuerySchema,
  PageQuerySchema,
  SchoolSlugSchema,
} from "../../zod-schemas";
import { IBlogPostService } from "../services";

/** Represents Blog Post Controller  */
export interface IBlogPostController {
  createBlogPost: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    BlogPostSchema
  >;
  updateBlogPost: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>,
    UpdateBlogPostSchema
  >;

  deleteBlogPost: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IMessageResponse>
  >;

  getBlogPost: RequestHandler<
    object & SchoolSlugSchema,
    ISuccessResponse<IBlogPost>
  >;

  listBlogPost: RequestHandler<
    object,
    ISuccessResponse<
      IPaginatedResponse<
        Awaited<ReturnType<IBlogPostService["findBlogPosts"]>>[0]
      >
    >,
    object,
    Partial<PageQuerySchema & BlogPostQuerySchema>
  >;
}
