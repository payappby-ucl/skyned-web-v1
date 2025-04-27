import { IServerUtils } from "./interface";
export * from "./interface";
export declare class ServerUtils implements IServerUtils {
    createServerActionError: IServerUtils["createServerActionError"];
    constructQuery: IServerUtils["constructQuery"];
    constructTags: IServerUtils["constructTags"];
}
