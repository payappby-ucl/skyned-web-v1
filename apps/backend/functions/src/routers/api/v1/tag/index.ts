import express from "express";
import {
  IAuthMiddleware,
  ITagController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import {
  TagQuerySchema,
  IdSchema,
  PageQuerySchema,
} from "../../../../zod-schemas";
import { tagController } from "../../../../controllers";
import { DeleteTagsSchema } from "../../../../services";

/** Required dependencies for tag router initialization */
export interface TagRouterDependencies {
  /** Auth Middleware */
  authMiddleware: IAuthMiddleware;
  /** Tag Controller */
  controller: ITagController;
}

/**
 * Handles all routes related to tag
 *
 * @class
 */
export class TagRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    authMiddleware: IAuthMiddleware,
    controller: ITagController,
  ) {
    this.router
      .route("/")
      .get(authMiddleware.safeAuthenticate, controller.listAllTags)
      .put(
        RequestValidationMiddleware.validate({
          body: DeleteTagsSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        controller.deleteManyTags,
      );

    this.router.route("/list").get(
      RequestValidationMiddleware.validate({
        query: PageQuerySchema.partial().merge(TagQuerySchema.partial()),
      }),
      authMiddleware.safeAuthenticate,
      controller.listTags,
    );

    this.router.route("/:id").delete(
      RequestValidationMiddleware.validate({
        params: IdSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      controller.deleteTag,
    );
  }

  /**
   * Creates the tag router instance
   */

  static factory({ authMiddleware, controller }: TagRouterDependencies) {
    if (!TagRouter.instance) {
      TagRouter.instance = new TagRouter(authMiddleware, controller);
    }

    return TagRouter.instance;
  }
}

/** Authentication router instance */
export const tagRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.TAG_ROUTER,
  () =>
    TagRouter.factory({
      authMiddleware,
      controller: tagController,
    }),
);
