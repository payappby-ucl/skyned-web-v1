import { IToken } from "../../../interfaces";

/** Represents all calls to the token table in db */
export interface ITokenRepository {
  /** Creates a token in the database */
  create(data: Pick<IToken, "token" | "expiresIn" | "type">): Promise<IToken>;
  /** Find a token by the tokenId */
  findTokenByTokenId(tokenId: string): Promise<IToken | null>;
  delete(tokenId: string): Promise<IToken>;
}
