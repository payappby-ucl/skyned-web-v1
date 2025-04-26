import { StatusCodes } from "http-status-codes";
import { DEFAULT_QUERY_LIMIT, SkynedUtils } from "../../../utils";
import { PageQuerySchema } from "../../../zod-schemas";

export abstract class ControllerUtils {
  protected _validateAdmin(req: Express.Request) {
    if (!req.skynedAuth.admin) {
      throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
    }

    return req.skynedAuth.admin;
  }

  protected _constructPaginationData({
    limit,
    page,
  }: Pick<PageQuerySchema, "limit" | "page">) {
    limit = limit || DEFAULT_QUERY_LIMIT;
    page = page || 1;

    const take = limit <= DEFAULT_QUERY_LIMIT ? limit : DEFAULT_QUERY_LIMIT;
    const skip = page * take - take;

    return {
      take,
      skip,
      currentPage: page,
      nextPage: page + 1,
      prevPage: page > 1 ? page - 1 : 1,
      perPage: take,
    };
  }
}
