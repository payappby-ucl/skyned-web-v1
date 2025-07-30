import { PermissionType } from "../access-control";
import { AdminProfile } from "./admin";
import { ITimestamps } from "./utils";
export type ActivityActionType = "create" | "update" | "delete";
export interface IActivityLog<Key extends keyof PermissionType> extends ITimestamps {
    id: number;
    adminId: number;
    admin: AdminProfile;
    resource: Key;
    resourceId: number;
    action: PermissionType[Key]["action"];
    message?: string;
    previousState?: PermissionType[Key]["dataType"];
    currentState?: PermissionType[Key]["dataType"];
}
