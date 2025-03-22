import { ITokenRepository } from "../../infrastructure";

/** Represents interface for jwt tokens */
export interface ITokenService {
  sign<T extends object>(payload: T): string;
  verify<T>(token: string): T | null;

  createToken: ITokenRepository["create"];
  findTokenByTokenId: ITokenRepository["findTokenByTokenId"];
  delete: ITokenRepository["delete"];
}
