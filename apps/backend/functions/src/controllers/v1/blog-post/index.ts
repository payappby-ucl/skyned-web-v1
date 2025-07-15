/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import {
  IBlogPostController,
  IBlogPostService,
  IIDGeneratorService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import {
  blogPostService,
  idGeneratorService,
  storageService,
} from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";

/** Represents Dependencies */
export interface IBlogPostControllerDependencies {
  blogService: IBlogPostService;
  storageService: IStorageService;
  idGeneratorService: IIDGeneratorService;
}

/** Concrete implementation of IBlogPostController */

export class BlogPostController
  extends ControllerUtils
  implements IBlogPostController
{
  private static instance: IBlogPostController | null = null;

  private constructor(
    private readonly blogService: IBlogPostService,
    private readonly storageService: IStorageService,
    private readonly idGeneratorService: IIDGeneratorService,
  ) {
    super();
  }

  static factory({
    blogService,
    idGeneratorService,
    storageService,
  }: IBlogPostControllerDependencies) {
    if (!BlogPostController.instance) {
      BlogPostController.instance = new BlogPostController(
        blogService,
        storageService,
        idGeneratorService,
      );
    }

    return BlogPostController.instance;
  }

  createBlogPost: IBlogPostController["createBlogPost"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);
      const { slug, coverImage, status, publishedAt, ...rest } = req.body;

      this._attributeBasedAccessControl(authUser, "blogs", "create", req.body);

      const blog = await this.blogService.findBlogPostBySlug(slug, authUser);
      if (blog) {
        throw SkynedUtils.createException(
          StatusCodes.CONFLICT,
          "Blog post already exist",
        );
      }

      const blogPostId = this.idGeneratorService.id();
      const image = await this.storageService.saveObject(
        coverImage,
        SkynedUtils.resolveStoragePath({
          type: "coverImage",
          data: {
            blogPostId,
          },
        }),
      );

      await this.blogService.createBlogPost({
        ...rest,
        blogPostId,
        slug,
        coverImage: image,
        status,
        publishedAt:
          status === "published"
            ? new Date()
            : status === "scheduled" && publishedAt
              ? new Date(publishedAt)
              : undefined,
        authorId: authUser.user.adminId,
      });

      res._success(StatusCodes.CREATED, { message: "Blog post created" });
    } catch (error) {
      next(error);
    }
  };

  updateBlogPost: IBlogPostController["updateBlogPost"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);
      const { slug } = req.params;
      const {
        slug: updateSlug,
        coverImage,
        status,
        publishedAt,
        ...rest
      } = req.body;

      const blog = await this.blogService.findBlogPostBySlug(slug, authUser);
      if (!blog) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }
      this._attributeBasedAccessControl(
        authUser,
        "blogs",
        "update",
        req.body,
        blog,
      );

      if (updateSlug && slug !== updateSlug) {
        const blogExist = await this.blogService.findBlogPostBySlug(
          updateSlug,
          authUser,
        );

        if (blogExist) {
          throw SkynedUtils.createException(
            StatusCodes.CONFLICT,
            "Blog post already exist",
          );
        }
      }

      let image;
      if (coverImage) {
        const storagePath = SkynedUtils.resolveStoragePath({
          type: "coverImage",
          data: {
            blogPostId: blog.blogPostId,
          },
        });

        // ? Overrides object on the blog cover image storage path
        image = await this.storageService.saveObject(coverImage, storagePath);

        // ? In a case storage path is changed
        if (storagePath !== blog.coverImage.path) {
          await this.storageService.deleteObject(blog.coverImage.path);
        }
      }

      const update: Parameters<IBlogPostService["updateBlogPost"]>["2"] = {
        ...rest,
        status,
      };

      if (image) {
        update.coverImage = image;
      }

      switch (status) {
        case "draft":
        case "unpublished":
          update.publishedAt = null;
          break;
        case "published":
          {
            if (!blog.publishedAt) {
              update.publishedAt = new Date();
            }
          }
          break;
        default:
          {
            if (publishedAt) {
              update.publishedAt = new Date(publishedAt);
            }
          }
          break;
      }

      await this.blogService.updateBlogPost(
        blog.id,
        authUser.user.adminId,
        update,
      );
      res._success(StatusCodes.OK, { message: "Blog updated." });
    } catch (error) {
      next(error);
    }
  };

  deleteBlogPost: IBlogPostController["deleteBlogPost"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);
      const { slug } = req.params;

      const blog = await this.blogService.findBlogPostBySlug(slug, authUser);
      if (!blog) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }
      this._attributeBasedAccessControl(authUser, "blogs", "delete", blog);

      await this.storageService.deleteObject(blog.coverImage.path);
      await this.blogService.deleteBlogPost(slug);
      res._success(StatusCodes.OK, { message: "Post Deleted" });
    } catch (error) {
      next(error);
    }
  };

  getBlogPost: IBlogPostController["getBlogPost"] = async (req, res, next) => {
    try {
      const authUser = this._validateUser(req);
      const { slug } = req.params;

      const blog = await this.blogService.findBlogPostBySlug(slug, authUser);
      if (!blog) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      if (authUser) {
        this._attributeBasedAccessControl(authUser, "blogs", "read", blog);
      }

      res._success(StatusCodes.OK, blog);
    } catch (error) {
      next(error);
    }
  };

  listBlogPost: IBlogPostController["listBlogPost"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { from, to, limit, page, ...rest } = req.query;

      const authUser = this._validateUser(req);

      if (authUser) {
        this._attributeBasedAccessControl(authUser, "blogs", "list");
      }

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.blogService.count(
        {
          from,
          to,
          where: {
            ...rest,
          },
        },
        authUser,
      );

      const blogList = await this.blogService.findBlogPosts(
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
        data: blogList,
      });
    } catch (error) {
      next(error);
    }
  };
}

/** Concrete instance of BlogPostController */
export const blogPostController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.BLOG_POST_CONTROLLER,
  () =>
    BlogPostController.factory({
      blogService: blogPostService,
      storageService: storageService,
      idGeneratorService: idGeneratorService,
    }),
);
