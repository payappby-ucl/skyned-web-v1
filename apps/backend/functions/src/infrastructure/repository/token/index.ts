import { StatusCodes } from "http-status-codes";
import { IRepository, IValidationUtility } from "../../../interfaces";
import { SkynedUtils } from "../../../utils";
import { ITokenRepository } from "./interface";
import { tokenSchema } from "./schema";

export * from "./interface";
export * from "./schema";

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
    data = this.validationUtility.validateInput({
      schema: tokenSchema.omit({
        tokenId: true,
      }),
      inputData: data,
    });

    const token = await this.db.token.create({
      data,
    });

    return token;
  };

  /** Finds a token */

  findTokenByTokenId: ITokenRepository["findTokenByTokenId"] = async (
    tokenId,
  ) => {
    const data = this.validationUtility.validateInput({
      schema: tokenSchema.pick({
        tokenId: true,
      }),
      inputData: { tokenId },
    });

    const token = await this.db.token.findUnique({
      where: {
        tokenId: data.tokenId,
      },
    });

    return token;
  };

  /** deletes a token */

  delete: ITokenRepository["delete"] = async (tokenId) => {
    const data = this.validationUtility.validateInput({
      schema: tokenSchema.pick({
        tokenId: true,
      }),
      inputData: { tokenId },
    });

    const token = await this.findTokenByTokenId(data.tokenId);
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
