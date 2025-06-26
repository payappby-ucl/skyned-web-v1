import jwt from "jsonwebtoken";
import { RegistryKeysEnum } from "../../../enum";
import { ITokenService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { env } from "../../../config";
import { SkynedUtils, TOKEN_EXPIRY_IN_MINUTE } from "../../../utils";
import { StatusCodes } from "http-status-codes";
import { tokenSchema } from "../../../infrastructure";
import { ServiceUtils } from "../utils";

/**
 * Concrete implementation of ITokenService using jsonwebtoken
 *
 * @class
 */

export class TokenService extends ServiceUtils implements ITokenService {
  private static instance: ITokenService | null = null;
  private constructor() {
    super();
  }

  /** Creates TokenService instance */

  static factory() {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }

    return TokenService.instance;
  }

  /** Generates and signs a token */

  sign: ITokenService["sign"] = (payload) => {
    if (!payload || !Object.keys(payload).length) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Payload has no property",
      );
    }
    const token = jwt.sign(payload, env.token.secret, {
      expiresIn: TOKEN_EXPIRY_IN_MINUTE,
    });

    return token;
  };

  /** Checks if a signed token is valid */

  verify<T>(token: string) {
    try {
      if (!token.trim() || typeof token !== "string") {
        throw SkynedUtils.createException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Token not defined",
        );
      }

      const decoded = jwt.verify(token, env.token.secret) as T;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  createToken: ITokenService["createToken"] = async (data) => {
    data = this.validationUtility.validateInput({
      schema: tokenSchema.omit({ tokenId: true }),
      inputData: data,
    });
    const token = await this.repository.token.create(data);
    return token;
  };

  findTokenByTokenId: ITokenService["findTokenByTokenId"] = async (tokenId) => {
    const data = this.validationUtility.validateInput({
      schema: tokenSchema.pick({
        tokenId: true,
      }),
      inputData: { tokenId },
    });
    const token = await this.repository.token.findTokenByTokenId(data.tokenId);
    return token;
  };

  delete: ITokenService["delete"] = async (tokenId) => {
    const data = this.validationUtility.validateInput({
      schema: tokenSchema.pick({
        tokenId: true,
      }),
      inputData: { tokenId },
    });

    const token = await this.repository.token.findTokenByTokenId(data.tokenId);
    if (!token) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Token you want do delete does not exist",
      );
    }

    const deletedToken = await this.repository.token.delete(token.tokenId);
    return deletedToken;
  };
}

/** TokenService instance */
export const tokenService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.TOKEN_SERVICE,
  () => TokenService.factory(),
);
