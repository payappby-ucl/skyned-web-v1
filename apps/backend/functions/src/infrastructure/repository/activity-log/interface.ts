import { IActivityLog, PermissionType } from "@workspace/shared";

/** Abstract Representation Activity log repository */
export interface IActivityLogRepository {
  create<T extends keyof PermissionType>(
    data: Omit<IActivityLog<T>, "id" | "createdAt" | "updatedAt" | "admin">,
  ): Promise<IActivityLog<T>>;
}
