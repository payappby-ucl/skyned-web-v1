/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import { AuthClaim, IBlogPost } from "@workspace/shared";
import { RegistryKeysEnum } from "../../../enum";
import { IBlogPostService, IQueryConstruct } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ServiceUtils } from "../utils";
import {
  BlogStatus,
  Prisma,
} from "../../../infrastructure/repository/prisma-client";
import {
  AdminIdSchema,
  BlogPostQuerySchema,
  IdSchema,
} from "../../../zod-schemas";
import { CreateBlogPostSchema, UpdatePostsServiceSchema } from "./schema";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { DefaultArgs } from "../../../infrastructure/repository/prisma-client/runtime/library";

const unAuthData: (keyof IBlogPost)[] = [
  "slug",
  "title",
  "content",
  "excerpt",
  "coverImage",
  "publishedAt",
  "createdAt",
  "updatedAt",
  "featured",
];

const adminData: (keyof IBlogPost)[] = [
  ...unAuthData,
  "authorId",
  "status",
  "id",
];

/**
 * Concrete implementation of IBlogPostService
 *
 * @class
 */

export class BlogPostService extends ServiceUtils implements IBlogPostService {
  private static instance: IBlogPostService | null = null;

  private constructor() {
    super();
  }

  /** Factory Method */

  static factory() {
    if (!BlogPostService.instance) {
      BlogPostService.instance = new BlogPostService();
    }

    return BlogPostService.instance;
  }

  private _constructQuery(
    whereQuery: IQueryConstruct<BlogPostQuerySchema>["where"],
    authUser?: AuthClaim,
  ) {
    const where: Prisma.BlogPostWhereInput = {};

    if (whereQuery.s) where.status = whereQuery.s;
    if (authUser?.claim !== "admin") where.status = BlogStatus.published;
    if (whereQuery.f) where.featured = true;
    if (whereQuery.c) {
      where.categories = {
        some: {
          name: whereQuery.c,
        },
      };
    }

    return where;
  }

