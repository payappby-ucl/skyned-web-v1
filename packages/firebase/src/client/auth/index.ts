import {
  Auth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { IFirebaseClientAuth } from "./interface";
import { SignInProviderEnum } from "@workspace/utils/enums";

export * from "./interface";
export class FirebaseClientAuth implements IFirebaseClientAuth {
  constructor(public readonly auth: Auth) {}
  listenForAuthStateChange: IFirebaseClientAuth["listenForAuthStateChange"] = (
    cb,
  ) => {
    onAuthStateChanged(this.auth, (user) => {
      cb(user);
    });
  };

  signInWithProvider: IFirebaseClientAuth["signInWithProvider"] = async (
    provider,
  ) => {
    switch (provider) {
      case SignInProviderEnum.google:
        const provider = new GoogleAuthProvider();
        signInWithPopup(this.auth, provider);
        break;
      default:
        throw new Error("Provider is required");
    }
  };

  logout: IFirebaseClientAuth["logout"] = async () => await signOut(this.auth);
}
