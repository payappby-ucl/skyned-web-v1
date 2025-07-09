import express from "express";
import {
  IAuthMiddleware,
  ICategoryController,
  IRouter,
} from "../../../../interfaces";
import SkynedRegistry from "../../../../registry";
import { RegistryKeysEnum } from "../../../../enum";
import {
  authMiddleware,
  RequestValidationMiddleware,
} from "../../../../middleware";
import {
  CategoryQuerySchema,
  IdSchema,
  PageQuerySchema,
} from "../../../../zod-schemas";
import { categoryController } from "../../../../controllers";
import { DeleteCategoriesSchema } from "../../../../services";

/** Required dependencies for category router initialization */
export interface CategoryRouterDependencies {
  /** Auth Middleware */
  authMiddleware: IAuthMiddleware;
  /** Category Controller */
  controller: ICategoryController;
}

/**
 * Handles all routes related to category
 *
 * @class
 */
export class CategoryRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(
    authMiddleware: IAuthMiddleware,
    controller: ICategoryController,
  ) {
    this.router
      .route("/")
      .get(authMiddleware.safeAuthenticate, controller.listAllCategories)
      .put(
        RequestValidationMiddleware.validate({
          body: DeleteCategoriesSchema,
        }),
        authMiddleware.authenticate,
        authMiddleware.hasRole(["admin"]),
        controller.deleteManyCategories,
      );

    this.router.route("/list").get(
      RequestValidationMiddleware.validate({
        query: PageQuerySchema.partial().merge(CategoryQuerySchema.partial()),
      }),
      authMiddleware.safeAuthenticate,
      controller.listCategories,
    );

    this.router.route("/:id").delete(
      RequestValidationMiddleware.validate({
        params: IdSchema,
      }),
      authMiddleware.authenticate,
      authMiddleware.hasRole(["admin"]),
      controller.deleteCategory,
    );
  }

  /**
   * Creates the category router instance
   */

  static factory({ authMiddleware, controller }: CategoryRouterDependencies) {
    if (!CategoryRouter.instance) {
      CategoryRouter.instance = new CategoryRouter(authMiddleware, controller);
    }

    return CategoryRouter.instance;
  }
}

/** Authentication router instance */
export const categoryRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.CATEGORY_ROUTER,
  () =>
    CategoryRouter.factory({
      authMiddleware,
      controller: categoryController,
    }),
);
