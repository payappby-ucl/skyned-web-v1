/** Represents token structure in DB */
export interface IToken {
  id: number;
  tokenId: string;
  token: string;
  type: "verify" | "reset";
  expiresIn: Date;
  createdAt: Date;
  updatedAt: Date;
}
