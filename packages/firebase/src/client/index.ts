import { Auth } from "firebase/auth";
import { IFirebaseClient } from "./interface";
import { FirebaseClientAuth, IFirebaseClientAuth } from "./auth";

export class FirebaseClient implements IFirebaseClient {
  private static instance: IFirebaseClient | null = null;
  auth: IFirebaseClientAuth;

  private constructor(auth: Auth) {
    this.auth = new FirebaseClientAuth(auth);
  }

  static factory(auth: Auth) {
    if (!FirebaseClient.instance) {
      FirebaseClient.instance = new FirebaseClient(auth);
    }

    return FirebaseClient.instance;
  }
}
