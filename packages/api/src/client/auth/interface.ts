import { SignInProviderEnum } from "../../enums/providers";
import { Auth, User } from "firebase/auth";

export interface IAuth {
  auth: Auth;
  handleStateChange(
    cb: (user: User | null, err?: Error) => Promise<void>,
  ): void;
  signInWithProvider(provider: SignInProviderEnum): Promise<void>;
  logout(): Promise<void>;
  getIdToken(): Promise<string | null>;

  login(email: string, password: string): Promise<void>;
}
