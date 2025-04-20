import { IAdmin } from "@workspace/shared";

/** Represents all calls to the admin table in db */
export interface IAdminRepository {
  /** Gets admin by adminId */
  findAdminByAdminId(
    adminId: string,
    initiator?: IAdmin | "auth",
  ): Promise<IAdmin | null>;
}
