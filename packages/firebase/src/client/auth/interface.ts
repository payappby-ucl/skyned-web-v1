import { Auth, User } from "firebase/auth";
import { SignInProviderEnum } from "@workspace/shared";

export interface IFirebaseClientAuth {
  auth: Auth;
  listenForAuthStateChange(cb: (user: User | null) => void): void;
  signInWithProvider(provider: SignInProviderEnum): Promise<void>;
  logout(): Promise<void>;
}
