import { IAdmin } from "@workspace/shared";
import { Prisma } from "../prisma-client";

/** Represents all calls to the admin table in db */
export interface IAdminRepository {
  /** Gets admin by adminId */
  findAdminByAdminId(
    adminId: string,
    initiator?: IAdmin | "auth",
  ): Promise<IAdmin | null>;

  /** Creates an admin */
  create(
    options: Parameters<Prisma.AdminDelegate["create"]>["0"],
  ): ReturnType<Prisma.AdminDelegate["create"]>;
}
