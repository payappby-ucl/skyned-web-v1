import { AuthClaim } from "@workspace/shared";

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
}
