/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import { ICategoryController, ICategoryService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { categoryService } from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";

/** Required dependencies to create controller instance */
export interface CategoryControllerDependencies {
  categoryService: ICategoryService;
}

/**
 * Concrete implementation of controller
 *
 * @class
 */

export class CategoryController
  extends ControllerUtils
  implements ICategoryController
{
  private static instance: ICategoryController | null = null;
  private constructor(private readonly categoryService: ICategoryService) {
    super();
  }

  /**
   * Creates the ContactController instance
   */

  static factory({ categoryService }: CategoryControllerDependencies) {
    if (!CategoryController.instance) {
      CategoryController.instance = new CategoryController(categoryService);
    }

    return CategoryController.instance;
  }

  deleteCategory: ICategoryController["deleteCategory"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);
      const { id } = req.params;

      const category = await this.categoryService.findById(parseInt(id));
      if (!category) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        authUser,
        "categories",
        "delete",
        category,
      );

      await this.categoryService.deleteCategory(category.id);
      res._success(StatusCodes.OK, { message: "Category Deleted" });
    } catch (error) {
      next(error);
    }
  };

  deleteManyCategories: ICategoryController["deleteManyCategories"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);
      const { data } = req.body;

      const categories = await this.categoryService.getAllCategories({
        ids: data.map((d) => d.id),
      });

      for (const category of categories) {
        this._attributeBasedAccessControl(
          authUser,
          "categories",
          "delete",
          category,
        );
      }

      await this.categoryService.deleteCategories(data.map((d) => d.id));
      res._success(StatusCodes.OK, { message: "Categories Deleted" });
    } catch (error) {
      next(error);
    }
  };

  listAllCategories: ICategoryController["listAllCategories"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateUser(req);
      if (authUser) {
        this._attributeBasedAccessControl(authUser, "categories", "list");
      }

      const categories = await this.categoryService.getAllCategories({}, authUser);

      res._success(StatusCodes.OK, categories);
    } catch (error) {
      next(error);
    }
  };

  listCategories: ICategoryController["listCategories"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { from, to, limit, page, ...rest } = req.query;

      const authUser = this._validateUser(req);

      if (authUser) {
        this._attributeBasedAccessControl(authUser, "categories", "list");
      }

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.categoryService.count({
        from,
        to,
        where: {
          ...rest,
        },
      });

      const categories = await this.categoryService.findCategories(
        {
          ...SkynedUtils.pick(construct, ["skip", "take"]),
          from,
          to,
          where: {
            ...rest,
          },
        },
        authUser,
      );

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        total,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };
}

/** Controller instance */
export const categoryController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.CATEGORY_CONTROLLER,
  () =>
    CategoryController.factory({
      categoryService,
    }),
);
