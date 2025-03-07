import { IFirebaseServer } from "./interface";
export * from "./interface";
export declare class FirebaseServer implements IFirebaseServer {
    private static instance;
    private constructor();
    static factory(environment?: string): IFirebaseServer;
}
