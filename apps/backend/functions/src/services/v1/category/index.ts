/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { RegistryKeysEnum } from "../../../enum";
import { Prisma } from "../../../infrastructure/repository/prisma-client";
import { DefaultArgs } from "../../../infrastructure/repository/prisma-client/runtime/library";
import { ICategoryService, IQueryConstruct } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { IdSchema } from "../../../zod-schemas";
import { ServiceUtils } from "../utils";
import { DeleteCategoriesSchema } from "./schema";

export * from "./schema";

/** Concrete implementation of ICategoryService */

export class CategoryService extends ServiceUtils implements ICategoryService {
  private static instance: ICategoryService | null = null;
  private constructor() {
    super();
  }

  static factory() {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }

    return CategoryService.instance;
  }

  private _constructQuery(
    whereQuery: IQueryConstruct<{
      name: string;
      id: number;
      ids: number[];
    }>["where"],
  ) {
    const where: Prisma.CategoryWhereInput = {};

    if (whereQuery.name) {
      where.name = whereQuery.name;
    }

    if (whereQuery.id) where.id = whereQuery.id;
    if (whereQuery.ids) {
      where.id = {
        in: whereQuery.ids,
      };
    }

    return where;
  }

  deleteCategory: ICategoryService["deleteCategory"] = async (id) => {
    const { id: categoryId } = this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const category = await this.repository.db.category.delete({
      where: {
        id: categoryId,
      },
    });

    return this.deserialize(category);
  };

  deleteCategories: ICategoryService["deleteCategories"] = async (ids) => {
    const { data } = this.validationUtility.validateInput({
      schema: DeleteCategoriesSchema,
      inputData: {
        data: ids.map((id) => ({ id })),
      },
    });

    await this.repository.db.category.deleteMany({
      where: {
        id: {
          in: data.map(({ id }) => id),
        },
      },
    });
  };

  getAllCategories: ICategoryService["getAllCategories"] = async (
    query,
    authUser,
  ) => {
    const where = this._constructQuery(query || {});
    const categories = await this.repository.db.category.findMany({
      where,
      select: {
        ...SkynedUtils.select<
          Prisma.CategorySelect<DefaultArgs>,
          keyof Prisma.CategorySelect<DefaultArgs>
        >(
          authUser?.claim === "admin"
            ? ["name", "id", "createdById", "updatedAt", "createdAt"]
            : ["name"],
        ),

        createdBy:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : undefined,

        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return categories.map((c) => this.deserialize(c));
  };

  count: ICategoryService["count"] = async ({ from, to, where }) => {
    const whereQuery = this._constructQuery(where || {});

    const count = await this.repository.db.category.count({
      where: {
        ...whereQuery,
        createdAt: {
          gte: from,
          lte: to,
        },
      },
    });

    return count;
  };

  findCategories: ICategoryService["findCategories"] = async (
    { from, to, order, where, take, skip },
    authUser,
  ) => {
    const whereConstruct = this._constructQuery(where || {});
    const categories = await this.repository.db.category.findMany({
      skip,
      take,
      where: {
        ...whereConstruct,
        createdAt: {
          gte: from,
          lte: to,
        },
      },

      orderBy: {
        [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
      },

      select: {
        ...SkynedUtils.select<
          Prisma.CategorySelect<DefaultArgs>,
          keyof Prisma.CategorySelect<DefaultArgs>
        >(
          authUser?.claim === "admin"
            ? ["name", "id", "createdById", "updatedAt", "createdAt"]
            : ["name"],
        ),

        createdBy:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : undefined,

        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return categories.map((category) => this.deserialize(category));
  };

  findById: ICategoryService["findById"] = async (id) => {
    const { id: categoryId } = this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const category = await this.repository.db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) return null;
    return this.deserialize(category);
  };
}

/** Concrete instance of CategoryService */
export const categoryService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.CATEGORY_SERVICE,
  () => CategoryService.factory(),
);
