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

  /** Count */
  count(
    query?: Parameters<Prisma.AdminDelegate["count"]>["0"],
  ): ReturnType<Prisma.AdminDelegate["count"]>;

  /** Find Many admins */
  findMany(
    query?: Parameters<Prisma.AdminDelegate["findMany"]>["0"],
  ): ReturnType<Prisma.AdminDelegate["findMany"]>;
}
