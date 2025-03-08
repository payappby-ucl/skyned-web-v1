import { Auth } from "firebase/auth";
import { IFirebaseClient } from "./interface";
import { IFirebaseClientAuth } from "./auth";
export * from "./interface";
export declare class FirebaseClient implements IFirebaseClient {
    private static instance;
    auth: IFirebaseClientAuth;
    private constructor();
    static factory(auth: Auth): IFirebaseClient;
}
