/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import { ITagController, ITagService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { tagService } from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";

/** Required dependencies to create controller instance */
export interface TagControllerDependencies {
  tagService: ITagService;
}

/**
 * Concrete implementation of controller
 *
 * @class
 */

export class TagController extends ControllerUtils implements ITagController {
  private static instance: ITagController | null = null;
  private constructor(private readonly tagService: ITagService) {
    super();
  }

  /**
   * Creates the controller instance
   */

  static factory({ tagService }: TagControllerDependencies) {
    if (!TagController.instance) {
      TagController.instance = new TagController(tagService);
    }

    return TagController.instance;
  }

  deleteTag: ITagController["deleteTag"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      const { id } = req.params;

      const tag = await this.tagService.findById(parseInt(id));
      if (!tag) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(authUser, "tags", "delete", tag);

      await this.tagService.deleteTag(tag.id);
      res._success(StatusCodes.OK, { message: "Tag Deleted" });
    } catch (error) {
      next(error);
    }
  };

  deleteManyTags: ITagController["deleteManyTags"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      const { data } = req.body;

      const tags = await this.tagService.getAllTags({
        ids: data.map((d) => d.id),
      });

      for (const tag of tags) {
        this._attributeBasedAccessControl(authUser, "tags", "delete", tag);
      }

      await this.tagService.deleteTags(data.map((d) => d.id));
      res._success(StatusCodes.OK, { message: "Tags Deleted" });
    } catch (error) {
      next(error);
    }
  };

  listAllTags: ITagController["listAllTags"] = async (req, res, next) => {
    try {
      const authUser = this._validateUser(req);
      if (authUser) {
        this._attributeBasedAccessControl(authUser, "tags", "list");
      }

      const tags = await this.tagService.getAllTags({}, authUser);

      res._success(StatusCodes.OK, tags);
    } catch (error) {
      next(error);
    }
  };

  listTags: ITagController["listTags"] = async (req, res, next) => {
    try {
      const { from, to, limit, page, ...rest } = req.query;

      const authUser = this._validateUser(req);

      if (authUser) {
        this._attributeBasedAccessControl(authUser, "tags", "list");
      }

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.tagService.count({
        from,
        to,
        where: {
          ...rest,
        },
      });

      const tags = await this.tagService.findTags(
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
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  };
}

/** Controller instance */
export const tagController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.TAG_CONTROLLER,
  () =>
    TagController.factory({
      tagService,
    }),
);
