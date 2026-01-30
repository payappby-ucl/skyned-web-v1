/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { RegistryKeysEnum } from "../../../enum";
import { Prisma } from "../../../infrastructure/repository/prisma-client";
import { DefaultArgs } from "../../../infrastructure/repository/prisma-client/runtime/library";
import { ITagService, IQueryConstruct } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { IdSchema } from "../../../zod-schemas";
import { ServiceUtils } from "../utils";
import { DeleteTagsSchema } from "./schema";

export * from "./schema";

/** Concrete implementation of ITagService */

export class TagService extends ServiceUtils implements ITagService {
  private static instance: ITagService | null = null;
  private constructor() {
    super();
  }

  static factory() {
    if (!TagService.instance) {
      TagService.instance = new TagService();
    }

    return TagService.instance;
  }

  private _constructQuery(
    whereQuery: IQueryConstruct<{
      name: string;
      id: number;
      ids: number[];
    }>["where"],
  ) {
    const where: Prisma.TagWhereInput = {};

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

  deleteTag: ITagService["deleteTag"] = async (id) => {
    const { id: tagId } = this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const tag = await this.repository.db.tag.delete({
      where: {
        id: tagId,
      },
    });

    return this.deserialize(tag);
  };

  deleteTags: ITagService["deleteTags"] = async (ids) => {
    const { data } = this.validationUtility.validateInput({
      schema: DeleteTagsSchema,
      inputData: {
        data: ids.map((id) => ({ id })),
      },
    });

    await this.repository.db.tag.deleteMany({
      where: {
        id: {
          in: data.map(({ id }) => id),
        },
      },
    });
  };

  getAllTags: ITagService["getAllTags"] = async (query, authUser) => {
    const where = this._constructQuery(query || {});
    const tags = await this.repository.db.tag.findMany({
      where,
      select: {
        ...SkynedUtils.select<
          Prisma.TagSelect<DefaultArgs>,
          keyof Prisma.TagSelect<DefaultArgs>
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

    return tags.map((c) => this.deserialize(c));
  };

  count: ITagService["count"] = async ({ from, to, where }) => {
    const whereQuery = this._constructQuery(where || {});

    const count = await this.repository.db.tag.count({
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

  findTags: ITagService["findTags"] = async (
    { from, to, order, where, take, skip },
    authUser,
  ) => {
    const whereConstruct = this._constructQuery(where || {});
    const tags = await this.repository.db.tag.findMany({
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

    return tags.map((tag) => this.deserialize(tag));
  };

  findById: ITagService["findById"] = async (id) => {
    const { id: tagId } = this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const tag = await this.repository.db.tag.findUnique({
      where: {
        id: tagId,
      },
    });

    if (!tag) return null;
    return this.deserialize(tag);
  };
}

/** Concrete instance of TagService */
export const tagService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.TAG_SERVICE,
  () => TagService.factory(),
);
