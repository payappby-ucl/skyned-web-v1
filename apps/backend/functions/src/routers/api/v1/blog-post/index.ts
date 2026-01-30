import express from "express";
import { BlogPostSchema, UpdateBlogPostSchema } from "@workspace/shared";
import {
  IAuthMiddleware,
  IBlogPostController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import {
  BlogPostQuerySchema,
  PageQuerySchema,
  SchoolSlugSchema,
} from "../../../../zod-schemas";
import { blogPostController } from "../../../../controllers";

/** Required dependencies for router initialization */
export interface BlogPostRouterDependencies {
  controller: IBlogPostController;
  authMiddleware: IAuthMiddleware;
}

/**
 * Handles all routes related to contact us
 *
 * @class
 */
export class BlogPostRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    authMiddleware: IAuthMiddleware,
    controller: IBlogPostController,
  ) {
    this.router
      .route("/")
      .get(
        RequestValidationMiddleware.validate({
          query: PageQuerySchema.partial().merge(BlogPostQuerySchema),
        }),
        authMiddleware.safeAuthenticate,
        controller.listBlogPost,
      )
      .post(
        RequestValidationMiddleware.validate({
          body: BlogPostSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        controller.createBlogPost,
      );

    this.router
      .route("/:slug")
      .get(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
        }),
        authMiddleware.safeAuthenticate,
        controller.getBlogPost,
      )
      .put(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
          body: UpdateBlogPostSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        controller.updateBlogPost,
      )
      .delete(
        RequestValidationMiddleware.validate({
          params: SchoolSlugSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        controller.deleteBlogPost,
      );
    //   .patch();
  }

  static factory({ authMiddleware, controller }: BlogPostRouterDependencies) {
    if (!BlogPostRouter.instance) {
      BlogPostRouter.instance = new BlogPostRouter(authMiddleware, controller);
    }

    return BlogPostRouter.instance;
  }
}

/** Router instance */
export const blogRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.BLOG_POST_ROUTER,
  () =>
    BlogPostRouter.factory({
      authMiddleware,
      controller: blogPostController,
    }),
);
