import { AuthClaim } from "@workspace/shared";
import { TokenVerifySchema } from "../../infrastructure";

/** Auth Infrastructure interfaces */
export interface IAuth {
  findUserByEmail(email: string): Promise<{ id: string; email: string } | null>;
  exists(email: string): Promise<boolean>;
  createAuth(
    data: {
      email: string;
      password: string;
    },
    claim: AuthClaim["claim"],
  ): Promise<string>;

  verifyIdToken(
    data: TokenVerifySchema,
  ): Promise<{ id: string; claim: AuthClaim["claim"] } | null>;
}
