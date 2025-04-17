import { IAccessControl } from "./interfaces";
export * from "./interfaces";
export * from "./types";
export * from "./policies";
export declare class AccessControl implements IAccessControl {
    private static instance;
    private policies;
    private constructor();
    static factory(): IAccessControl;
    role: IAccessControl["role"];
    attribute: IAccessControl["attribute"];
}
export declare const accessControl: IAccessControl;
