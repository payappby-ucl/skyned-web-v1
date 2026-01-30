import {
  Auth as FirebaseAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IAuth } from "./interface";
import { SignInProviderEnum } from "../../enums";

export * from "./interface";
export class Auth implements IAuth {
  constructor(public readonly auth: FirebaseAuth) {}

  handleStateChange: IAuth["handleStateChange"] = (cb) => {
    this.auth.onAuthStateChanged(
      (user) => cb(user),
      (error) => cb(null, error),
    );
  };

  signInWithProvider: IAuth["signInWithProvider"] = async (provider) => {
    switch (provider) {
      case SignInProviderEnum.google:
        const provider = new GoogleAuthProvider();
        signInWithPopup(this.auth, provider);
        break;
      default:
        throw new Error("Provider is required");
    }
  };

  logout: IAuth["logout"] = async () => await signOut(this.auth);

  getIdToken: IAuth["getIdToken"] = async () => {
    const idToken = (await this.auth.currentUser?.getIdToken()) || null;
    return idToken;
  };

  login: IAuth["login"] = async (email, password) => {
    await signInWithEmailAndPassword(this.auth, email, password);
  };
}
