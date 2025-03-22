import { StatusCodes } from "http-status-codes";
import { IRepository, IValidationUtility } from "../../../interfaces";
import { SkynedUtils } from "../../../utils";
import { ITokenRepository } from "./interface";

export * from "./interface";

/**
 * Concrete implementation of ITokenRepository
 *
 * @class
 */

export class TokenRepository implements ITokenRepository {
  constructor(
    private readonly db: IRepository["db"],
    private readonly validationUtility: IValidationUtility,
  ) {}

  /** Create a token in the database */

  create: ITokenRepository["create"] = async (data) => {
    const token = await this.db.token.create({
      data,
    });

    return token;
  };

  /** Finds a token */

  findTokenByTokenId: ITokenRepository["findTokenByTokenId"] = async (
    tokenId,
  ) => {
    this.validationUtility.validateTokenId(tokenId);
    const token = await this.db.token.findUnique({
      where: {
        tokenId,
      },
    });

    return token;
  };

  /** deletes a token */

  delete: ITokenRepository["delete"] = async (tokenId) => {
    this.validationUtility.validateTokenId(tokenId);

    const token = await this.findTokenByTokenId(tokenId);
    if (!token) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "The token you're trying to delete is not found on the database",
      );
    }

    const deletedToken = await this.db.token.delete({
      where: {
        tokenId: token.tokenId,
      },
    });

    return deletedToken;
  };
}
