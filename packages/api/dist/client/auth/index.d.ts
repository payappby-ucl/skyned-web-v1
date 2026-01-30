import { Auth as FirebaseAuth } from "firebase/auth";
import { IAuth } from "./interface";
export * from "./interface";
export declare class Auth implements IAuth {
    readonly auth: FirebaseAuth;
    constructor(auth: FirebaseAuth);
    handleStateChange: IAuth["handleStateChange"];
    signInWithProvider: IAuth["signInWithProvider"];
    logout: IAuth["logout"];
    getIdToken: IAuth["getIdToken"];
    login: IAuth["login"];
}
