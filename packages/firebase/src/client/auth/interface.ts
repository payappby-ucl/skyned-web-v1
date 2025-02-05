import { Auth, User } from "firebase/auth";
import { SignInProviderEnum } from "@workspace/utils/enums";

export interface IFirebaseClientAuth {
  auth: Auth;
  listenForAuthStateChange(cb: (user: User | null) => void): void;
  signInWithProvider(provider: SignInProviderEnum): Promise<void>;
  logout(): Promise<void>;
}