  createBlogPost: IBlogPostService["createBlogPost"] = async (data) => {
    const { categories, tags, coverImage, status, publishedAt, ...rest } =
      this.validationUtility.validateInput({
        schema: CreateBlogPostSchema,
        inputData: data,
      });

    const blogPost = await this.repository.db.blogPost.create({
      data: {
        ...rest,
        coverImage: {
          ...coverImage,
        },
        status,
        publishedAt,
        categories: categories.length
          ? {
              connectOrCreate: categories.map((category) => ({
                where: { name: category },
                create: { name: category, createdById: rest.authorId },
              })),
            }
          : undefined,

        tags: tags.length
          ? {
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag, createdById: rest.authorId },
              })),
            }
          : undefined,
      },

      include: {
        categories: true,
        tags: true,
      },
    });

    return this.deserialize(blogPost);
  };

  findBlogPostBySlug: IBlogPostService["findBlogPostBySlug"] = async (
    slug,
    authUser,
  ) => {
    const { slug: sl } = this.validationUtility.validateInput({
      schema: CreateBlogPostSchema.pick({
        slug: true,
      }),
      inputData: {
        slug,
      },
    });

    const blogPost = await this.repository.db.blogPost.findUnique({
      where: {
        slug: sl,
      },
      select: {
        ...SkynedUtils.select<
          Prisma.BlogPostSelect<DefaultArgs>,
          keyof Prisma.BlogPostSelect<DefaultArgs>
        >(authUser?.claim !== "admin" ? unAuthData : adminData),

        categories:
          authUser?.claim !== "admin"
            ? {
                select: {
                  name: true,
                },
              }
            : true,

        tags:
          authUser?.claim !== "admin"
            ? {
                select: {
                  name: true,
                },
              }
            : true,

        author:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : {
                select: {
                  firstName: true,
                  lastName: true,
                  primaryImage: true,
                  jobTitle: true,
                },
              },
      },
    });

    if (!blogPost) return null;
    return this.deserialize(blogPost);
  };

  count: IBlogPostService["count"] = async ({ where, from, to }, authUser) => {
    const whereQuery = this._constructQuery(where || {}, authUser);
    const count = await this.repository.db.blogPost.count({
      where: {
        ...whereQuery,
        ...(authUser?.claim !== "admin"
          ? {
              publishedAt: {
                gte: from,
                lte: to,
              },
            }
          : {
              createdAt: {
                gte: from,
                lte: to,
              },
            }),
      },
    });

    return count;
  };

  findBlogPosts: IBlogPostService["findBlogPosts"] = async (
    { from, to, order, where, take, skip },
    authUser,
  ) => {
    const whereConstruct = this._constructQuery(where || {}, authUser);
    const posts = await this.repository.db.blogPost.findMany({
      skip,
      take,
      where: {
        ...whereConstruct,
        ...(authUser?.claim !== "admin"
          ? {
              publishedAt: {
                gte: from,
                lte: to,
              },
            }
          : {
              createdAt: {
                gte: from,
                lte: to,
              },
            }),
      },

      orderBy: {
        [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
      },

      select: {
        ...SkynedUtils.select<
          Prisma.BlogPostSelect<DefaultArgs>,
          keyof Prisma.BlogPostSelect<DefaultArgs>
        >(authUser?.claim !== "admin" ? unAuthData : adminData),

        categories:
          authUser?.claim !== "admin"
            ? {
                select: {
                  name: true,
                },
              }
            : true,

        tags:
          authUser?.claim !== "admin"
            ? {
                select: {
                  name: true,
                },
              }
            : true,

        author:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : {
                select: {
                  firstName: true,
                  lastName: true,
                  primaryImage: true,
                  jobTitle: true,
                },
              },
      },
    });

    return posts.map((post) => this.deserialize(post));
  };

  deleteBlogPost: IBlogPostService["deleteBlogPost"] = async (slug) => {
    const { slug: sl } = this.validationUtility.validateInput({
      schema: CreateBlogPostSchema.pick({
        slug: true,
      }),
      inputData: {
        slug,
      },
    });

    const post = await this.repository.db.blogPost.delete({
      where: {
        slug: sl,
      },
    });

    return this.deserialize(post);
  };

  updateBlogPost: IBlogPostService["updateBlogPost"] = async (
    id,
    adminId,
    data,
  ) => {
    const { id: blogId, adminId: authorId } =
      this.validationUtility.validateInput({
        schema: IdSchema.merge(AdminIdSchema),
        inputData: { id, adminId },
      });

    const { coverImage, categories, tags, status, publishedAt, ...rest } = data;
    const post = await this.repository.db.blogPost.update({
      where: {
        id: blogId,
      },

      data: {
        ...rest,
        coverImage: coverImage
          ? {
              ...coverImage,
            }
          : undefined,
        status,
        publishedAt,

        categories: categories?.length
          ? {
              set: [],
              connectOrCreate: categories.map((category) => ({
                where: { name: category },
                create: { name: category, createdById: authorId },
              })),
            }
          : undefined,

        tags: tags?.length
          ? {
              set: [],
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag, createdById: authorId },
              })),
            }
          : undefined,
      },
    });

    return this.deserialize(post);
  };

  findAllPostsDueToPublish: IBlogPostService["findAllPostsDueToPublish"] =
    async () => {
      const posts = await this.repository.db.blogPost.findMany({
        where: {
          status: "scheduled",
          publishedAt: {
            lte: new Date(),
          },
        },
      });

      return posts.map((post) => this.deserialize(post));
    };

  publishPosts: IBlogPostService["publishPosts"] = async (ids) => {
    const { data } = this.validationUtility.validateInput({
      schema: UpdatePostsServiceSchema,
      inputData: {
        data: ids,
      },
    });

    await this.repository.db.blogPost.updateMany({
      where: {
        id: {
          in: data,
        },
      },

      data: {
        status: "published",
      },
    });
  };
}

export const blogPostService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.BLOG_POST_SERVICE,
  () => BlogPostService.factory(),
);
