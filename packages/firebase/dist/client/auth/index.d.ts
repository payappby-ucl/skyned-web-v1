import { Auth } from "firebase/auth";
import { IFirebaseClientAuth } from "./interface";
export * from "./interface";
export declare class FirebaseClientAuth implements IFirebaseClientAuth {
    readonly auth: Auth;
    constructor(auth: Auth);
    listenForAuthStateChange: IFirebaseClientAuth["listenForAuthStateChange"];
    signInWithProvider: IFirebaseClientAuth["signInWithProvider"];
    logout: IFirebaseClientAuth["logout"];
}
