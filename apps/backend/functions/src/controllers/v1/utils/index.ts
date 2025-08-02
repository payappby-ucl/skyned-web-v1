import { StatusCodes } from "http-status-codes";
import { DEFAULT_QUERY_LIMIT, SkynedUtils } from "../../../utils";
import { PageQuerySchema } from "../../../zod-schemas";
import {
  accessControl,
  AdminClaim,
  AuthClaim,
  StudentClaim,
} from "@workspace/shared";

export abstract class ControllerUtils {
  protected _validateUser(req: Express.Request) {
    if (req.skynedAuth) {
      return {
        user: req.skynedAuth.admin || req.skynedAuth.student,
        claim: req.skynedAuth.claim,
      } as AuthClaim;
    }

    return undefined;
  }
  protected _validateAdmin(req: Express.Request) {
    if (!req.skynedAuth.admin || req.skynedAuth.admin.accountSuspended) {
      throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
    }

    return {
      user: req.skynedAuth.admin,
      claim: req.skynedAuth.claim,
    } as AdminClaim;
  }

  protected _validateStudent(req: Express.Request) {
    if (!req.skynedAuth.student) {
      throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
    }

    return {
      user: req.skynedAuth.student,
      claim: req.skynedAuth.claim,
    } as StudentClaim;
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

  protected _attributeBasedAccessControl: (typeof accessControl)["attribute"] =
    (...args) => {
      const hasAccess = accessControl.attribute(...args);
      if (!hasAccess) {
        throw SkynedUtils.createException(
          StatusCodes.FORBIDDEN,
          "Unauthorized",
        );
      }

      return true;
    };
}
